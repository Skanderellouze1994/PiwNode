var express = require('express');
var router = express.Router();

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
  console.log(req.session.passport.user.username);
  res.send(req.session)
});

router.get('/logout', function(req, res, next) {
  req.logout();
  res.send('/');
});

module.exports = router;
