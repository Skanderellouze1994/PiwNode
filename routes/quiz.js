var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Quiz = require('../models/quiz');


/*CREATE QUIZ*/
router.post('/:idTutor/:idCourse', function (req, res) {
    var idTutor = req.params.idTutor;
    var idCourse = req.params.idCourse;
    var quiz = new Quiz(req.body);
    quiz.tutor=idTutor;
    quiz.course=idCourse;
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
/**************************************************QUESTIONS***********************************************************/
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
/*READ questions*/
router.get('/:id/questions', function (req, res) {
    Quiz.findById(req.params.id,function (err, quizz) {
        if (err)
        {res.send(err)}
        if (!quizz)
        {res.status(404).send()}
        else res.send(quizz.questions)
    });
});
/*FIND question*/
router.get('/:id/question/:idq', function (req, res) {
    Quiz.findById(req.params.id,function (err, quizz) {
        if (err)
        {res.send(err)}
        if (!quizz)
        {res.status(404).send()}
        else res.send(quizz.questions.id(req.params.idq))
    });
});
/*UPDATE question*/
router.put('/:id/question/:idq', function (req, res) {
    Quiz.findById(req.params.id,function (err, quizz) {
        if (err)
        {res.send(err)}
        if (!quizz)
        {res.status(404).send()}
        else {
            quizz.questions.id(req.params.idq).name = req.body.name;
            quizz.questions.id(req.params.idq).rightResponse = req.body.rightResponse;
            quizz.save(function(err) {
                if (err)
                    res.send(err);

                res.json(quizz);
            });
        }
    });
});
/*DELETE question*/
router.delete('/:id/question/:idq', function (req, res) {
    Quiz.findById(req.params.id,function (err, quiz) {
        if (err)
        {res.send(err)}
        if (!quiz)
        {res.status(404).send()}
        else {
            quiz.questions.splice(quiz.questions.id(req.params.idq),1);
            quiz.save(function(err) {
                if (err)
                    res.send(err);

                res.json(quiz);
            });
        }
    });
});
/**************************************************PROPOSITIONS********************************************************/
/*Add proposition*/
router.post('/:id/question/:idq', function (req, res) {
    var id = req.params.id;
    Quiz.findById(id, function (err,quiz) {
        if (err)
            res.send(err);

        quiz.questions.id(req.params.idq).propositions.push(req.body)

        quiz.save(function(err) {
            if (err)
                res.send(err);

            res.json(quiz);
        });
    })
});
/*READ propositions*/
router.get('/:id/question/:idq/propositions', function (req, res) {
    Quiz.findById(req.params.id,function (err, quizz) {
        if (err)
        {res.send(err)}
        if (!quizz)
        {res.status(404).send()}
        else res.send(quizz.questions.id(req.params.idq).propositions)
    });
});
/*DELETE proposition*/
router.delete('/:id/question/:idq/proposition/:idp', function (req, res) {
    Quiz.findById(req.params.id,function (err, quiz) {
        if (err)
        {res.send(err)}
        if (!quiz)
        {res.status(404).send()}
        else {
            quiz.questions.id(req.params.idq).propositions.splice(quiz.questions.id(req.params.idq).propositions.id(req.params.idp),1)
            quiz.save(function(err) {
                if (err)
                    res.send(err);

                res.json(quiz);
            });
        }
    });
});
/*find prop*/
router.get('/:id/question/:idq/proposition/:idp', function (req, res) {
    Quiz.findById(req.params.id,function (err, quizz) {
        if (err)
        {res.send(err)}
        if (!quizz)
        {res.status(404).send()}
        else res.send(quizz.questions.id(req.params.idq).propositions.id(req.params.idp))
    });
});
/*****************************************************RESPONSE*********************************************************/
/*Add response*/
router.post('/:id/question/:idq/resp', function (req, res) {
    var id = req.params.id;
    Quiz.findById(id, function (err,quiz) {
        if (err)
            res.send(err);

        quiz.questions.id(req.params.idq).response.push(req.body)
        quiz.save(function(err) {
            if (err)
                res.send(err);

            res.json(quiz);
        });
    })
});
/*READ response*/
router.get('/:id/question/:idq/resp', function (req, res) {
    Quiz.findById(req.params.id,function (err, quizz) {
        if (err)
        {res.send(err)}
        if (!quizz)
        {res.status(404).send()}
        else res.send(quizz.questions.id(req.params.idq).response)
    });
});
module.exports = router;
