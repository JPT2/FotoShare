var mongo = require('./mongo');

module.exports = {
  getAllUsers: function (callback) {
    mongo.Users.find(function (error, users) {
      callback(error, users);
    });
  },

  getUser: function (username, callback) {
    mongo.Users.find({username: username}).exec(function (error, user) {
      callback(error, user);
    });
  },

  addUser: function (userData, callback) {
    var user = new mongo.Users(userData);
    user.save(function (error) {
      callback(error);
    });
  },

  addGalleryToUser: function (user, galName, callback) {
    console.log('Adding Gallery');
    console.log('Username: ' + user);
    console.log('Gallery: ' + galName);

    mongo.Users.update( 
      {username: user}, 
      {$push: {galleries: galName}},
      function (error) {callback(error);}
    );
  }
};
