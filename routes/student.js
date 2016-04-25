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

  app.post('/student/answer/:id', (req, res, next) => {
    console.log("Answer recieved => { id: " + req.params.id +
                                    ", questionNum: " + req.body.questionNum +
                                    ", answer: " + req.body.answer + " }");

    res.end("{}");
  });

  app.get('/student/:id', (req, res, next) => {
    res.render('student_question.html', {});
  });
};
