const dependencies = {
  extractRelatedProfiles: require('./extractRelatedProfiles'),
  saveProfile: require('./saveProfile'),
  logger: require('./logger'),
  getProfileIdFromUrl: require('./getIdFromProfileUrl'),
  saveProfileToDataBase : require('../scraping/saveProfileToDataBase')
}

module.exports = async (config,profileScraper, profileUrl, injection) => {
  const {
    extractRelatedProfiles,
    saveProfileToDataBase,
    logger,
    getProfileIdFromUrl,

  } = Object.assign({}, dependencies, injection)

  try {
    const profileId = getProfileIdFromUrl(profileUrl)
    var profile = await profileScraper('https://www.linkedin.com/in/' + profileId, 5000)
profile={
      ...profile,
  user:config.user

}
    //console.log(profile);
    await saveProfileToDataBase(profile);


    const related = await extractRelatedProfiles(profile, profileId)
     //await console.log(related)
    return [related,profile]
  } catch (e) {
    logger.error(`error on crawling profile: ${profileUrl} \n ${e}`)
  }
}
