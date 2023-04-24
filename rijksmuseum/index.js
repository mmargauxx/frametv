require('dotenv').config();
const request = require('request');
const fs = require('fs');
const sanitize = require('sanitize-filename');
const sharp = require('sharp');

const apiKey = process.env.API_KEY;
const baseUrl = 'https://www.rijksmuseum.nl/api/nl/collection';
const folderPath = '../images';
// const folderPath = './imgtestquery';

// Search query
const typeQuery = 'schilderij';
const titleQuery = 'landschap';
const amountQuery = 50;

const downloadImage = (imageId, url, title) => {
  const sanitizedTitle = sanitize(title);
  const filePath = `${folderPath}/${sanitizedTitle}.jpg`;

  console.log(`Downloading ${sanitizedTitle}...`);

  request.get(url)
    .on('error', (err) => {
      console.error(`Failed to download image ${sanitizedTitle}: ${err}`);
    })
    .pipe(sharp().resize(3840, 2160)) // W, H
    .pipe(fs.createWriteStream(filePath))
    .on('close', () => {
      console.log(`Image ${sanitizedTitle} downloaded and resized successfully!`);
    });
}

const searchImages = () => {
  const searchUrl = `${baseUrl}?key=${apiKey}&imgonly=True&type=${typeQuery}&toppieces=True&ps=${amountQuery}&q=${titleQuery}`;
  
  request.get(searchUrl, (err, res, body) => {
    if (err) {
      console.error(`Failed to search images: ${err}`);
      return;
    }

    const data = JSON.parse(body);

    data.artObjects.forEach((artObject) => {
      const imageId = artObject.objectNumber;
      const url = artObject.webImage.url;
      const title = artObject.title;
      downloadImage(imageId, url, title);
    });
  });
}

searchImages();