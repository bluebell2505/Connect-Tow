var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
  res.render('pages/index');
});

// about page
app.get('/about', function(req, res) {
  res.render('pages/about');
});

// services page
app.get('/Services', function(req, res) {
  res.render('pages/Service');
});

// login page
app.get('/login', function(req, res) {
  res.render('login');
});

// register page
app.get('/register', function(req, res) {
  res.render('register');
});

app.listen(8080);
console.log('Server is listening on port 8080');