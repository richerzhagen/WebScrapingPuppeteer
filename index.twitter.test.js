const request = require('request-promise');
const cheerio = require('cheerio');

const URL = 'https://twitter.com/realdonaldtrump';
// const URL = 'https://api.twitter.com/2/timeline/profile/25073877.json?include_profile_interstitial_type=1&include_blocking=1&include_blocked_by=1&include_followed_by=1&include_want_retweets=1&include_mute_edge=1&include_can_dm=1&include_can_media_tag=1&skip_status=1&cards_platform=Web-12&include_cards=1&include_composer_source=true&include_ext_alt_text=true&include_reply_count=1&tweet_mode=extended&include_entities=true&include_user_entities=true&include_ext_media_color=true&include_ext_media_availability=true&send_error_codes=true&simple_quoted_tweet=true&include_tweet_replies=false&userId=25073877&count=20&ext=mediaStats%2ChighlightedLabel%2CcameraMoment';

(async () => {
    const response = await request({
        uri: URL,
        headers: {
            'authority': 'api.twitter.com',
            'method': 'GET',
            'path': '/2/timeline/profile/25073877.json?include_profile_interstitial_type=1&include_blocking=1&include_blocked_by=1&include_followed_by=1&include_want_retweets=1&include_mute_edge=1&include_can_dm=1&include_can_media_tag=1&skip_status=1&cards_platform=Web-12&include_cards=1&include_composer_source=true&include_ext_alt_text=true&include_reply_count=1&tweet_mode=extended&include_entities=true&include_user_entities=true&include_ext_media_color=true&include_ext_media_availability=true&send_error_codes=true&simple_quoted_tweet=true&include_tweet_replies=false&userId=25073877&count=20&ext=mediaStats%2ChighlightedLabel%2CcameraMoment',
            'scheme': 'https',
            'accept': '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-US,en;q=0.9',
            'authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA',
            //'cookie': 'personalization_id="v1_X7Mkp6RViGOnZbvsTuHNrQ=="; tfw_exp=0; guest_id=v1%3A158904589946609315; dnt=1; ads_prefs="HBISAAA="; kdt=ctPptnMhkTvc0AwVhhLd8jeymyFLE2EC4DvNZYtq; _ga=GA1.2.1461101793.1589520314; _gid=GA1.2.1125438614.1589520314; des_opt_in=Y; syndication_guest_id=v1%3A158952974577682743; remember_checked_on=1; csrf_same_site_set=1; csrf_same_site=1; rweb_optin=side_no_out; night_mode=1; auth_token=11fd6a3c5f9e9e54e2028aa4ea8e602514742cee; twid=u%3D62007969; external_referer=padhuUp37zjgzgv1mFWxJ12Ozwit7owX|0|8e8t2xd8A2w%3D; _twitter_sess=BAh7BiIKZmxhc2hJQzonQWN0aW9uQ29udHJvbGxlcjo6Rmxhc2g6OkZsYXNo%250ASGFzaHsABjoKQHVzZWR7AA%253D%253D--1164b91ac812d853b877e93ddb612b7471bebc74; ct0=4ffd3cc2d987d174090ead2a217388bc; __utma=191792890.1461101793.1589520314.1589689164.1589689164.1; __utmc=191792890; __utmz=191792890.1589689164.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none)',
            'origin': 'https://twitter.com',
            'referer': 'https://twitter.com/realdonaldtrump',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36',
            'x-csrf-token': '4ffd3cc2d987d174090ead2a217388bc',
            'x-twitter-active-user': 'yes',
            'x-twitter-auth-type': 'OAuth2Session',
            'x-twitter-client-language': 'en',    
        },
        gzip: true,
    });
    //console.log(response);
    let $ = cheerio.load(response);
    console.log(response);
    let title = $('div[class="title_wrapper"] > h1').text();
    
    // let rating = $('span[itemprop="ratingValue"]').text();
    let rating = $('div[class="ratingValue"] > strong > span').text();
    console.log(title, rating);
})()