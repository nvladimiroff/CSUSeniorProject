var Sequelize = require('sequelize');
var sequelize = new Sequelize('clicker', 'root', 'root', {host: 'localhost', port: 8889});
var stringify = require('json-stringify-safe');

// load up the user model
var User      = require('../models/user')(sequelize, Sequelize);

module.exports = function(app, passport) {
  app.post('/users', function(req, res, next) {
      passport.authenticate('local-signup', function(err, user, info) {
          if (err) {
            return next(err); // will generate a 500 error
          }
          // Generate a JSON response reflecting authentication status
          if (! user) {
            return res.send(401,{ success : false, message : 'authentication failed' });
          }
          req.login(user, function(err){
            if(err){
              return next(err);
            }
            return res.send("success");        
          });
      })(req, res, next);
  });
  
  app.get('/users', function(req, res, next) {
      passport.authenticate('local-login', function(err, user, info) {
          if (err) {
            return next(err); // will generate a 500 error
          }
          // Generate a JSON response reflecting authentication status
          if (! user) {
            return res.send(401,{ success : false, message : req.flash.loginMessage/*'authentication failed'*/ });
          }
          req.login(user, function(err){
            if(err){
              return next(err);
            }
            return res.send("success");        
          });
      })(req, res, next);
  });
  
  app.get('/users/checkUsername', function(request, response) {
    //console.log("\nREQUEST: "+JSON.stringify(stringify(request)));
    //console.log("\nRESPONSE: "+stringify(stringify(response)));
      User.findOne({
          where: {
              username: request.query.username
          }
      }).then(function(user) {
          // check to see if theres already a user with that email
          if (user) {
              response.send('true');
          } else {
              response.send('false');
          }
      }).error(function(err) {
          throw err;
      });
  });
};
