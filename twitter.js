const puppeteer = require('puppeteer');

// legacy url (will be discontinued june 2020)
// const BASE_URL = 'https://mobile.twitter.com/';
// const USERNAME_URL = (username) => `https://mobile.twitter.com/${username}`;

const BASE_URL = 'https://twitter.com/';
const USERNAME_URL = (username) => `https://twitter.com/${username}`;

let browser = null;
let page = null;

const twitter = {

    initialize: async() => {
        browser = await puppeteer.launch({headless: false});
        page = await browser.newPage();

        // await page.setRequestInterception(true);
        // page.on('request', interceptedRequest => {
        //   if (interceptedRequest.url().endsWith('.json?include_profile_interstitial_type=1&include_blocking=1&include_blocked_by=1&include_followed_by=1&include_want_retweets=1&include_mute_edge=1&include_can_dm=1&include_can_media_tag=1&skip_status=1&cards_platform=Web-12&include_cards=1&include_composer_source=true&include_ext_alt_text=true&include_reply_count=1&tweet_mode=extended&include_entities=true&include_user_entities=true&include_ext_media_color=true&include_ext_media_availability=true&send_error_codes=true&simple_quoted_tweet=true&include_tweet_replies=false&userId=25073877&count=20&ext=mediaStats%2ChighlightedLabel%2CcameraMoment'))
        //     interceptedRequest.continue();  
        //   else
        //     interceptedRequest.abort();
        // });

        // await page.setRequestInterception(true);
        // page.on('request', (request) => {
        //   if(['image', 'stylesheet', 'font'].includes(request.resourceType())){
        //       request.abort();
        //     }
        //   else{
        //       request.continue();
        //     }
        // })
    },

    getUser: async(username) => {
        let url = await page.url()

        if(url != USERNAME_URL(username)){
            await page.goto(USERNAME_URL(username));
        }
        
        await page.waitFor('div[class="css-1dbjc4n r-15d164r r-1g94qm0"] span[class="css-901oao css-16my406 r-1qd0xha r-ad9z0x r-bcqeeo r-qvutc0"');

        let user = await page.evaluate(() => {
            return document.querySelector('div[class="css-1dbjc4n r-15d164r r-1g94qm0"] span[class="css-901oao css-16my406 r-1qd0xha r-ad9z0x r-bcqeeo r-qvutc0"').innerText;
        })

        return user;
    },

    getTweets: async(username, count = 10) => {
        let url = await page.url();
        // disable js
        // await page.setJavaScriptEnabled(false);
        
        if(url != USERNAME_URL(username)){
            await page.goto(USERNAME_URL(username));
        }
       
        // proceed to legacy
        // await page.click('button[type="submit"]');
        // await page.waitFor('div[class="timeline"]');

        // get username
        await page.waitFor('div[class="css-1dbjc4n r-15d164r r-1g94qm0"] span[class="css-901oao css-16my406 r-1qd0xha r-ad9z0x r-bcqeeo r-qvutc0"');
        let user = await page.evaluate(() => {
            return document.querySelector('div[class="css-1dbjc4n r-15d164r r-1g94qm0"] span[class="css-901oao css-16my406 r-1qd0xha r-ad9z0x r-bcqeeo r-qvutc0"').innerText;
        })

        // wait for timeline
        await page.waitFor(`div[aria-label="Timeline: ${user}’s Tweets"]`);
        await page.waitFor(3000);

        let tweetsArray = await page.$$(`div[aria-label="Timeline: ${user}’s Tweets"] div[data-testid="tweet"]`);
        let lastTweetsArrayLength = 0;
        let tweets = [];

        while(tweets.length < count){
        //     await page.evaluate(`window.scrollTo(0, document.body.scrollHeight)`);
        //     await page.waitFor(3000);
        //     tweetsArray = await page.$$(`div[aria-label="Timeline: ${user}’s Tweets"] div[data-testid="tweet"]`);
        
        //     if(lastTweetsArrayLength == tweetsArray.length){
        //         break;
        //     };

        //     lastTweetsArrayLength = tweetsArray.length;
        // }
        // var scrollHeight = 0;

            let tweetsArray = await page.$$(`div[aria-label="Timeline: ${user}’s Tweets"] div[data-testid="tweet"]`);
            let lastTweet;
            for(let tweetElement of tweetsArray){
                try {
                    let tweet = await tweetElement.$eval('div[class="css-901oao r-jwli3a r-1qd0xha r-a023e6 r-16dba41 r-ad9z0x r-bcqeeo r-bnwqim r-qvutc0"] span[class="css-901oao css-16my406 r-1qd0xha r-ad9z0x r-bcqeeo r-qvutc0"]', element => element.innerText);
                    let date = await tweetElement.$eval('a[class="css-4rbku5 css-18t94o4 css-901oao r-111h2gw r-1loqt21 r-1q142lx r-1qd0xha r-a023e6 r-16dba41 r-ad9z0x r-bcqeeo r-3s2u2q r-qvutc0"]', element => element.getAttribute('title'));
                    let interaction = await tweetElement.$$('div[class="css-1dbjc4n r-1iusvr4 r-18u37iz r-16y2uox r-1h0z5md"');
                    let commentCount = await interaction[0].$eval('span[class="css-901oao css-16my406 r-1qd0xha r-ad9z0x r-bcqeeo r-qvutc0"]', element => element.innerText);
                    let retweetCount = await interaction[1].$eval('span[class="css-901oao css-16my406 r-1qd0xha r-ad9z0x r-bcqeeo r-qvutc0"]', element => element.innerText);
                    let favoriteCount = await interaction[2].$eval('span[class="css-901oao css-16my406 r-1qd0xha r-ad9z0x r-bcqeeo r-qvutc0"]', element => element.innerText);
    
                    // var elementHeight = tweetElement.offsetHeight;
                    tweets.push({date, tweet, commentCount, retweetCount, favoriteCount});
                    //await page.focus(tweetElement.$eval('div[class="css-901oao r-jwli3a r-1qd0xha r-a023e6 r-16dba41 r-ad9z0x r-bcqeeo r-bnwqim r-qvutc0"] span[class="css-901oao css-16my406 r-1qd0xha r-ad9z0x r-bcqeeo r-qvutc0"]'));
                    lastTweet = tweetElement;
                } catch (error) {
                    
                }


            }
            await page.evaluate(() => {
                lastTweet.querySelector('div[class="css-901oao r-jwli3a r-1qd0xha r-a023e6 r-16dba41 r-ad9z0x r-bcqeeo r-bnwqim r-qvutc0"] span[class="css-901oao css-16my406 r-1qd0xha r-ad9z0x r-bcqeeo r-qvutc0"]').scrollIntoView();
             });   
            //await page.evaluate(`window.scrollTo(0, document.body.scrollHeight)`);
            await page.waitFor(2000);
        }
        debugger;
        return tweets;
    }
};

