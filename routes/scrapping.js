var scrap = require('../scraping/index')
const configFile = require('../config.json')
var User =require('../models/user')
var express = require('express');
var router = express.Router();

const config = {
    email: process.env.SCRAPEDIN_EMAIL || configFile.email,
    password: process.env.SCRAPEDIN_PASSWORD || configFile.password,
    relatedProfilesKeywords: configFile.relatedProfilesKeywords,
    maxConcurrentCrawlers: configFile.maxConcurrentCrawlers,
    hasToLog: configFile.hasToLog,
    rootProfiles: configFile.rootProfiles,
    isHeadless: false,
    user:''
}
router.get('/:id',function (req,res,next) {
User.findById(req.params.id,function (err,user) {
    if(err)
        res.send(err)
    else {
config.rootProfiles.push(user.linkedin_url)
config.user=user.id
        scrap(config).then(profile=>res.send(profile))
    }
})
   //console.log(req.session);
//config.user=req.params.id;
//config.rootProfiles.push(req.params.url)
//scrap(config)
//res.send("ok");
})
module.exports= router;
