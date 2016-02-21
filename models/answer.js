"use strict";

// create the model for questions and expose it to our app

module.exports = function(sequelize, DataTypes) {
  var Answer = sequelize.define("Answer", {
    id:{ type: DataTypes.INTEGER, primaryKey: true },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    question_id: DataTypes.INTEGER,
    is_valid: DataTypes.BOOLEAN,
    created: DataTypes.DATE,
    modified: DataTypes.DATE,
    status: DataTypes.BOOLEAN,
    img: DataTypes.STRING
  }, {
    classMethods: {
        associate: function(models) {
          Answer.belongsTo(models.Question, {foreignKey: 'question_id'})
        }
    },
    timestamps: false,
    underscored: true,
    tableName: 'answers'
  });

  return Answer;
};
