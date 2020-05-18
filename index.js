const puppeteer = require('puppeteer');
const twitter = require('./twitter');

(async () => {
    await twitter.initialize();

    // 
    //let user = await twitter.getUser('realDonaldTrump');
    
    let tweets = await twitter.getTweets('realDonaldTrump');

debugger;
})();
