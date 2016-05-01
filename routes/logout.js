var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  req.session.isAuthenticated = false;
  res.redirect('/login');
});

module.exports = router;