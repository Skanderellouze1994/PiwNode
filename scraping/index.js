const scrapedin = require('scrapedin')
const crawl = require('./crawler')
var q = require('q')


/*module.exports = async function scrapping(config) {
    var profile = null
   await scrapedin(config)
        .then((profileScraper) => {
            //console.log(profileScraper)
            //console.log(profileScraper)
            crawl(config, profileScraper, config.rootProfiles).then((res)=>profile=res)
        })
    return profile
}
*/

//scrapedin(config)
// .then((profileScraper) => crawl(profileScraper, config.rootProfiles))
module.exports = async (config)=> new Promise(((resolve) => {
     scrapedin(config)
        .then((profileScraper) => {
            //console.log(profileScraper)
            //console.log(profileScraper)
            crawl(config, profileScraper, config.rootProfiles).then((res)=>resolve(res))
        })

}))
