"use strict";

var bcrypt   = require('bcrypt-nodejs');

// create the model for users and expose it to our app

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username:{ type: DataTypes.STRING, primaryKey: true },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    role: DataTypes.ENUM('student', 'professor', 'admin'),
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    created: DataTypes.DATE,
    modified: DataTypes.DATE,
    status: DataTypes.BOOLEAN,
    img: DataTypes.STRING
  }, {
    classMethods: {
        associate: function(models) {
          User.hasMany(models.QuestionSet, {foreignKey: 'username'}),
          User.hasMany(models.Session, {foreignKey: 'username'})
        },
        generateHash: function(password) {
            return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
        }
    },
    timestamps: false,
    underscored: true,
    tableName: 'users'
  });

  return User;
};
