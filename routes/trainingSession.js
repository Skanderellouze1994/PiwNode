var express = require('express');
var router = express.Router();
var TrainingSession = require('./../models/trainingSession');
var User = require('../models/user');
var Course = require('../models/course');
var Post = require('../models/post');
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
       Get a course by id
       Update a course
*/
/************************************Add a training session by the tutor*********************************************/
router.post('/add/:id', function(req, res, next) {
    console.log(req.body);
    var body = req.body.session;
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
                });
                User.findById(req.params.id).exec( function (err,tutor) {
                    tutor.sessions.push(session._id);
                    tutor.save();
                });
            }
        }
    })
});

/***********************************Delete a training session by the creator******************************************/
router.delete('/delete/:user/:session', function (req,res,next) {

});

/********************************************Update a training session***********************************************/
router.put('/update/:user/:session', function (req,res,next) {
    TrainingSession.findOneAndUpdate({_id : req.params.session},req.body , function (err,session) {
        if(err){
            res.status(500).send('database error');
        }else{
            res.send("success");
        }
    })

});

/****************************************Get a training session by name**********************************************/
router.post('/get', function (req,res,next) {
    console.log(req.body.name)
    var body = req.body;
    var name = body.name;
    TrainingSession.find({name:req.body.name}, function (err,doc) {
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
    TrainingSession.find().sort({startDate: 'desc'}).populate('tutor').populate('courses').populate('studentsList').exec(function (err, sessions) {
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

    User.findById({_id :req.params.id}).sort({startDate: 'desc'}).populate('sessions').exec(function (err, doc) {
        if(err){
            res.status(500).send('error occured');
        }
        else{
            res.json(doc.sessions);
        }
    })
});

/***************************************Get training sessions by student*********************************************/
router.get('/get/student/:id', function (req,res,next) {

    User.findById({_id :req.params.id}).sort({startDate: 'desc'}).populate('participatedToSession').exec(function (err, doc) {
        if(err){
            res.status(500).send('error occured');
        }
        else{
            res.json(doc.participatedToSession);
        }
    })
});

/***************************************Get training sessions by id**************************************************/
router.get('/get/:id', function (req,res,next) {
    TrainingSession.findById({_id:req.params.id}).sort({startDate: 'desc'}).populate('tutor').populate('courses').exec(function (err,session) {
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
        User.findById(req.params.student).exec( function (err,student) {
            student.participatedToSession.push(session._id);
            student.save();
        });

    });
});

/*************************************Join a course******************************************************************/
router.post('/join/:student/:course', function (req,res,next) {
    Course.findById({_id :req.params.course}).exec( function (err,course) {
        course.presenceList.push(req.params.student);
        console.log(course);
        course.save(function (err,course) {
            if(err){
                res.status(500).send('database error');
            }
            else{
                res.send(course);
            }
        });
    });
});

/****************************************Get a course's presence list************************************************/
router.get('/get/course/presence/:course', function (req,res,next) {
    Course.findById({_id :req.params.course}).populate('presenceList').exec( function (err,course) {
            if(err){
                res.status(500).send('database error');
            }
            else{
                res.send(course.presenceList);
            }
    });
});

/*********************************Add a course in a training session by the tutor************************************/
router.post('/add/course/:user/:session', function(req, res, next) {
    var body = req.body;
    var title = body.title;
    var startDate = body.startDate;
    var endDate = body.endDate;
    var description = body.description;
    var objectives = body.objectives;
    var category = body.category;
    var period = body.period;

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
                cours.objectives = objectives;
                cours.period = period;
                cours.tutorCreator = req.params.user;

                cours.save(function (err,cours) {
                    if(err){
                        res.status(500).send('database error');
                        console.log(err);
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
    Course.findById({_id:req.params.id}).populate('tutorCreator').populate('presenceList').exec(function (err,course) {
        if(err){
            res.status(500).send("error")
        }else{
            res.json(course);
        }
    })

});

/****************************************Update a course by the creator**********************************************/
router.put('/course/update/:course', function (req,res,next) {
    Course.findOneAndUpdate({_id:req.params.course}, req.body , function (err,course) {
        if(err) res.status(500).send(err);
        else res.send("success");
    })

});

router.post('/sms', function (req,res,next) {
    const accountSid = 'AC7344f0a6be1c6df386c779884ece9ae3';
    const authToken = 'fb4c8031aa64c610ef4d3131313303f0';
// require the Twilio module and create a REST client
    const client = require('twilio')(accountSid, authToken);
    client.messages
        .create({
            to: '+21656103222',
            from: '+15067990273',
            body: "Tomorrow's forecast in Financial District, San Francisco is Clear",
        })
        .then((message) => console.log(message.sid));
});

router.post('/sentiment/:id', function (req,res,next) {
    var Sentiment = require('sentiment');
    var sentiment = new Sentiment();
    var options = {
        extras: {
            'not': -3,
            'difficult': -3,
            'need':-2,
        }
    };
    var descriptions = [];
    var scores = 0;

    Post.find({userPost:req.params.id}).populate('userPost').populate('responses.userResponse').exec(function (err,post) {

        if(!err){
            post.map(post=>{
                var result = sentiment.analyze(post.description, options);
                descriptions.push(result.score);
                var result2 = sentiment.analyze(post.subject,options);
                descriptions.push(result2.score);
                console.log(result);
                console.log(result2);
                scores += result.score + result2.score;
        });
            console.log(scores);
            console.log(descriptions);
            res.json(scores);
        }
        else{
            res.json('Error in retrieving posts list :' + err);
        }
    })

});

module.exports = router;
