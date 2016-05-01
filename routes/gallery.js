var express = require('express');
var router = express.Router();
var gallery = require('../db/gallery');
var users = require('../db/users');

// Allow users to create new galleries
// Implement routes
router.get('/get', function (req, res, next) {
  console.log('Handling get');
  users.getUser(req.session.username, function (error, user) {
    console.log('Sending: ' + user[0]);
    res.send(user[0]);
  });
});

router.get('/new', function (req, res, next) {
  res.render('createGallery');
});

router.post('/new', function (req, res, next) {
  var members = req.body.members.split(',');

  //Check if request is valid (has gallery name)
  if (req.body.galName != '') {
    var exists = false;
    req.sentResponse = false;
    gallery.getGalleryByName(req.body.galName, function (error, gallery) {
      if (gallery[0] && (gallery[0].owner === req.session.username || gallery[0].members.includes(req.session.username))) {
        req.sentResponse = true;
        res.send('Gallery Already Exists');
      } else {
        console.log(req.sentResponse);
        var userData = [];
        for (var i = 0; i < members.length; i++) {
          users.getUser(members[i], function (callback, user) {
            userData.push(user);
          });
        }

        var galData = {
          name: req.body.galName,
          owner: req.session.username,
          members: userData,
          images: []
        };
        req.galData = galData;

        users.getUser(req.session.username, function (error, user) {
          console.log("User document");
          console.log(user[0]);
        });

        users.addGalleryToUser(req.session.username, req.body.galName, function (error) {
          if (error) {
            console.log(error);
          }
        });  
      }
    });   

    if (!req.sentResponse) {
      gallery.addGallery(req.galData, function (error) {
        if (error) {
          console.log(error);
        } else {
          res.redirect('/home');
        }
      });   
    }
    
  }
});

router.post('/new/member', function (req, res, next) {
  users.getUser(req.body.member, function (error, user) {
    if (user[0]) {
      res.send(true);
    } else {
      res.send(false);
    }
  });
});

router.get('/view', function (req, res, next) {
  users.getUser(req.session.username, function (error, user) {
    
    if (user[0].galleries) {
      gallery.getImages(user[0].galleries[0], function (error, img) {
        if (img[0]) {
          res.render('viewGalleries', {galName: img[0].name, name: img[0].images[0], path: '/galleries/seedGallery/' + img[0].images[0]});
        } else {
          res.render('viewGalleries', {galName: 'default', name: 'default', path: '/galleries/seedGallery/bridge.jpg'});
        }
        
      });
    } else {
      res.render('viewGalleries', {galName: 'default', name: 'default', path: '/galleries/seedGallery/bridge.jpg'});
    } 
  });
});

router.post('/view', function (req, res, next) {
  users.getUser(req.session.username, function (error, user) {
    
    gallery.getImages(req.body.galName, function (error, img) {
      if (img[0]) {
        res.render('viewGalleries', {galName: img[0].name, name: img[0].images[0], path: '/galleries/seedGallery/' + img[0].images[0]});
      } else {
        res.render('viewGalleries', {galName: 'default', name:'bridge/jpg', path: '/galleries/seedGallery/bridge.jpg'});
      }
      
    });
  });
});

router.post('/next', function (req, res, next) {
  gallery.getGalleryByName(req.body.galName, function (error, gallery) {
    if (gallery[0]) {
      var data = {
        filename: '',
      }
      for (var i = 0; i < gallery[0].images.length; i++) {

        if (gallery[0].images[i] === req.body.name) {
          if (i < gallery[0].images.length - 1) {
            data.filename = gallery[0].images[i + 1];
            break;
          } else {
            data.filename = gallery[0].images[0];
            break;
          }
        }
      }

      res.send(data.filename);
    }
    
  });
});

router.post('/prev', function (req, res, next) {
  gallery.getGalleryByName(req.body.galName, function (error, gallery) {
    if (gallery[0]) {
      for (var i = 0; i < gallery[0].images.length; i++) {
        if (gallery[0].images[i] === req.body.name) {
          if (i > 0) {
            res.send( gallery[0].images[i - 1]);
            break;
          } else {
            res.send(gallery[0].images[gallery[0].images.length - 1]);
            break;
          } 
        } 
      }
    } 
  });
});

module.exports = router;