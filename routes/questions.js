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
  
  app.post('/questions', function(req, res) {
    Question.create({
      name: req.body.name,
      description: req.body.description,
      question_set_id: req.body.question_set_id,
        modified: sequelize.fn('NOW')/*,
      img: req.body.img_location*/
    }).then(function(question) {
      Question.findAll({
          where: {
              id: question.id
          },
          include: [{ model: Answer }]
      }).then(function(questions) {
          res.json(question);
      }).error(function(err) {
          throw err;
      });
    }).error(function(err) {
      res.send({msg : err});
    });
  });
  
  app.delete('/questions/:id', function(req, res) {
    Question.destroy({
        where: {
          id: req.params.id
        }
    }).then(function(affectedrows) {
        res.send({msg : 'success'});
    }).error(function(err) {
        res.send({msg : err});
    });
  });
};
