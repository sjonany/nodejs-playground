const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

/**
 * Load environment variables from .env file, where API keys and passwords are configured
 */
dotenv.load({ path: '.env' });

const app = express();

/**
 * Connect to MongoDB.
 */
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('MongoDB connection error. Please make sure MongoDB is running.');
  process.exit();
});

/**
 * API keys and Passport configuration
 */
const passportConfig = require('./config/auth');
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    url: process.env.MONGODB_URI,
    autoReconnect: true,
    clear_interval: 3600
  })
}));
app.use(passport.initialize());
app.use(passport.session());

// Set template engine
app.set('view engine', 'ejs');

// Initialize routes
require('./app/routes.js')(app);

// Start the server
app.set('port', process.env.PORT || 3000); 
app.listen(app.get('port'), function() {
	console.log('App is accessible at http://localhost:%d in env %s',
    app.get('port'), app.get('env'));
});

module.exports = app;