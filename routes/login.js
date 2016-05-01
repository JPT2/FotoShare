var express = require('express');
var router = express.Router();
var userDB = require('../db/users.js');

router.post('/', function (req, res) {
  console.log('Logging in');
  var callback = function (err, user) {
    if (user && user[0].username === req.body.username && user[0].password === req.body.password) {
      req.session.isAuthenticated = true;
      req.session.username = user[0].username;
      console.log('Initial: ' + user[0].username);
      console.log('username: ' + req.session.username);
      res.redirect('/home');
    } else {
      res.redirect('/login');
    }
  };

  userDB.getUser(req.body.username, callback);
});

router.get(function (req, res, next) {
  res.render('login');
});

module.exports = router;
