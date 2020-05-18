const puppeteer = require('puppeteer');

//--> legacy url (will be discontinued june 2020)
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

        //--> tests for legacy url 
        // await page.setRequestInterception(true);
        // page.on('request', (request) => {
        //   if(['image', 'stylesheet', 'font', 'script'].includes(request.resourceType())){
        //       request.abort();
        //     }
        //   else{
        //       request.continue();
        //     }
        // })
    },

    getUser: async(username) => {
        let url = await page.url();

        if(url != USERNAME_URL(username)){
            await page.goto(USERNAME_URL(username));
        }
        
        //--> wait for username to load
        await page.waitFor('div[class="css-1dbjc4n r-15d164r r-1g94qm0"] span[class="css-901oao css-16my406 r-1qd0xha r-ad9z0x r-bcqeeo r-qvutc0"');

        //--> get username
        let user = await page.evaluate(() => {
            return document.querySelector('div[class="css-1dbjc4n r-15d164r r-1g94qm0"] span[class="css-901oao css-16my406 r-1qd0xha r-ad9z0x r-bcqeeo r-qvutc0"').innerText;
        })

        return user;
    },

    getTweets: async(username, count = 5) => {
        let url = await page.url();

        //--> disable js (legacy test)
        // await page.setJavaScriptEnabled(false);
        
        if(url != USERNAME_URL(username)){
            await page.goto(USERNAME_URL(username));
        }
       
        //--> proceed to legacy
        // await page.click('button[type="submit"]');
        // await page.waitFor('div[class="timeline"]');

        //--> get real name
        await page.waitFor('div[class="css-1dbjc4n r-15d164r r-1g94qm0"] span[class="css-901oao css-16my406 r-1qd0xha r-ad9z0x r-bcqeeo r-qvutc0"');
        let user = await page.evaluate(() => {
            return document.querySelector('div[class="css-1dbjc4n r-15d164r r-1g94qm0"] span[class="css-901oao css-16my406 r-1qd0xha r-ad9z0x r-bcqeeo r-qvutc0"').innerText;
        })

        //--> wait for timeline
        await page.waitFor(`div[aria-label="Timeline: ${user}’s Tweets"]`);
        await page.waitFor(3000);

        let tweetsArray = await page.$$(`div[aria-label="Timeline: ${user}’s Tweets"] div[data-testid="tweet"]`);
        let tweets = [];

        //--> while < count for testing purposes
        while(tweets.length < count){
            
            let tweetsArray = await page.$$(`div[aria-label="Timeline: ${user}’s Tweets"] div[data-testid="tweet"]`);

            for(let tweetElement of tweetsArray){
                try {
                    //TODO: different types of tweets / retweets / sorting when posted on same time / filter on keywords
                    let tweet = await tweetElement.$eval('div[class="css-901oao r-jwli3a r-1qd0xha r-a023e6 r-16dba41 r-ad9z0x r-bcqeeo r-bnwqim r-qvutc0"] span[class="css-901oao css-16my406 r-1qd0xha r-ad9z0x r-bcqeeo r-qvutc0"]', element => element.innerText);
                    let date = await tweetElement.$eval('a[class="css-4rbku5 css-18t94o4 css-901oao r-111h2gw r-1loqt21 r-1q142lx r-1qd0xha r-a023e6 r-16dba41 r-ad9z0x r-bcqeeo r-3s2u2q r-qvutc0"]', element => element.getAttribute('title'));
                    let interaction = await tweetElement.$$('div[class="css-1dbjc4n r-1iusvr4 r-18u37iz r-16y2uox r-1h0z5md"');
                    let commentCount = await interaction[0].$eval('span[class="css-901oao css-16my406 r-1qd0xha r-ad9z0x r-bcqeeo r-qvutc0"]', element => element.innerText);
                    let retweetCount = await interaction[1].$eval('span[class="css-901oao css-16my406 r-1qd0xha r-ad9z0x r-bcqeeo r-qvutc0"]', element => element.innerText);
                    let favoriteCount = await interaction[2].$eval('span[class="css-901oao css-16my406 r-1qd0xha r-ad9z0x r-bcqeeo r-qvutc0"]', element => element.innerText);
                   
                    tweets.push({date, tweet, commentCount, retweetCount, favoriteCount});

                } catch (error) {
                    // send mail
                }
            }

            await page.evaluate(`window.scrollTo(0, document.body.scrollHeight)`);
            await page.waitFor(2000);
        }
        debugger;
        return tweets;
    }
};

module.exports = twitter;