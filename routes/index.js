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

router.get('/profile/github',loggedIn, function(req, res, next) {
  console.log(req.session.passport);
  res.send(req.session)
});

router.get('/profile/linkedin',loggedIn, function(req, res, next) {
  console.log(req.session.passport);
  res.send(req.session)
});


router.get('/auth/github',
    passport.authenticate('github'));

router.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/profile/github');
    });

router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email']}));

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/profile/facebook');
    });


router.get('/auth/linkedin',
    passport.authenticate('linkedin', { state: 'SOME STATE'  }),
    function(req, res){
      // The request will be redirected to LinkedIn for authentication, so this
      // function will not be called.
    });

router.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
  successRedirect: '/profile/linkedin',
  failureRedirect: '/login'
}));

router.get('/logout', function(req, res, next) {
  req.logout();
  res.send('/');
});

module.exports = router;
