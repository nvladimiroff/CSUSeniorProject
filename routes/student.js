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
    sequelize.query(
      'insert into answer_log values (id, ' + req.params.id + ', "X", ' + req.body.answer + ', NOW(), NOW())'
    );
    res.send({msg: "success"});
  });

  app.get('/student/:id', (req, res, next) => {
    res.render('student_question.html', {});
  });
};
