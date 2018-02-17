const express = require('express');
const passport = require('passport');

module.exports = function(app) {
	app.get('/', function(req, res) {
    res.render('index.ejs');
  });

  app.get('/profile', function(req, res) {
    res.render('profile.ejs');
  });

  /////////////////////////////////////////////
  // Facebook routes
  // Facebook login 
  app.get('/auth/facebook', passport.authenticate('facebook'));

  // Handle the callback after facebook has authenticated the user
  app.get('/auth/facebook/callback',
      passport.authenticate('facebook', {
          successRedirect : '/profile',
          failureRedirect : '/'
      }));


  // Static scripts to be included in templates.
  app.use('/dist/bootstrap', express.static(__dirname + '/../node_modules/bootstrap/dist/'));
  app.use('/dist/font-awesome', express.static(__dirname + '/../node_modules/font-awesome/'));
}