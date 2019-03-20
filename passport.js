var LocalStrategy = require('passport-local').Strategy;
var user = require('./models/user');
FacebookStrategy = require('passport-facebook').Strategy;
var GitHubStrategy = require('passport-github').Strategy;
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var mongoose=require('mongoose');
User = mongoose.model('User',user);
module.exports=function (passport) {
    passport.serializeUser(function (user,done) {
        done(null,user);
    });
    passport.deserializeUser(function (user,done) {
        done(null,user);
    });
    passport.use(new LocalStrategy(
        function(username, password, done) {
            User.findOne({ username: username,password:password }, function(err, user) {
               if (err) { return done(); }
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                return done(null, user);
            });
        }
    ));

    passport.use(new FacebookStrategy({
            clientID: '426024058143152',
            clientSecret: '197b024bf6451452299c9bb50d1fb2f4',
            callbackURL: "http://localhost:4000/auth/facebook/callback",
            // passReqToCallback : false,
            profileFields: ['id', 'emails', 'name','displayName','picture.type(large)'] //This
        },
        function(accessToken, refreshToken, profile, done) {
            process.nextTick(function() {
                    console.log(profile._json);
                    var existe = User.findOne({'facebook.id':profile.id},function (err,user) {
                        if(user){
                            return done(null,user)
                        }
                        else
                        {
                            var newUser = new User();
                            newUser.facebook.id = profile._json.id;
                            newUser.facebook.token = accessToken;
                            newUser.username = profile.name.givenName+ ' '+profile.name.familyName;
                            newUser.email = profile.emails[0].value;
                            console.log("bbb");
                            newUser.save(function (err,newUser) {
                                console.log("ccc");
                            });
                            return done(null,newUser)
                        }});
                }
            )}))

    passport.use(new GitHubStrategy({
            clientID: '6285c3dd0898aa94f691',
            clientSecret: '9acf2aee429484f1cfff6ad76bab8b592e556ccd',
            callbackURL: "http://127.0.0.1:4000/auth/github/callback"
            //profileFields: ['id', 'emails', 'name','displayName']
        },
        function(accessToken, refreshToken, profile, done) {
            process.nextTick(function() {
                    console.log(profile._json);
                    var existe = User.findOne({'github.id':profile.id},function (err,user) {
                        if(user){
                            return done(null,user)
                        }
                        else
                        {
                            var newUser = new User();
                            newUser.github.id = profile.id;
                            newUser.github.url = profile.ProfileUrl;
                            newUser.username = profile.username;
                            newUser.github.photo = profile.avatar_url;
                            //newUser.email = profile.emails[0].value;
                            console.log("bbb");
                            newUser.save(function (err,newUser) {
                                console.log("ccc");
                            });
                            return done(null,newUser)
                        }});
                }
            )}));

    passport.use(new LinkedInStrategy({
        clientID: '862ekdwlfwuu6j',
        clientSecret: 'Qpd24YBESAt2esEH',
        callbackURL: "http://127.0.0.1:4000/auth/linkedin/callback",
        scope: ['r_emailaddress', 'r_basicprofile'],
    }, function(accessToken, refreshToken, profile, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {
            console.log(profile)
                var existe = User.findOne({'linkedin.id':profile.id},function (err,user) {
                    if(user){
                        return done(null,user)
                    }
                    else
                    {
                        var newUser = new User();
                        newUser.linkedin.id = profile.id;
                        //newUser.github.url = profile.ProfileUrl;
                        newUser.username = profile.displayName;
                        newUser.email = profile.emails[0].value;
                        console.log("bbb");
                        newUser.save(function (err,newUser) {
                            console.log("ccc");
                        });
                        return done(null,newUser)
                    }});
            }
        )}));

    passport.use(new GoogleStrategy({
            clientID: '514608932569-uui3nhiloakd9d1nob0tso24ao2o718a.apps.googleusercontent.com',
            clientSecret: '3sPuTFIzTboRzsD3yco3BX8c',
            callbackURL: "http://127.0.0.1:4000/auth/google/callback",
            scope: [ 'https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/userinfo.email'],
        },
        function(accessToken, refreshToken, profile, done) {
            process.nextTick(function () {
                    console.log(profile)
                    var existe = User.findOne({'google.id':profile.id},function (err,user) {
                        if(user){
                            return done(null,user)
                        }
                        else
                        {
                            var newUser = new User();
                            newUser.google.id = profile.id;
                            newUser.username = profile.displayName;
                            newUser.email = profile.emails[0].value;
                            console.log("bbb");
                            newUser.save(function (err,newUser) {
                                console.log("ccc");
                            });
                            return done(null,newUser)
                        }});
                }
            )}));
};