const scrapedin = require('scrapedin')
const crawl = require('./crawler')
var q = require('q')


module.exports=function scrapping(config){
  scrapedin(config)
      .then((profileScraper) => crawl(config,profileScraper, config.rootProfiles))
}
//scrapedin(config)
 // .then((profileScraper) => crawl(profileScraper, config.rootProfiles))
