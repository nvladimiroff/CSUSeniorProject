var Sequelize = require('sequelize');
var sequelize = new Sequelize('clicker', 'root', 'root', {host: 'localhost', port: 8889});
var Question = require('../models/question')(sequelize,Sequelize);
var Answer = require('../models/answer')(sequelize,Sequelize);
//var Promise = require('promise');

module.exports = (app) => {
  app.get('/student', (req, res, next) => {
    res.render('student.html', {});
  });

  app.post('/student', (req, res, next) => {
    res.redirect('/student/' + req.body.code);
  })

  app.get('/api/student/:id', (req, res, next) => {

    Question.findAll({
      where: {
        question_set_id: req.params.id
      }
    }).then(questions => {
      return Promise.all(questions.map(q => {
        return Answer.findAll({
          where: {
            question_id: q.id
          }
        }).then(a => {
          var answers = []
          for(var i = 0; i < a.length; i++) {
            var item = a[i];
            answers.push(item.name);
          }
          var data = {};
          data[q.name] = answers;
          return data;
        });
      }));
    }).then(data => {
      res.json(Object.assign(data));
    });
  });

  app.get('/student/:id', (req, res, next) => {
    res.render('student_question.html', data);
  });
};
