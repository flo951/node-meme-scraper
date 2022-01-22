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
// Url to scrape and Folder to store memes
const url = 'https://memegen-link-examples-upleveled.netlify.app/';
const folder = '/Users/flo/projects/node-meme-scraper/memes/';
// Create folder memes if it doesnt exist
// Async function to get HTML data from the Website
async function getWebsite(siteUrl) {
  try {
    // Get HTML of the website with axios
    const { data } = await axios.get(siteUrl);
    return data;
  } catch (err) {
    console.error(err);
  }
}
// Function to search in the HTML data for IMG with an attribute of src
function getImageSrc(siteHtml) {
  const $ = cheerio.load(siteHtml);
  const imgSource = [];

  $('img').each((index, element) => {
    const imgList = $(element).attr('src');
    // Push matching items to an array
    imgSource.push(imgList);
  });
  const imgToSave = [];
  // Loop over the array and store the first 10 items in an array
  for (let i = 0; i < 10; i++) {
    imgToSave.push(imgSource[i]);
  }
  return imgToSave;
}
// Function for downloading the memes and saving them in a folder
async function downSrc(src, i) {
  const path = Path.resolve('./memes', 0 + [i + 1] + '.jpg');
  // Creates a writeStream where to store the memes
  const writer = fs.createWriteStream(path);
  const response = await axios({
    url: src,
    method: 'GET',
    responseType: 'stream',
  });

  // Stores the Memes in folder
  response.data.pipe(writer);
}

// Call function getWebsite with url and store the HTML Data
const websiteToScrape = await getWebsite(url);
// Call function getImageSrc with const websiteToScrape to look for IMG with attr of src
const srcList = getImageSrc(websiteToScrape);
// Call forEach function for the srcList Array and call downSrc function for every img you want to download
srcList.forEach(downSrc);
console.log(`Download successful, you can now laugh!`);
