var Sequelize = require('sequelize');
var sequelize = new Sequelize('clicker', 'root', 'root', {host: 'localhost', port: 8889});
//var stringify = require('json-stringify-safe');

// load up the model
var Question = require('../models/question')(sequelize, Sequelize);
var Answer = require('../models/answer')(sequelize, Sequelize);
Answer.belongsTo(Question);
Question.hasMany(Answer);

module.exports = function(app) {
  app.get('/questions/question_set/:id', function(request, response) {
      Question.findAll({
          where: {
              question_set_id: request.params.id
          },
          include: [{ model: Answer }]
      }).then(function(questions) {
          response.json(questions);
      }).error(function(err) {
          throw err;
      });
  });
};
