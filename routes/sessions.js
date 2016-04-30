var Sequelize = require('sequelize');
var sequelize = new Sequelize('clicker', 'root', 'root', {host: 'localhost', port: 8889});
var stringify = require('json-stringify-safe');

var Question = require('../models/question')(sequelize, Sequelize);
var QuestionSet = require('../models/questionset')(sequelize, Sequelize);
var Answer = require('../models/answer')(sequelize, Sequelize);
var Session = require('../models/session')(sequelize, Sequelize);


module.exports = function(app) {
    app.post('/sessions', function(req, res) {
        Session.create({
            token: Session.generateToken(),
            question_set_id: req.body.question_set_id,
            current_question_id: null,
            owner_id: req.body.owner_id,
            is_active: 1,
            modified: sequelize.fn('NOW')
        }).then(function(session) {
            res.json(session);
        }).error(function(err) {
            res.send({msg : err});
        });
    });

    app.get('/sessions/questionset/:id', function(request, response) {
        Session.findOne({
            where: {
                question_set_id: request.params.id,
                is_active: 1
            }
        }).then(function(session) {
            response.json(session);
        }).error(function(err) {
            throw err;
        });
    });

    app.get('/sessions/responses/:qid', function(request, response) {
      sequelize.query(
        'select (select name from answers a where a.id = answer_log.answer_id) as answer, count(answer_id) as count from answer_log where answer_id IN(select id from answers where question_id = '+request.params.qid+') group by answer_id order by answer_id'
        ).spread(function(data, meta){
            console.log("results: "+stringify(data));
            response.json(data);
        });
    });

    app.put('/sessions', function(req, res) {
        Session.update(
            { current_question_id: req.body.current_question_id, modified: sequelize.fn('NOW') },
            {where: {id: req.body.session_id }}
        ).then(function(questionset) {
            res.send({msg : 'success'});
        }).error(function(err) {
            res.send({msg : err});
        });
    });

    app.put('/sessions/changequestion', function(req, res) {
        Session.update(
            { current_question_id: req.body.current_question_id, modified: sequelize.fn('NOW') },
            {where: {id: req.body.session_id }}
        ).then(function(questionset) {
            res.send({msg : 'success'});
        }).error(function(err) {
            res.send({msg : err});
        });
    });

    app.put('/sessions/endset', function(req, res) {
        Session.update(
            { current_question_id: null, is_active: 0, status: 0, modified: sequelize.fn('NOW') },
            {where: {id: req.body.session_id }}
        ).then(function(questionset) {
            res.send({msg : 'success'});
        }).error(function(err) {
            res.send({msg : err});
        });
    });
};
