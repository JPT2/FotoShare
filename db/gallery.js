var mongo = require('./mongo');

module.exports = {
  getAllPictures: function (callback) {
    mongo.Galleries.find(function (error, users) {
      callback(error, users);
    });
  },

  getImageByName: function (imgName, callback) {
    mongo.Galleries.find({images: imgName}, {images: 1, name: 1}).exec(function (error, img, galName) {
      callback(error, img, galName);
    });
  },

  getImages: function (galName, callback) {
    mongo.Galleries.find({name: galName}).exec(function (error, img) {
      callback(error, img);
    });
  },

  getGalleryByName: function (galName, callback) {
    mongo.Galleries.find({name: galName}).exec(function (error, gallery) {
      callback(error, gallery);
    });
  },

  getGalleryByUser: function (username, callback) {
    mongo.Galleries.find({members: username}).exec(function (error, galleries) {
      callback(error, galleries);
    });
  },

  getPersonalGalleries: function (owner, callback) {
    mongo.Galleries.find({owner: owner}).exec(function (error, galleries) {
      callback(error, galleries);
    });
  },

  addImage: function (imgData, gallery) {
    console.log('ADDING IMAGE');
    console.log('Data: ' + imgData);
    console.log(gallery);
    mongo.Galleries.update(
      {name: gallery}, 
      {$push: {images: imgData}},
      function (error) {console.log(error);}
    );
  },

  addGallery: function (galData, callback) {
    var gallery = new mongo.Galleries(galData);
    gallery.save(function (error) {
      callback(error);
    });
  }
};