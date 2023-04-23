require('dotenv').config();
const request = require('request');
const fs = require('fs');
const sanitize = require('sanitize-filename');

const apiKey = process.env.API_KEY;
const baseUrl = 'https://www.rijksmuseum.nl/api/nl/collection';
const folderPath = '../images'; 

const downloadImage = (imageId, url, title) => {
  const sanitizedTitle = sanitize(title);
  const filePath = `${folderPath}/${sanitizedTitle}.jpg`;

  console.log(`Downloading ${sanitizedTitle}...`);

  request.get(url)
    .on('error', (err) => {
      console.error(`Failed to download image ${sanitizedTitle}: ${err}`);
    })
    .pipe(fs.createWriteStream(filePath))
    .on('close', () => {
      console.log(`Image ${sanitizedTitle} downloaded successfully!`);
    });
}

const searchImages = () => {
  const searchUrl = `${baseUrl}?key=${apiKey}&imgonly=True&type=schilderij&toppieces=True&ps=50`;

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
