var Sequelize = require('sequelize');
var sequelize = new Sequelize('clicker', 'root', 'root', {host: 'localhost', port: 8889});
//var stringify = require('json-stringify-safe');

// load up the model
var QuestionSet = require('../models/questionset')(sequelize, Sequelize);

module.exports = function(app) {
  app.get('/questionsets/owner/:id', function(request, response) {
      QuestionSet.findAll({
          where: {
              owner_id: request.params.id
          }
      }).then(function(questionsets) {
          response.json(questionsets);
      }).error(function(err) {
          throw err;
      });
  });
  
  app.post('/questionsets', function(req, res) {
    QuestionSet.create({
        name: req.body.name,
        description: req.body.description,
        owner_id: req.body.owner_id
    }).then(function(questionsets) {
        res.send({msg : 'success'});
    }).error(function(err) {
        res.send({msg : err});
    });
  });
  
  app.put('/questionsets', function(req, res) {
    QuestionSet.update({
        name: req.body.name,
        description: req.body.description,
        owner_id: req.body.owner_id
    }).then(function(questionset) {
        res.send({msg : 'success'});
    }).error(function(err) {
        res.send({msg : err});
    });
  });
  
  app.delete('/questionsets/:id', function(req, res) {
    QuestionSet.destroy({
        where: {
          id: request.params.id
        }
    }).then(function(affectedrows) {
        res.send({msg : 'success'});
    }).error(function(err) {
        res.send({msg : err});
    });
  });
};
