var handleError = function (err, req, res, next) {
  res.render('errorPage', {statusCode: res.statusCode, message: err.message, stackTrace: err.stack});
};


// Export the middleware function for use in app.js
module.exports = handleError;
