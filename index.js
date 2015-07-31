var http = require('http'), 
 	util = require('util'),
	express = require('express');
	
var PORT = 8080;
var app = express();

app.use(express.static('public'));
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
var getCourses = require('./api/getCourses');
app.use('/api/courses', getCourses);

app.listen(PORT);
console.log('App launched on port '+PORT);