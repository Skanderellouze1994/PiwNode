var scrap = require('../scraping/index')
const configFile = require('../config.json')
var User =require('../models/user')
var express = require('express');
var router = express.Router();
//const scrapedin = require('../scraping/scrapedin/scrapedin')
const scrapedin = require('scrapedin')
var scrapping = async (url)=>new Promise(async (resolve,reject) => {
    const profileScraper = await scrapedin({email: 'csmajs2019@gmail.com', password: 'piweb2019',isHeadless:false})
    const profile = await profileScraper(url)
    resolve(profile)
    reject(profile)
})

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
        scrapping(user.linkedin_url).then(r=> res.send(r)).catch(r=>res.send(r))
        // scrap(config).then(profile=>res.send(profile))
    }
})
   //console.log(req.session);
//config.user=req.params.id;
//config.rootProfiles.push(req.params.url)
//scrap(config)
//res.send("ok");
})
module.exports= router;
