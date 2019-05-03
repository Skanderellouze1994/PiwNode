var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const fr = require('face-recognition')
var test=[]

var User = require('../models/user');
var facialRec = require('../models/facialRec');


router.post('/login', function (req, res, next) {
    const detector = fr.FaceDetector()
    const recognizer = fr.FaceRecognizer()
    facialRec.find({}, function (err, faces) {
        recognizer.load(faces.map(f=>{return{className: f.className,faceDescriptors: f.faceDescriptors}}))



    })
    var base64Data = req.body.image.replace(/^data:image\/jpeg;base64,/, "");
    const id = Math.random()
    require("fs").writeFile("c:/temp/" + id + '.jpeg', base64Data, 'base64', function (err) {
        console.log(err);
    });
    setTimeout(() => {
        const image1 = fr.loadImage("c:/temp/" + id + '.jpeg')
        const faceImages = detector.detectFaces(image1)
        const bestPrediction = recognizer.predictBest(faceImages[0])

        if (bestPrediction.distance < 0.5) {
            console.log(bestPrediction)
            User.findById(bestPrediction.className, function (error, user) {
                res.send(user)
            })
        }
        else {
            res.status(400).send({message:"profile not match"});
        }
    }, 1000)

});

router.post('/addface/:id', function (req, res, next) {
    const detector = fr.FaceDetector()
    const recognizer = fr.FaceRecognizer()
    var base64Data = req.body.image.replace(/^data:image\/jpeg;base64,/, "");
    const id = Math.random()
    require("fs").writeFile("c:/temp/" + id + '.jpeg', base64Data, 'base64', function (err) {
        console.log(err);
    });
    setTimeout(() => {
        try {
            const image1 = fr.loadImage("c:/temp/" + id + '.jpeg')
            const faceImages = detector.detectFaces(image1)
            recognizer.addFaces(faceImages, req.params.id)
            const modelState = recognizer.serialize()
            console.log(modelState)
            test = modelState;
            const facial = new facialRec({
                className: modelState[0].className,
                faceDescriptors: modelState[0].faceDescriptors
            })
            facial.save(function (err, fa) {
                res.send(fa)
            })
        }catch (e) {
            res.status(400).send('no faces')
        }

        //res.send(modelState)
    }, 1000)

});

module.exports = router;
