var mongoose=require('mongoose');
var express = require('express');
var router = express.Router();
var post = require('../models/post');
var response = require('../models/response');
Post = mongoose.model('Post',post);
Responsee = mongoose.model('Responsee',response);
var user = require('../models/user');
var passport = require('passport');

//get all posts
router.get('/', function(req, res, next) {
    Post.find({},function (err,posts) {

        if(!err){
            res.json(posts);
        }
        else{
            res.json('Error in retrieving posts list :' + err);
        }
    })
});

//create a new post
router.post('/add', function(req, res, next) {

    var p = new Post(req.body);
    p.save();
    res.json(p);
});


//add a new response to a post
router.post('/response/add/:id', function(req, res, next) {
    var r = new Responsee(req.body);
    Post.findById(req.params.id,function (err,doc) {
        doc.responses.push(r);
        r.save();
        doc.save();
        res.json(r);
    });

});

// validate a response
router.put('/response/validate/:id', function(req, res, next) {
    Responsee.findById(req.params.id,function (err,doc) {
        doc.status="true";
        doc.update();
        res.json(doc);
    });
    Responsee.find({},function (err,responses) {
        console.log(responses.length)
    });

});






module.exports = router;
