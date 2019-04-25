var express = require('express');
var router = express.Router();
var connectBot = require('./connectBot')
var mongoose = require('mongoose');
var Course = require('../models/course');
var TrainingSession = require('../models/trainingSession');

let a="courses available are ";
let b="training sessions available are ";

router.get('/:msg', function(req, res, next) {
    const msg = req.params.msg
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
                        else
                            courses.map(c=>{
                                //return(c.title)
                                 a += c.title+', '
                            })
                        res.send(a);
                        a= "courses available are ";
                    });
                    break;
                case "next training sessions":
                    TrainingSession.find(function (err, sessions) {
                        if (err)
                        {res.send(err)}
                        if (!sessions)
                        {res.status(404).send()}
                        else
                            sessions.map(s=>{
                                //return(c.title)
                                b += s.name+', '
                            })
                        res.send(b);
                        b= "training sessions available are ";
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
