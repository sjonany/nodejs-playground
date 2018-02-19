const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user');

// Session middleware setup
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

/**
 * Sign in with Facebook.
 */
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_ID,
  clientSecret: process.env.FACEBOOK_SECRET,
  callbackURL: '/api/auth/facebook/callback',
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
      // Refresh some fields.
      user.facebook.full_name = getFbFullName(profile);
      user.save((err) => {
        return done(err, user);
      });
    } else {
      // User's first time. We have to add new db entry.
      var newUser = new User();
      newUser.facebook.id = profile.id;
      newUser.facebook.full_name = getFbFullName(profile); 
      newUser.save((err) => {
        done(err, user);
      });
    }
  });
}));

/**
 * Get the full name given an FB profile object.
 */
function getFbFullName(profile) {
  return `${profile.name.givenName} ${profile.name.familyName}`;
}
