const express = require('express');

module.exports = function(app) {
	app.get('/', function(req, res) {
    res.render('index.ejs');
  });

  app.get('/login', function(req, res) {
    res.render('login.ejs');
  });

  // Static scripts to be included in templates.
  app.use('/dist/bootstrap', express.static(__dirname + '/../node_modules/bootstrap/dist/'));
  app.use('/dist/font-awesome', express.static(__dirname + '/../node_modules/font-awesome/'));
}