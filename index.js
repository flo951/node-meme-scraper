import cheerio from 'cheerio';
import axios from 'axios';
import fetch from 'node-fetch';
import fs from 'fs';

// URL to be scraped for images
const url = 'https://memegen-link-examples-upleveled.netlify.app/';

// get website data from server
axios
  .get(url)
  .then((response) => {
    // user cheerio to search in data and store it
    let $ = cheerio.load(response.data);

    $('section').each((index, element) => {
      // logs out one link to first image
      console.log($(element).find('img').attr('src'));
    });
  })
  .catch((error) => {
    console.log(error);
  });
