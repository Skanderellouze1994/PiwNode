var mongoose=require('mongoose');
var express = require('express');
var router = express.Router();
var Post = require('../models/post');
var User = require('../models/user');
var Responsee = require('../models/response');



//get all posts
router.get('/', function(req, res, next) {
    Post.find({}).populate('userPost').exec(function (err,posts) {

        if(!err){
            res.json(posts);
        }
        else{
            res.json('Error in retrieving posts list :' + err);
        }
    })
});

//find one form
router.get('/:id', function(req, res, next) {
    Post.findById(req.params.id,function (err,post) {

        if(!err){
            res.json(post);
        }
        else{
            res.json('Error in retrieving posts list :' + err);
        }
    })
});

//create a new post
router.post('/add/:id', function(req, res, next) {

    User.findById(req.params.id,function (err,user) {
        console.log(user)
        var p = new Post(req.body);
        p.userPost=user;
        p.save();
        console.log(p);
        res.json(p);
    })


});

router.post('/add', function(req, res, next) {

    var p = new Post(req.body);
    p.save();
    res.json(p);
});


//add a new response to a post
router.post('/response/add/:id/:idU', function(req, res, next) {
    Post.findById(req.params.id,function (err,post) {
        if(err)
            res.send(err)
        if(!post)
            res.status(400).send()
        else {
            //console.log(post)
            post.responses.push(req.body)
            post.save(function (err, doc) {
                if (err)
                    res.send(err)
                else
                    res.send(doc)
            });
        }
        //console.log('2');
    });

});

// validate a response
router.put('/:idP/response/validate/:id', function(req, res, next) {
    console.log('1');
    Post.findById(req.params.idP,function (err,post) {
        if(err)
            res.send(err)
        if(!post)
            res.status(400).send()
        else {
            //console.log(post)
            post.responses.id(req.params.id).status=true;
            post.save(function (err, doc) {
                if (err)
                    res.send(err)
                else
                    res.send(doc)
            });
        }
        //console.log('2');
    });



});






module.exports = router;
