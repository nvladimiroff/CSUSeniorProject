"use strict";

// create the model for users and expose it to our app

module.exports = function(sequelize, DataTypes) {
  var QuestionSet = sequelize.define("QuestionSet", {
    id:{ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    owner_id: DataTypes.STRING,
    created: DataTypes.DATE,
    modified: DataTypes.DATE,
    status: DataTypes.BOOLEAN
  }, {
    classMethods: {
        associate: function(models) {
          QuestionSet.hasMany(models.Question, {foreignKey: 'id'}),
          QuestionSet.belongsTo(models.Session, {foreignKey: 'id'}),
          QuestionSet.belongsTo(models.User, {foreignKey: 'owner_id'})
        }
    },
    timestamps: false,
    underscored: true,
    tableName: 'question_sets'
  });

  return QuestionSet;
};
