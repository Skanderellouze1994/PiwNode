var express = require('express');
var router = express.Router();
var TrainingSession = require('./../models/trainingSession');
var User = require('../models/user');
var Course = require('../models/course');
//TrainingSession = mongoose.model('TrainingSession',trainingSession);
//User = mongoose.model('User', user);
//Course = mongoose.model('Course', course);
/*
    This file contains the following functions :
       Add a training session by the tutor
       Update a training session
       Get a training session by name
       Get a training session by date
       Get a training session by id
       Get all training sessions
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
    tutor = req.params.id;
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
/**********************************************Get all training sessions*********************************************/
router.get('/all', function (req,res,next) {
    TrainingSession.find().populate('tutor').exec(function (err, sessions) {
        if(err)
            res.send(err);
        if(!sessions)
            res.status(404).send();
        else
            res.json(sessions);
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

/***************************************Get training sessions by id**************************************************/
router.get('/get/:id', function (req,res,next) {
    TrainingSession.findById({_id:req.params.id}).populate('tutor').populate('courses').exec(function (err,session) {
        if(err){
            res.status(500).send("error")
        }else{
            res.json(session);
        }
    })

});

/****************************Add a student who participated to the training session**********************************/
router.post('/add/student/:student/:session', function (req,res,next) {
    TrainingSession.findById({_id :req.params.session}).exec( function (err,session) {
        session.studentsList.push(req.params.student);
        console.log(session);
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
                cours.tutorCreator = req.params.user;
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
/********************************************Get course by id*******************************************************/
router.get('/get/course/:id', function (req,res,next) {
    Course.findById({_id:req.params.id}).populate('tutorCreator').exec(function (err,course) {
        if(err){
            res.status(500).send("error")
        }else{
            res.json(course);
        }
    })

});

/****************************************Update a course by the creator**********************************************/
router.put('/course/update/:course/:user', function (req,res,next) {

});

module.exports = router;
