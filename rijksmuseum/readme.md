# Rijksmuseum API
## Download Art

The code defines a downloadImage function that downloads a single image by its ID and saves it to the specified folder using the fs module. It also defines a searchImages function that searches for paintings (type=schilderij) in the Rijksmuseum collection that have images (imgonly=True) and downloads them one by one.

## Search query
```
const typeQuery = 'schilderij';
const titleQuery = 'landschap';
const amountQuery = 50;
```


[Rijksmuseum API](https://data.rijksmuseum.nl/object-metadata/api/) & 
[Advanced Search](https://www.rijksmuseum.nl/en/search/advanced)
