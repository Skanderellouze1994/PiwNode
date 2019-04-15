var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Ressource = require('../models/ressources');


/*CREATE QUIZ*/
router.post('/:idTutor', function (req, res) {
    var idTutor = req.params.idTutor;
    var ressource = new Ressource(req.body);
    ressource.tutor=idTutor;
    ressource.save(function (err, ressource) {
        if(err)
            res.send(err);
        else
            res.json(ressource);
    })
});
/*READ QUIZ*/
router.get('/', function (req, res) {
    Ressource.find(function (err, ressource) {
        if (err)
        {res.send(err)}
        if (!ressource)
        {res.status(404).send()}
        else res.json(ressource)
    });
});
/*FIND QUIZ*/
router.get('/:id', function (req, res) {
    var id = req.params.id;
    Ressource.findById(id).exec(function (err, ressource) {
        if (err)
        {res.send(err)}
        else res.json(ressource)
    });
});
/*UPDATE QUIZ*/
router.put('/:id', function (req, res) {
    Ressource.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, ressource) => {
        if (err) return res.status(500).send(err);
        return res.send(ressource);
    })
});
/*DELETE QUIZ*/
router.delete('/:id', function (req, res) {
    var id = req.params.id;
    Ressource.findByIdAndDelete(id, function (err, ressource) {
        if (err)
        {res.send(err)}
        else res.send()
    });
});

module.exports = router;
