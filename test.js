import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'node:fs';
import Path from 'node:path';

// Creates memes folder if there doesnt exist one
try {
  if (!fs.existsSync('./memes')) {
    fs.mkdirSync('./memes');
  }
} catch (err) {
  console.error(err);
}

const url = 'https://memegen-link-examples-upleveled.netlify.app/';
const folder = '/Users/flo/projects/node-meme-scraper/memes/';
// Create folder memes if it doesnt exist

async function getWebsite(siteUrl) {
  try {
    const { data } = await axios.get(siteUrl);
    return data;
  } catch (err) {
    console.error(err);
  }
}

function getImageSrc(siteHtml) {
  const $ = cheerio.load(siteHtml);
  let imgSource = [];

  $('img').each((index, element) => {
    const imgList = $(element).attr('src');
    imgSource.push(imgList);
  });
  const imgToSave = [];
  for (let i = 0; i < 10; i++) {
    imgToSave.push(imgSource[i]);
  }
  return imgToSave;
}

async function downSrc(src, i) {
  const path = Path.resolve(folder, [i] + 1 + 'image.jpg');

  const writer = fs.createWriteStream(path);
  const response = await axios({
    url: src,
    method: 'GET',
    responseType: 'stream',
  });

  response.data.pipe(writer);
}
/*
function removeMemesFolder() {
  fs.rmdir('./memes', { recursive: true, force: true }, (err) => {
    if (err) {
      return console.log('error occurred in deleting directory', err);
    }

    console.log('Directory deleted successfully');
  });
}

removeMemesFolder();
*/
const websiteToScrape = await getWebsite(url);

const srcList = getImageSrc(websiteToScrape);
console.log(srcList);

// Call forEach function for the linkList Array and call downSrc function for every img you want to download
srcList.forEach(downSrc);

// Url to scrape and Folder to store memes
// Function to get HTML data from the Website

// Get HTML of the website with axios

// Function to search in the HTML data for IMG with an attribute of src
// Push matching items to an array
// Loop over the array and store the first 10 items in an array

// Function for downloading the memes and saving them in a folder
// Creates a writeStream where to store the memes

// Stores the Memes in folder
// Call function getWebsite with url and store the HTML Data
// Call function getImageSrc with const websiteToScrape to look for IMG with attr of src
