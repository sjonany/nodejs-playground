const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user');

// Session middleware setup
passport.serializeUser(function(user, done) {
  console.log('serialize user id %s', user.id);
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log("about to desearialize with id = %s", id);
  User.findById(id, (err, user) => {
    console.log('find by id result=  [%s], [%s]\n', err, user);
    done(err, user);
  });
});

/**
 * Sign in with Facebook.
 */
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_ID,
  clientSecret: process.env.FACEBOOK_SECRET,
  callbackURL: '/auth/facebook/callback',
  profileFields: ['name', 'email', 'link', 'locale', 'timezone', 'gender'],
  passReqToCallback: true
}, (req, accessToken, refreshToken, profile, done) => {
  // done(err, user)'s job is to convert this specific auth result to
  // our unified user concept. So, passport.serializeUser will act on
  // the object passed to done().
  User.findOne({'facebook.id' : profile.id}, function(err, user) {
    if (err) {
      return done(err);
    } 
    if (user) {
      // User already registered before.
      return done(null, user);
    } else {
      // User's first time. We have to add new db entry.
      var newUser = new User();
      newUser.facebook.id = profile.id;
      newUser.save((err) => {
        done(err, user);
      });
    }
  });
}));
