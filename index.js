const puppeteer = require('puppeteer');
const twitter = require('./twitter');

(async () => {
    await twitter.initialize();

    // await twitter.getUser('Richerzhagen');
    //let user = await twitter.getUser('realDonaldTrump');
    
    let tweets = await twitter.getTweets('realDonaldTrump');

debugger;
})();
