var express = require('express');
var router = express.Router();

var passport = require('passport');

var loggedIn = function(req,res,next){
  if(req.isAuthenticated()){
    next()
  }
  else{
    res.redirect('/login')
  }
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login.twig');
});

router.get('/signup', function(req, res, next) {
  res.render('signup.twig');
});


router.get('/profile',loggedIn, function(req, res, next) {
  console.log(req.session.passport);
  res.send(req.session)
});

router.get('/profile/facebook',loggedIn, function(req, res, next) {
  console.log(req.session.passport);
  res.send(req.session)
});

router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email']}));

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/profile/facebook');
    });

router.get('/logout', function(req, res, next) {
  req.logout();
  res.send('/');
});

module.exports = router;
