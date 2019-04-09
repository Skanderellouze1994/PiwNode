var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Ressource = require('../models/ressources');


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
/*FIND QUIZ*/
router.get('/:id', function (req, res) {
    var id = req.params.id;
    Quiz.findById(id).exec(function (err, quiz) {
        if (err)
        {res.send(err)}
        else res.json(quiz)
    });
});
/*UPDATE QUIZ*/
router.put('/:id', function (req, res) {
    Quiz.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, quiz) => {
        if (err) return res.status(500).send(err);
        return res.send(quiz);
    })
});
/*DELETE QUIZ*/
router.delete('/:id', function (req, res) {
    var id = req.params.id;
    Quiz.findByIdAndDelete(id, function (err, quiz) {
        if (err)
        {res.send(err)}
        else res.send()
    });
});

module.exports = router;
