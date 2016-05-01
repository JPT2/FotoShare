var express = require('express');
var router = express.Router();
var userDB = require('../db/users.js');

router.get('/', function (req, res) {
  res.render('signUp');
});

router.post('/', function (req, res) {
  // Check to make sure user submitted required information
  if (req.body.username != '' && req.body.password != '') {
    // Query DB for users to make sure username doesn't exist
    userDB.getUser(req.body.username, function (error, user) {
      if (error) {
        next(error);
      } else if (user[0]) {
        res.redirect('/signUp');
      } else {
        var userData = {
          username: req.body.username,
          password: req.body.password,
          galleries: []
        };  

        req.username = user.username;
        // Add user if they have unique username
        userDB.addUser(userData, function (error) {
          if (error) {
            next(error);
          } else {
            res.redirect('/home');
          }
        });
      }
    });
  } else {
    res.redirect('/signUp');
  }
});

module.exports = router;