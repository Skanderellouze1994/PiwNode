var express = require('express');
var router = express.Router();
var user = require('../models/user');
var mongoose=require('mongoose');
User = mongoose.model('User',user);

/* GET users listing. */
router.get('/', function(req, res, next) {

  res.send('respond with a resource');
});

//complete profil
router.post('/user/profil/:id', function(req, res, next) {
  User.findById(req.params.id,function (err,u) {
    u.facebook_url=req.facebook_url;
    u.linkedin_url=req.linkedin_url;
    u.github_url=req.github_url;
    u.position=req.position;
    u.about_me=req.about_me;
    u.num_tel=req.num_tel;
    u.address=req.address;
    u.name=req.name;
    u.email=req.email;
    u.save()
  });
});

module.exports = router;
