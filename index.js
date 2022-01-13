import cheerio from 'cheerio';
import axios from 'axios';

import fs from 'fs';

// URL to be scraped for images
const url = 'https://memegen-link-examples-upleveled.netlify.app/';

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
      }
      console.log(imgListDown);
    })
    .catch((error) => {
      console.log(error);
    });
};
// for (let i = 0; i < 10; i++) {
//  console.log(imgList[i]);
// }
getWebsite(url);
