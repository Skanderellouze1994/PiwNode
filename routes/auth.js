var express = require('express');
var router = express.Router();
var User = require('../models/user');
var nodemailer = require('nodemailer');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var async = require('async');
var crypto = require('crypto');

/* GET home page. */

module.exports = function (passport) {
    router.post('/upload', function (req, res) {
        let sampleFile;
        let uploadPath;

        if (Object.keys(req.files).length == 0) {
            res.status(400).send('No files were uploaded.');
            return;
        }

        console.log('req.files >>>', req.files); // eslint-disable-line

        sampleFile = req.files.sampleFile;

        uploadPath = 'C:\\Users\\asus\\Documents\\GitHub\\PiwNode\\client\\public\\assets\\img\\uploads\\' + sampleFile.name;

        sampleFile.mv(uploadPath, function (err) {
            if (err) {
                return res.status(500).send(err);
            }

            res.send('File uploaded to ' + uploadPath);
        });
    });
    router.post('/signup', function (req, res, next) {
        var body = req.body;
        var username = body.username;
        var password = body.password;
        var email = body.email;
        var role = body.role;
        var name = body.name;
        var birthday = body.birthday;
        var tel = body.tel;
        var address = body.address;
        var facebook = body.facebook;
        var profile_photo = body.profile_photo;
        User.findOne({username: username}, function (err, doc) {
            if (err) {
                res.status(500).send('error occured');
            } else {
                if (doc) {
                    res.status(400).send({message: 'username ' + username + ' is already taken'});
                } else {
                    var record = new User();
                    record.username = username;
                    record.password = record.hashPassword(password);
                    record.role = role;
                    record.email = email;
                    record.name = name;
                    record.birthday = birthday;
                    record.tel = tel;
                    record.address = address;
                    record.facebook= facebook;
                    record.profile_photo= profile_photo;
                    record.save(function (err, user) {
                        if (err) {
                            res.status(500).send('db error');
                        } else {
                            res.send(user);
                        }
                    })
                }
            }
        })
    });

    router.post('/login', passport.authenticate('local', {}), function (req, res) {
        console.log(res);
        res.send(req.session.passport)
    });
    router.post('/loginfacebook', function (req, res) {
        User.find({}, function (err, users) {
           // console.log(users)
            const user = users.filter(u =>
                u.facebook.id == req.body.id
            )
            console.log()
            if(user[0])
            res.send({user:user[0]})
            else
                res.status(500).send({message: "no Account"})

        })
    });
    router.post('/forgot', function (req, res, next) {
        async.waterfall([
            function (done) {
                crypto.randomBytes(20, function (err, buf) {
                    var token = buf.toString('hex');
                    done(err, token);
                });
            },
            function (token, done) {
                User.findOne({email: req.body.email}, function (err, user) {
                    if (!user) {
                        console.log('No account with that email address exists.');
                        return res.redirect('/forgot');
                    }

                    user.resetPasswordToken = token;
                    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                    user.save(function (err) {
                        done(err, token, user);
                    });
                });
            },
            function (token, user, done) {
                var smtpTransport = nodemailer.createTransport({
                    service: 'SendGrid',
                    auth: {
                        user: 'apikey',
                        pass: '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'
                    }
                });
                smtpTransport.verify(function (error, success) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log("Server is ready to take our messages");
                    }
                });
                var mailOptions = {
                    to: user.email,
                    from: 'csmajs@gmail.com',
                    subject: 'Password Reset',
                    text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                        'http://localhost:3000/reset?' + token + '\n\n' +
                        'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                };
                smtpTransport.sendMail(mailOptions, function (err) {
                    console.log('An e-mail has been sent to ' + user.email + ' with further instructions.');
                    done(err, 'done');
                });
            }
        ], function (err) {
            if (err) return next(err);
            res.redirect('/auth/forgot');
        });
    });
    router.get('/reset/:token', function (req, res) {
        User.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpires: {$gt: Date.now()}
        }, function (err, user) {
            if (!user) {
                console.log('Get :Password reset token is invalid or has expired.');
                return res.redirect('/auth/forgot');
            }
            res.render('auth/reset', {
                user: req.user
            });
        });
    });

    router.post('/reset/:token', function (req, res) {
        async.waterfall([
            function (done) {
                User.findOne({
                    resetPasswordToken: req.params.token,
                    resetPasswordExpires: {$gt: Date.now()}
                }, function (err, user) {
                    if (!user) {
                        console.log('Post :Password reset token is invalid or has expired.');
                        return res.redirect('/');
                    }
                    var pass = req.body.password;

                    user.password = user.hashPassword(pass);
                    user.resetPasswordToken = undefined;
                    user.resetPasswordExpires = undefined;

                    user.save(function (err) {
                        req.logIn(user, function (err) {
                            done(err, user);
                        });
                    });
                });
            },
            function (user, done) {
                var smtpTransport = nodemailer.createTransport({
                    service: 'SendGrid',
                    auth: {
                        user: 'apikey',
                        pass: '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'
                    }
                });
                var mailOptions = {
                    to: user.email,
                    from: 'csmajs@gmail.com',
                    subject: 'Your password has been changed',
                    text: 'Hello,\n\n' +
                        'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
                };
                smtpTransport.sendMail(mailOptions, function (err) {
                    console.log('Success! Your password has been changed.');
                    done(err);
                });
            }
        ], function (err) {
            res.redirect('/');
        });
    });
    router.get('/connect/linkedin',
        passport.authorize('linkedin-authz', {failureRedirect: '/login'})
    );

    router.get('/connect/linkedin/callback',
        passport.authorize('linkedin-authz', {failureRedirect: '/login'}),
        function (req, res) {

            var user = req.user;
            var account = req.account;
            console.log(req.account)
            res.send(req.account)
            // Associate the Twitter account with the logged-in user.
            //account.userId = user.id;
            //account.save(function(err) {
            //   if (err) { return self.error(err); }
            // self.redirect('http://127.0.0.1:3000/');
            // });
        }
    );
    router.get('/test', function (req, res) {
        var io = req.app.get('io');
        //console.log(io)
        io.on('connection', function (socket) {
            console.log('achraf');
            //Whenever someone disconnects this piece of code executed
            socket.on('disconnect', function () {
                console.log('A user disconnected........');
            });
        });
    });
    return router;
};
