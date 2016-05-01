var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var uuid = require('node-uuid');
var busboy = require('connect-busboy');

// Routes
var handleError = require('./middlewares/handleError');
var login = require('./routes/login');
var pageNotFound = require('./middlewares/pageNotFound');
var testUpload = require('./routes/testUpload');
var signUp = require('./routes/signUp');
var isAuthenticated = require('./middlewares/isAuthenticated');
var home = require('./routes/home');
var galleryHandler = require('./routes/gallery');
var logout = require('./routes/logout');

// Serve static pages
app.engine('html', require('ejs').__express);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(busboy());

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/login', function (req, res) {
  res.render('login');
});

// Generate a random cookie secret for this app
var generateCookieSecret = function () {
  return 'iamasecret' + uuid.v4();
};

app.use(cookieSession({
  secret: generateCookieSecret()
}));

/***************
	ROUTERS
****************/
app.use('/login', login);
app.use('/test', isAuthenticated, testUpload);
app.use('/signUp', signUp);
app.use('/home', isAuthenticated, home);
app.use('/gallery', isAuthenticated, galleryHandler);
app.use('/logout', logout);


/*******************************
	ERROR HANDLING MIDDLEWARE
*******************************/
app.use(handleError);
app.use(pageNotFound);

module.exports = app;