var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET home page. */


module.exports = function (passport) {
    router.post('/signup', function(req, res, next) {
        var body = req.body;
        var username = body.username;
        var password = body.password;
        var email = body.email;
        var role = body.role;
        User.findOne({username:username},function (err,doc) {
            if(err){
                res.status(500).send('error occured');
            }
            else{
                if(doc){
                    res.status(500).send('username already exists');
                }
                else{
                    var record = new User();
                    record.username = username;
                    record.password = record.hashPassword(password);
                    record.role = role;
                    record.email = email;
                    record.save(function (err,user) {
                        if(err){
                            res.status(500).send('db error');
                        }
                        else{
                            res.send(user);
                        }
                    })
                }
            }
        })
    });

    router.post('/login',passport.authenticate('local',{
        failureRedirect:'/login',
        successRedirect:'/profile'
    }),function (req,res) {
        res.send('hey')
    });
return router;
};
