var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/foto', function (err) {
  if (err && err.message.includes('ECONNREFUSED')) {
    console.log('Error connecting to mongodb database: %s.\nIs "mongod" running?', err.message);
    process.exit(0);
  } else if (err) {
    throw err;
  } else {
    console.log('DB successfully connected. Adding seed data...');
  }
});

var db = mongoose.connection;

// Consider adding username and password fields for user login
// If change this, update seed files
var userSchema = new mongoose.Schema({
  username: String,
  password: String, 
  galleries: [String]
});

var gallerySchema = new mongoose.Schema({
  name: String,
  owner: String,
  members: [userSchema],
  images: [String]
});

var Users = mongoose.model('Users', userSchema);
var Galleries = mongoose.model('Galleries', gallerySchema);

module.exports = {
  Users: Users,
  Galleries: Galleries,
  mongoose: mongoose,
  userDB: db.collection('Users'),
  galleryDB: db.collection('Galleries'),
  DB: db
};
