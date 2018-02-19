const express = require('express');
const passport = require('passport');

module.exports = function(app) {
	app.get('/', function(req, res) {
    res.render('index.ejs');
  });

  app.get('/api/profile', isLoggedIn, function(req, res) {
    res.render('profile.ejs', {
      user : req.user
    });
  });

   // create todo and send back all todos after creation
  app.post('/api/todos', isLoggedIn, function(req, res) {
    // TODO: separate to a separate handler file
    // TODO: e2e test w/ form, just print the request, verify form submission works.
    var user = req.user;
    var newActionItem = {priority: 1, content: req.action_item_content};
    Users.findOneAndUpdate({id: req.user.id}, {$push: {action_items: newActionItem}});
  });

  app.get('/logout', function(req, res) {
    // Next auth will require new fb access token.
    req.logout();
    res.redirect('/');
  });

  /////////////////////////////////////////////
  // Facebook routes
  // Facebook login 
  app.get('/api/auth/facebook', passport.authenticate('facebook'));

  // Handle the callback after facebook has authenticated the user
  app.get('/api/auth/facebook/callback',
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