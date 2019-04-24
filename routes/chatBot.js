var express = require('express');
var router = express.Router();
var connectBot = require('./connectBot')
var mongoose = require('mongoose');
var Course = require('../models/course');
var TrainingSession = require('../models/trainingSession');

router.get('/', function(req, res, next) {
    const msg = req.body.msg
    connectBot(msg)
        .then(function(response) {
            switch (response[0].queryResult.intent.displayName) {
                case "Welcome":
                    res.send(response[0].queryResult.fulfillmentText);
                    break;
                case "subscribe":
                    res.send(response[0].queryResult.fulfillmentText);
                    break;
                case "available courses":
                    Course.find(function (err, courses) {
                        if (err)
                        {res.send(err)}
                        if (!courses)
                        {res.status(404).send()}
                        else res.json(courses)
                    });
                    break;
                case "next training sessions":
                    TrainingSession.find().populate('tutor').exec(function (err, sessions) {
                        if(err)
                            res.send(err);
                        if(!sessions)
                            res.status(404).send();
                        else
                            res.json(sessions);
                    });
                    break;
                case "running course":
                    res.send(response[0].queryResult.fulfillmentText);
                    break;
                case "profile":
                    res.send(response[0].queryResult.fulfillmentText);
                    break;
                case "contact":
                    res.send(response[0].queryResult.fulfillmentText);
                    break;
                case "exams and tests":
                    res.send(response[0].queryResult.fulfillmentText);
                    break;
                case "quiz":
                    res.send(response[0].queryResult.fulfillmentText);
                    break;
                case "BYE":
                    res.send(response[0].queryResult.fulfillmentText);
                    break;
                case "Default Fallback Intent":
                    res.send(response[0].queryResult.fulfillmentText);
                    break;
            }
        })

});

module.exports = router;
