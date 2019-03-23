var express = require('express');
var router = express.Router();
var trainingSession = require('./../models/trainingSession');
var user = require('../models/user');
var course = require('../models/course');
var mongoose=require('mongoose');
TrainingSession = mongoose.model('TrainingSession',trainingSession);
User = mongoose.model('User', user);
Course = mongoose.model('Course', course);
/*
    This file contains the following functions :
       Add a training session by the tutor
       Update a training session
       Get a training session by name
       Get a training session by date
       Get training sessions by creator
       Add a student who participated to the training session
       Add a course in a training session by the tutor
       Get a course by name
       Update a course 
*/
/************************************Add a training session by the tutor*********************************************/
router.post('/add/:id', function(req, res, next) {
    var body = req.body;
    var name = body.name;
    var startDate = body.startDate;
    var endDate = body.endDate;
    var description = body.description;
    var tutor = new User();
    tutor = User.findOne(req.params.id);
    TrainingSession.findOne({name:name},function (err,doc) {
        if(err){
            res.status(500).send('error occured');
        }
        else{
            if(doc){
                res.status(400).send({message:'Training session name '+name+' is already taken! Please choose an other name'});
            }
            else{
                var session = new TrainingSession();
                session.name = name;
                session.startDate = startDate;
                session.endDate = endDate;
                session.description = description;
                session.tutor = tutor;
                session.save(function (err,trainingSession) {
                    if(err){
                        res.status(500).send('database error');
                    }
                    else{
                        res.send(trainingSession);
                    }
                })
            }
        }
    })
});

/***********************************Delete a training session by the creator******************************************/
router.delete('/delete/:user/:session', function (req,res,next) {

});

/********************************************Update a training session***********************************************/
router.put('/update/:user/:session', function (req,res,next) {

});

/****************************************Get a training session by name**********************************************/
router.get('/get', function (req,res,next) {
    var body = req.body;
    var name = body.name;
    TrainingSession.find({name:name}, function (err,doc) {
        if(err){
            res.status(500).send('error occured');
        }
        else{
            res.json(doc);
        }
    })
});

/****************************************Get a training session by date**********************************************/
router.get('/get', function (req,res,next) {
    var body = req.body;
    var startDate = body.startDate;
    TrainingSession.find({startDate:startDate}, function (err,doc) {
        if(err){
            res.status(500).send('error occured');
        }
        else{
            res.json(doc);
        }
    })
});

/***************************************Get training sessions by creator*********************************************/
router.get('/get/tutor/:id', function (req,res,next) {
    var tutor = new User();
    tutor = User.findOne(req.params.id);
    TrainingSession.find({tutor :tutor._id} , function (err, doc) {
        if(err){
            res.status(500).send('error occured');
        }
        else{
            res.json(doc);
        }
    })
});

/***************************************Get training sessions by student*********************************************/
router.get('/get/student/:id', function (req,res,next) {

});

/****************************Add a student who participated to the training session**********************************/
router.post('/add/student/:student/:session', function (req,res,next) {
    var student = new User();
    student = User.find(req.params.student);
    TrainingSession.findById(req.params.session).exec( function (err,session) {
        session.studentsList.push(student);
        session.save(function (err,trainingSession) {
            if(err){
                res.status(500).send('database error');
            }
            else{
                res.send(trainingSession);
            }
        });

    });
});

/*********************************Add a course in a training session by the tutor************************************/
router.post('/add/course/:user/:session', function(req, res, next) {
    var body = req.body;
    var title = body.title;
    var startDate = body.startDate;
    var endDate = body.endDate;
    var description = body.description;
    var category = body.category;
    var tutor = new User();
    tutor = User.findOne(req.params.user);
    Course.findOne({title:title},function (err,doc) {
        if(err){
            res.status(500).send('error occured');
        }
        else{
            if(doc){
                res.status(400).send({message:'Course name '+title+' is already taken! Please choose an other name'});
            }
            else{
                var cours = new Course();
                cours.title = title;
                cours.startDate = startDate;
                cours.endDate = endDate;
                cours.description = description;
                cours.category = category;
                cours.tutorCreator = tutor;
                cours.save(function (err,cours) {
                    if(err){
                        res.status(500).send('database error');
                    }
                    else{
                        res.send(cours);
                    }
                });
                TrainingSession.findById(req.params.session).exec( function (err,session) {
                    session.courses.push(cours);
                    session.save();
                });

            }
        }
    })
});

/**********************************************Get a course by name**************************************************/
router.get('/get/course', function (req,res,next) {
    var body = req.body;
    var title = body.title;
    Course.find({title:title}, function (err,doc) {
        if(err){
            res.status(500).send('error occured');
        }
        else{
            res.json(doc);
        }
    })
});

/****************************************Update a course by the creator**********************************************/
router.put('/course/update/:course/:user', function (req,res,next) {

});

module.exports = router;