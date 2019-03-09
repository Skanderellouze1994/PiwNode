var localStrategy = require('passport-local').Strategy;
var User = require('./models/user');
FacebookStrategy = require('passport-facebook').Strategy;

module.exports=function (passport) {
    passport.serializeUser(function (user,done) {
        done(null,user);
    });
    passport.deserializeUser(function (user,done) {
        done(null,user);
    });
    passport.use(new localStrategy(function (username,password,done) {
        User.findOne({username:username},function (err,doc) {
            if(err){
                done(err);
            }
            else{
                if(doc){
                    var valid = doc.comparePassword(password,doc.password)
                    if(valid){
                        done(null,{
                            username:doc.username,
                            password:doc.password
                        })
                    }
                    else{
                        done(null,false)
                    }
                }
                else{
                    done(null,false)
                }
            }

        })
    }));

    passport.use(new FacebookStrategy({
            clientID: '257813661824757',
            clientSecret: 'bcff316934d7c64e1c14cdc677860125',
            callbackURL: "http://localhost:3000/auth/facebook/callback",
            // passReqToCallback : false,
            profileFields: ['id', 'emails', 'name','displayName'] //This
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


};