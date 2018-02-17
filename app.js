var express = require('express');
var app = express();

app.get('/', function(req, res) {
	res.send("Hello World!");
});

app.set("port", process.env.PORT || 3000);
app.listen(app.get("port"), function() {
	console.log("App is accessible at http://localhost:%d in env %s", app.get("port"), app.get("env"));
});

module.exports = app;