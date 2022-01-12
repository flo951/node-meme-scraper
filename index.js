import cheerio from 'cheerio';
import axios from 'axios';
import fs from 'fs';

// URL to be scraped for images
const url = 'https://memegen-link-examples-upleveled.netlify.app/';

axios
  .get(url)
  .then((response) => {
    let $ = cheerio.load(response.data);

    $('section').each((index, element) => {
      console.log($(element).find('img').attr('src'));
    });
  })
  .catch((error) => {
    console.log(error);
  });
