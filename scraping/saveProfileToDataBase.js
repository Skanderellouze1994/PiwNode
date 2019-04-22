var profil= require('../models/profile');
var User= require('../models/user');

module.exports = function (profile) {
    pro=new profil({

        name : profile.profile.name,
        headline : profile.profile.headline,
        location :  profile.profile.location,
        summary :profile.profile.summary,

        education :profile.educations,

        position : profile.positions,

        skills : profile.skills,
    });

    pro.save(function (err, profil) {
        if(err){
            return err;
        }else{
            User.findById(profile.user,function (err,user) {
                if(err)
                    console.log(err)
                else {
                    user.profile = profil.id
                    user.save(function (err,u) {
                        if(err)
                            console.log(err)

                            //console.log(u)
                    })
                }
            })
            return profil;
        }
    })
};
