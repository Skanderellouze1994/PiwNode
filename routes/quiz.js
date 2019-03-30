var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Quiz = require('../models/quiz');


/*CREATE QUIZ*/
router.post('/:idTutor', function (req, res) {
    var idTutor = req.params.idTutor;
    var quiz = new Quiz(req.body);
    quiz.tutor=idTutor;
    quiz.save(function (err, quiz) {
        if(err)
            res.send(err);
        else
            res.json(quiz);
    })
});
/*READ QUIZ*/
router.get('/', function (req, res) {
    Quiz.find(function (err, quizz) {
        if (err)
        {res.send(err)}
        if (!quizz)
        {res.status(404).send()}
        else res.json(quizz)
    });
});
/*UPDATE QUIZ*/
router.put('/:id', function (req, res) {
    Quiz.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, quiz) => {
        if (err) return res.status(500).send(err);
        return res.send(quiz);
    })
});
/*Add questions*/
router.post('/:id/question', function (req, res) {
    var id = req.params.id;
    Quiz.findById(id, function (err,quiz) {
        if (err)
            res.send(err);

        quiz.questions.push(req.body);

        quiz.save(function(err) {
            if (err)
                res.send(err);

            res.json(quiz);
        });
    })
});
/*READ question*/
router.get('/:id/questions', function (req, res) {
    Quiz.findById(req.params.id,function (err, quizz) {
        if (err)
        {res.send(err)}
        if (!quizz)
        {res.status(404).send()}
        else res.send(quizz.questions)
    });
});
/*UPDATE question*/
router.put('/question/:id', function (req, res) {
    var id = req.params.id;
    Quiz.findById(id, function (err,quiz) {
        if (err)
            res.send(err);
        quiz.questions.splice(fav.indexOf(id),1)
        quiz.questions.push(req.body);
        quiz.save(function(err) {
            if (err)
                res.send(err);

            res.json(quiz);
        });
    })
});
module.exports = router;