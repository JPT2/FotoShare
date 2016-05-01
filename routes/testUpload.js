var express = require('express');
var router = express.Router();
var fs = require('fs');
var gallery = require('../db/gallery');

// Implement the routes.
// Note: the rating will be passed as a string (req.body.number).
// Use Number() to transform it to a number before adding it to the database.
router.get('/new', function (req, res, next) {
  res.render('testPage');
});

var counter = 0;
router.post('/new', function (req, res, next) {
  // Experimental download stuff
  console.log('POST');
  var fstream;
  var data = {
    className: '',
    galName: ''
  };
  req.pipe(req.busboy);

  // Parse the fields not relating to the image for storage purposes
  req.busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated) {
    if (fieldname == 'galName') {
      data.galName = val;
    }
  });

  // Check the file the user uploaded, if not an image stop
  req.busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
    counter++;

    if (mimetype != 'image/png' && mimetype != 'image/jpeg' || fs.existsSync('./public/galleries/seedGallery/' + filename)) {
      console.log('Invalid file uploaded!');
      file.resume();
      res.redirect('/test/new');
    } else {
      console.log('Uploading: ' + filename);
      console.log('Into Gallery: ' + data.galName);
      gallery.addImage(filename, data.galName);
      fstream = fs.createWriteStream('./public/galleries/seedGallery/' + filename);
      file.pipe(fstream);
      fstream.on('close', function () {
        counter--;
        if (counter == 0) {
          res.redirect('/home');
        }
        
      });
    }
  });

  
  
});
module.exports = router;
