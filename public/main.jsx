var React = require('react');
var ReactDOM = require('react-dom');
var Upload = require('./components/upload.jsx');

var upload = <Upload />;

document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render(
    upload,
    document.getElementById('uploadArea')
  );
});
