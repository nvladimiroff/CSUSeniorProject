"use strict";

// create the model for questions and expose it to our app

module.exports = function(sequelize, DataTypes) {
  var Question = sequelize.define("Question", {
    id:{ type: DataTypes.INTEGER, primaryKey: true },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    question_set_id: DataTypes.INTEGER,
    created: DataTypes.DATE,
    modified: DataTypes.DATE,
    status: DataTypes.BOOLEAN,
    img: DataTypes.STRING
  }, {
    classMethods: {
        associate: function(models) {
          Question.belongsTo(models.QuestionSet, {foreignKey: 'question_set_id'}),
          Question.hasMany(models.Answer)
        }
    },
    timestamps: false,
    underscored: true,
    tableName: 'questions'
  });

  return Question;
};
