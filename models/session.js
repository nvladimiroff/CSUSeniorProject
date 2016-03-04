"use strict";

var uuid = require('node-uuid');
// create the model for questions and expose it to our app

module.exports = function(sequelize, DataTypes) {
  var Session = sequelize.define("Session", {
    id:{ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    token: DataTypes.STRING,
    question_set_id: DataTypes.INTEGER,
    current_question_id: DataTypes.INTEGER,
    owner_id: DataTypes.STRING,
    created: DataTypes.DATE,
    modified: DataTypes.DATE,
    status: DataTypes.BOOLEAN,
    is_active: DataTypes.BOOLEAN
  }, {
    classMethods: {
        associate: function(models) {
          /*Session.belongsTo(models.SessionLog, {foreignKey: 'id'}),
          Session.belongsTo(models.AnswerLog, {foreignKey: 'id'}),*/
          Session.belongsTo(models.User, {foreignKey: 'owner_id'})
        },
        generateToken: function() {
            return uuid.v1();
        }
    },
    timestamps: false,
    underscored: true,
    tableName: 'sessions'
  });

  return Session;
};