module.exports = twitter;

// fetch("https://api.twitter.com/2/timeline/profile/25073877.json?include_profile_interstitial_type=1&include_blocking=1&include_blocked_by=1&include_followed_by=1&include_want_retweets=1&include_mute_edge=1&include_can_dm=1&include_can_media_tag=1&skip_status=1&cards_platform=Web-12&include_cards=1&include_composer_source=true&include_ext_alt_text=true&include_reply_count=1&tweet_mode=extended&include_entities=true&include_user_entities=true&include_ext_media_color=true&include_ext_media_availability=true&send_error_codes=true&simple_quoted_tweet=true&include_tweet_replies=false&userId=25073877&count=20&ext=mediaStats%2ChighlightedLabel%2CcameraMoment", {
//   "headers": {
//     "accept": "*/*",
//     "accept-language": "en-US,en;q=0.9",
//     "authorization": "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA",
//     "cache-control": "no-cache",
//     "pragma": "no-cache",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-site",
//     "x-csrf-token": "6f125d1be8cbc5aa5d57409b557edb60",
//     "x-guest-token": "1261877139327971328",
//     "x-twitter-active-user": "yes",
//     "x-twitter-client-language": "en",
//     "cookie": "personalization_id=\"v1_07fu6dCuS60qmgPUYnIgTA==\"; guest_id=v1%3A158968992920461130; gt=1261877139327971328; ct0=6f125d1be8cbc5aa5d57409b557edb60; _twitter_sess=BAh7CSIKZmxhc2hJQzonQWN0aW9uQ29udHJvbGxlcjo6Rmxhc2g6OkZsYXNo%250ASGFzaHsABjoKQHVzZWR7ADoPY3JlYXRlZF9hdGwrCPFR5yByAToMY3NyZl9p%250AZCIlZWYwMjNhNDQxMGQwNDE4OTQ0NmE5ZDYwMDQ3OTM1OTU6B2lkIiU4NTE1%250AYjZlNzUzZjExMGU1MGYxZDBlMmZkMjU3OWZiZg%253D%253D--65cdb84de350de21d5f638c205d0102eac819441"
//   }})