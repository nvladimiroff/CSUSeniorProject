var Sequelize = require('sequelize');
var sequelize = new Sequelize('clicker', 'root', 'root', {host: 'localhost', port: 8889});
var Question = require('../models/question')(sequelize,Sequelize);
var Answer = require('../models/answer')(sequelize,Sequelize);

module.exports = (app) => {
  app.get('/student', (req, res, next) => {
    res.render('student.html', {});
  });

  app.post('/student', (req, res, next) => {
    res.redirect('/student/' + req.body.code);
  })

  app.get('/student/:id', (req, res, next) => {
    var data = {};

    Question.findOne({
      where: {
        question_set_id: req.params.id
      }
    }).then(q => {
      data.question = q.description;
      return Answer.findAll({
        where: {
          question_id: q.id
        }
      });
    }).then(answers => {
      data.answers = answers;
      console.log(data);
      res.render('student_question.html', data);
    });
  });
};
