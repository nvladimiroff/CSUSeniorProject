var LocalStrategy   = require('passport-local').Strategy;

var Sequelize = require('sequelize');
var sequelize = new Sequelize('clicker', 'root', 'root', {host: 'localhost', port: 8889});
var stringify = require('json-stringify-safe');

// load up the user model
var User     = require('../models/user')(sequelize, Sequelize);
var bcrypt   = require('bcrypt-nodejs');

// expose this function to our app using module.exports
module.exports = function(passport) {
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.username);
    });

    // used to deserialize the user
    passport.deserializeUser(function(username, done) {
        User.findOne({
            where: {
                username: username
            }
        }).then(function(user) {
            done(null, user);
        }).error(function(err) {
            done(err);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        'local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {

            // asynchronous
            // User.findOne wont fire unless data is sent back
            process.nextTick(function() {
    
                // find a user whose username is the same as the forms username
                // we are checking to see if the user trying to login already exists
                User.findOne({
                    where: {
                        username: username
                    }
                }).then(function(user) {
                    // check to see if theres already a user with that email
                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
                    } else {
                        // if there is no user with that email
                        // create the user
                        var newUser = require('../models/user')(sequelize, Sequelize);
        
                        //console.log("\nREQUEST: "+JSON.stringify(stringify(req)));
                        // set the user's local credentials
                        newUser.username    = username;
                        newUser.password    = newUser.generateHash(password);
                        newUser.firstname   = req.body.firstname;
                        newUser.lastname    = req.body.lastname;
                        newUser.email       = req.body.email;
                        newUser.role        = req.body.role;
        
                        // save the user
                        newUser.create({
                            username:   newUser.username,
                            password:   newUser.password,
                            firstname:  newUser.firstname,
                            lastname:   newUser.lastname,
                            email:      newUser.email,
                            role:       newUser.role 
                        }).then(function() {
                            return done(null, newUser);
                        }).error(function(err){
                            return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                        });
                    }
                }).error(function(err) {
                    return done(err);
                });   
            });
        })
    );
    
    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) { // callback with email and password from our form
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({
                where: {
                    username: username, 
                }
            }).then(function(user) {
                // if no user is found, return the message
                if (!user)
                    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                
                // if the user is found but the password is wrong
                if (!bcrypt.compareSync(password, user.password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
    
                // all is well, return successful user
                return done(null, user);
            }).error(function(err) {
                return done(err);
            });
        })
    );
};