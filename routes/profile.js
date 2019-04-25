var express = require('express');
var router = express.Router();
var Profil = require('../models/profile');
var Skills = require('../models/skills');
//profil
router.post('/', function (req, res, next) {

    var profil = new Profil(req.body);
    profil.save(function (err, prof) {
        if (err)
            res.send(err);
        else
            res.send(prof)
    })
});
router.get('/get', function (req, res) {
    Profil.find(function (err, profil) {
        if (err)
            res.send(err);
        if (!profil)
            res.status(400).send();
        else
            res.json(profil)
    })
});

router.get('/:id', function (req, res) {
    Profil.findById(req.params.id, function (err, profil) {
        if (err)
            res.status(400).send(err)
        else
            res.json(profil)
    })
});
router.delete('/:id', function (req, res) {
    Profil.findByIdAndRemove(req.params.id, function (err, profil) {
        if (err)
            res.send(err);
        else
            res.send();
    })
});
router.put('/:id', function (req, res, next) {
    Profil.findByIdAndUpdate(
        // the id of the item to find
        req.params.id,

        // the change to be made. Mongoose will smartly combine your existing
        // document with this change, which allows for partial updates too
        req.body,

        // an option that asks mongoose to return the updated version
        // of the document instead of the pre-updated one.
        {new: true},

        // the callback function
        (err, profil) => {
            console.log(profil)
            console.log(req.body)
            // Handle any possible database errors
            if (err) return res.status(500).send(err);
            return res.send(profil);
        }
    )
});
//skills
router.delete('/:id/skills/:idskills', function (req, res, next) {
    Profil.findById(req.params.id, function (err, profil) {
        if (err)
            res.send(err);
        if (!profil)
            res.status(400).send();
        else {
            profil.skills.id(req.params.idskills).remove();
            profil.save(function (err, pro) {
                if (err)
                    res.send(err);
                else
                    res.send()
            });


        }
    })
});
router.post('/:id/skills', function (req, res, next) {
    Profil.findById(req.params.id, function (err, profil) {
        if (err)
            res.send(err);
        if (!profil)
            res.status(400).send();
        else {
            profil.skills.push(req.body);
            profil.save(function (err, pro) {
                if (err)
                    res.send(err);
                else
                    res.send(pro)
            });


        }
    })
});
router.put('/:id/skills/:idskills', function (req, res, next) {
    Profil.findById(req.params.id, function (err, profil) {
        if (err)
            res.send(err);
        if (!profil)
            res.status(400).send();
        else {
            profil.skills.id(req.params.idskills).type = req.body.type;
            profil.skills.id(req.params.idskills).level = req.body.level;
            profil.save(function (err, pro) {
                if (err)
                    res.send(err);
                else
                    res.send(pro)
            });


        }
    })
});
//education
router.delete('/:id/education/:idedu', function (req, res, next) {
    Profil.findById(req.params.id, function (err, profil) {
        if (err)
            res.send(err);
        if (!profil)
            res.status(400).send();
        else {
            profil.education.id(req.params.idedu).remove();
            profil.save(function (err, pro) {
                if (err)
                    res.send(err);
                else
                    res.send(pro)
            });


        }
    })
});
router.post('/:id/education', function (req, res, next) {
    Profil.findById(req.params.id, function (err, profil) {
        if (err)
            res.send(err);
        if (!profil)
            res.status(400).send();
        else {
            profil.education.push(req.body);
            profil.save(function (err, pro) {
                if (err)
                    res.send(err);
                else
                    res.send(pro)
            });


        }
    })
});
router.put('/:id/education/:idedu', function (req, res, next) {
    Profil.findById(req.params.id, function (err, profil) {
        if (err)
            res.send(err);
        if (!profil)
            res.status(400).send();
        else {
            profil.education.id(req.params.idedu).title = req.body.title;
            profil.education.id(req.params.idedu).degree = req.body.degree;
            profil.education.id(req.params.idedu).date1 = req.body.date1;
            profil.education.id(req.params.idedu).date2 = req.body.date2;

            profil.save(function (err, pro) {
                if (err)
                    res.send(err);
                else
                    res.send(pro)
            });


        }
    })
});
//position
router.delete('/:id/position/:idpos', function (req, res, next) {
    Profil.findById(req.params.id, function (err, profil) {
        if (err)
            res.send(err);
        if (!profil)
            res.status(400).send();
        else {
            profil.position.id(req.params.idpos).remove();
            profil.save(function (err, pro) {
                if (err)
                    res.send(err);
                else
                    res.send(pro)
            });


        }
    })
});
router.post('/:id/position', function (req, res, next) {
    Profil.findById(req.params.id, function (err, profil) {
        if (err)
            res.send(err);
        if (!profil)
            res.status(400).send();
        else {
            profil.position.push(req.body);
            profil.save(function (err, pro) {
                if (err)
                    res.send(err);
                else
                    res.send(pro)
            });


        }
    })
});
router.put('/:id/position/:idpos', function (req, res, next) {
    Profil.findById(req.params.id, function (err, profil) {
        if (err)
            res.send(err);
        if (!profil)
            res.status(400).send();
        else {
            profil.position.id(req.params.idpos).titre = req.body.title;
            profil.position.id(req.params.idpos).companyName = req.body.companyName;
            profil.position.id(req.params.idpos).description = req.body.description;
            profil.position.id(req.params.idpos).date1 = req.body.date1;
            profil.position.id(req.params.idpos).date2 = req.body.date2;

            profil.save(function (err, pro) {
                if (err)
                    res.send(err);
                else
                    res.send(pro)
            });


        }
    })
});


module.exports = router;
