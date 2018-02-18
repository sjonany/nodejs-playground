const express = require('express');
const passport = require('passport');

module.exports = function(app) {
	app.get('/', function(req, res) {
    res.render('index.ejs');
  });

  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.ejs', {
      user : req.user
    });
  });

  app.get('/logout', function(req, res) {
    // Next auth will require new fb access token.
    req.logout();
    res.redirect('/');
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

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();
  // if they aren't redirect them to the home page
  res.redirect('/');
}