var express = require('express');
var router = express.Router();
var user = require('../models/user');
var mongoose=require('mongoose');

/* GET home page. */

User = mongoose.model('User',user);
module.exports = function (passport) {
    router.post('/upload', function(req, res) {
        let sampleFile;
        let uploadPath;

        if (Object.keys(req.files).length == 0) {
            res.status(400).send('No files were uploaded.');
            return;
        }

        console.log('req.files >>>', req.files); // eslint-disable-line

        sampleFile = req.files.sampleFile;

        uploadPath = 'C:\\Users\\asus\\Documents\\GitHub\\PiwNode\\client\\public\\assets\\img\\uploads\\' + sampleFile.name;

        sampleFile.mv(uploadPath, function(err) {
            if (err) {
                return res.status(500).send(err);
            }

            res.send('File uploaded to ' + uploadPath);
        });
    });
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
                    res.status(400).send({message:'username '+username+' is already taken'});
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

    }),function (req,res) {
        console.log(res);
        res.send(req.session.passport)
    });

return router;
};
