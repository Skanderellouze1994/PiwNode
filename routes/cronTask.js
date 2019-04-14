const cron = require('node-cron');
const dummy = require('mongoose-dummy');
const ignoredFields = ['_id', 'created_at', '__v', /detail.*_info/, 'studentList', 'courses'];
const Training = require('../models/trainingSession');
const Profile = require('../models/profile');
cron.schedule('* * * * *', () => {
    let compteur;
    for (compteur = 1; compteur <= 10; compteur++) {
        let randomObject = dummy(Training, {ignored: ignoredFields})
        // console.log(randomObject);
//new Training(randomObject).save()
    }

});
cron.schedule('0 0 * * *', () => {
    let d = new Date();
    d.setDate(d.getDate() - 1);
    //console.log(d)
    Training.find({endDate: {$gte: d, $lt: Date.now()}})

        .populate('courses')
        .populate({path: 'studentsList', model: 'User', populate: {path: 'profile', model: 'Profile'}})
        .exec(function (err, trains) {
            console.log(trains);
            trains.map(t => {

                let skillsCourses = new Set(t.courses.map((c) => {
                    return c.category
                }));
                t.studentsList.map((student) => {
                    let skillsStudent = new Set(student.profile.skills.map(sk => {
                        return sk.title
                    }));
                    difference(skillsCourses, skillsStudent).forEach(skill => {
                        addSkills(student.profile.id, skill)
                    });
                    student.profile.skills.forEach((s) => {
                        if (skillsCourses.has(s.title)) {
                            //console.log('exist')
                                updateSkills(student.profile.id, s)
                        }

                        // updateSkills(student.profile.id,student.profile.skills)
                        //student.profile.skills.forEach(a=>console.log(a))
                    })

                })
            });
        })
});

function updateSkills(idprof, s) {
    Profile.findById(idprof, function (err, prof) {
        //console.log('update');
        if (err)
            console.log(err);
        else {
            // console.log(prof.skills.id(idskills).count)
            if (!isNaN(prof.skills.id(s.id).count)) {
                if(prof.skills.id(s.id).count<100)
                prof.skills.id(s.id).count += 5

            } else {
                prof.skills.id(s.id).count = 5

                //  prof.skills.push({title:})
            }
            prof.save(function (err, proff) {
                if (err)
                    console.log(err)
            })
        }

    })

}

function addSkills(idprof, skill) {
    console.log('add');
    Profile.findById(idprof, function (err, prof) {
        if (err)
            console.log(err);
        else {
            prof.skills.push({title: skill, count: 5});
            prof.save(function (err, proff) {
                if (err)
                    console.log(err)
            })
        }

    })

}

function difference(setA, setB) {
    //console.log(setA)
    //console.log(setB)
    var difference = new Set(setA);
    for (var elem of setB) {
        difference.delete(elem);
    }
    return difference;
}

module.exports = cron;
