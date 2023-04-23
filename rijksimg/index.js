require('dotenv').config();
const request = require('request');
const fs = require('fs');

const apiKey = process.env.API_KEY;
const baseUrl = 'https://www.rijksmuseum.nl/api/en/collection';
const folderPath = './images';

const downloadImage = (title, url) => {
  const filePath = `${folderPath}/${title}.jpg`;

  console.log(url)

  request.get(url)
    .on('error', (err) => {
      console.error(`Failed to download image ${title}: ${err}`);
    })
    .pipe(fs.createWriteStream(filePath))
    .on('close', () => {
      console.log(`Image ${title} downloaded successfully!`);
    });
}

const searchImages = () => {
  const searchUrl = `${baseUrl}?key=${apiKey}&imgonly=True&type=print&ps=100`;

  request.get(searchUrl, (err, res, body) => {
    if (err) {
      console.error(`Failed to search images: ${err}`);
      return;
    }

    const data = JSON.parse(body);

    data.artObjects.forEach((artObject) => {
      const title = artObject.title;
      const url = artObject.webImage.url;
      downloadImage(title, url);
    });
  });
}

searchImages();
