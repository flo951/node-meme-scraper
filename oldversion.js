import cheerio from 'cheerio';
import axios from 'axios';
import Path from 'node:path';
import fs from 'fs';

// URL to be scraped for images
const url = 'https://memegen-link-examples-upleveled.netlify.app/';
const folder = '/Users/flo/projects/node-meme-scraper/memes/';

// get website data from server with axios
const getWebsite = (urlToScrape) => {
  axios
    .get(urlToScrape)
    .then((response) => {
      // List of 10 first img to download
      let imgListDown = [];
      // use cheerio to search in data and store it
      let $ = cheerio.load(response.data);

      let imgToSave = [];
      // store each img in an array
      $('img').each((index, element) => {
        let imgSource = $(element).attr('src');
        imgToSave.push(imgSource);
        //console.log(imgSource);
      });
      // loop over the array and push 10 first to another array
      for (let i = 0; i < 10; i++) {
        imgListDown.push(imgToSave[i]);
        // Download img in memes folder
        function downloadImage(url, filepath) {
          return new Promise((resolve, reject) => {});
        }
      }
      console.log(imgListDown);
    })
    .catch((error) => {
      console.log(error);
    });
};

getWebsite(url);
/*

https.get(
  'https://api.memegen.link/images/bad/your_meme_is_bad/and_you_should_feel_bad.jpg?width=300',
  (res) => {
    if (res.statusCode === 200) {
      res
        .pipe(Fs.createWriteStream(filepath))
        .on('error', reject)
        .once('close', () => resolve(filepath));
    } else {
      // Consume response data to free up memory
      res.resume();
      reject(
        new Error(
          `Request Failed With a Status Code: ${res.statusCode}`,
        ),
      );
    }
  },
);
*/
