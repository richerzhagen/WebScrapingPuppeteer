const request = require('request-promise');
const cheerio = require('cheerio');

const URL = 'https://www.imdb.com/title/tt0068646/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=e31d89dd-322d-4646-8962-327b42fe94b1&pf_rd_r=S1NAEX8YCGZ61CEVXGCJ&pf_rd_s=center-1&pf_rd_t=15506&pf_rd_i=top&ref_=chttp_tt_2';

(async () => {
    const response = await request({
        uri: URL,
        headers: {
            'authority': 'www.imdb.com',
            'method': 'GET',
            'path': '/title/tt0068646/',
            'scheme': 'https',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-US,en;q=0.9',
            //'cookie': 'uu=BCYhCbBAeI_bWDFq0D92Q2ac-NtDmGKBVAuvXtQ9kqbwANyACyDf4YN7QwywxjSzoxMtEOvdkqaE%0D%0Ad-13srxNj7RRJgAXgEdE6A99BQTMJv_38rDpLLE9hOvBtfYUrTLdze7vpUsoFLNfiZc8MGbupFMm%0D%0AtQ%0D%0A; session-id=143-9694584-2385444; session-id-time=2220238459; adblk=adblk_no; ubid-main=131-2723326-9455003; csm-hit=tb:S1NAEX8YCGZ61CEVXGCJ+s-3ANPYQY5J7V9SC58AWBA|1589525255135&t:1589525255135&adb:adblk_no',
            'sec-fetch-dest': 'document',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'none',
            'sec-fetch-user': '?1',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36'
        },
        gzip: true,
    });
    //console.log(response);
    let $ = cheerio.load(response);
    
    let title = $('div[class="title_wrapper"] > h1').text();
    
    // let rating = $('span[itemprop="ratingValue"]').text();
    let rating = $('div[class="ratingValue"] > strong > span').text();
    console.log(title, rating);
})()