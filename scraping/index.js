const scrapedin = require('scrapedin')
const configFile = require('../config.json')
const crawl = require('./crawler')
var q = require('q')

const config = {
  email: process.env.SCRAPEDIN_EMAIL || configFile.email,
  password: process.env.SCRAPEDIN_PASSWORD || configFile.password,
  relatedProfilesKeywords: configFile.relatedProfilesKeywords,
  maxConcurrentCrawlers: configFile.maxConcurrentCrawlers,
  hasToLog: configFile.hasToLog,
  rootProfiles: configFile.rootProfiles,
  isHeadless: false
}
module.exports=function scrapping(config){
  scrapedin(config)
      .then((profileScraper) => crawl(config,profileScraper, config.rootProfiles))
}
//scrapedin(config)
 // .then((profileScraper) => crawl(profileScraper, config.rootProfiles))
