var express = require('express');
var router = express.Router();

var gallery = require('../db/gallery.js');
var users = require('../db/users.js');

router.get('/', function (req, res) {
  users.getUser(req.session.username, function (error, user) {
    if (user[0].galleries[0]) {
      gallery.getImages(user[0].galleries[0], function (error, img) {
        if (img[0]) {
          res.render('home', {path: '/galleries/seedGallery/' + img[0].images[0]});
        } else {
          res.render('home', {path: '/galleries/seedGaller/bridge.jpg'});
        }
      });
    } else {
      res.render('home', {path: '/galleries/seedGallery/bridge.jpg'});
    }
  });
});

module.exports = router;