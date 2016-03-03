var Sequelize = require('sequelize');
var sequelize = new Sequelize('clicker', 'root', 'root', {host: 'localhost', port: 8889});
//var stringify = require('json-stringify-safe');

// load up the model
var Question = require('../models/question')(sequelize, Sequelize);
var Answer = require('../models/answer')(sequelize, Sequelize);
Answer.belongsTo(Question);
Question.hasMany(Answer);

module.exports = function(app) {
  app.post('/answers', function(req, res) {
    if (req.body.is_valid == 1 || req.body.is_valid == '1') {
      Answer.findOne({
          where: {
              question_id: req.body.question_id,
              is_valid: 1
          }
      }).then(function(answer) {
        if (answer.id) {
          Answer.update(
            { is_valid: 0 },
            {where: {id: answer.id}}
          ).then(function(affectedrows) {}).error(function(err) { });
        }
      }).error(function(err) {
          throw err;
      });
    }
    Answer.create({
        name: req.body.name,
        description: req.body.description,
        question_id: req.body.question_id,
        is_valid: req.body.is_valid,
        img: req.body.img_location
    }).then(function(answer) {
        res.json(answer);
    }).error(function(err) {
        res.send({msg : err});
    });
  });
  
  app.delete('/answers/:id', function(req, res) {
    Answer.destroy({
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
