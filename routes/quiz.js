var express = require('express');
var router = express.Router();
var Quiz = require('../models/quiz');

/*CREATE QUIZ*/
router.post('/', function (req, res) {
    var quiz = new Quiz(req.body);
    quiz.save(function (err, quiz) {
        if(err)
            res.send(err);
        else
            res.json(quiz);
    })
});

// test routes
router.get('/test', (req, res, next) => {
    res.send('This route works fine');
});

module.exports = router;