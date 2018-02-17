const dotenv = require('dotenv');
const express = require('express');


/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: '.env.example' });

const app = express();



app.set('view engine', 'ejs');

require('./app/routes.js')(app);

app.set('port', process.env.PORT || 3000); 
app.listen(app.get('port'), function() {
	console.log('App is accessible at http://localhost:%d in env %s',
    app.get('port'), app.get('env'));
});

module.exports = app;