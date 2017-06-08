// Importing the modules we need
var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var autoIncrement = require('mongoose-auto-increment');

// Connecting to the DB
var connection = mongoose.connect('mongodb://localhost:27017/news-blog');
mongoose.Promise = global.Promise;
autoIncrement.initialize(connection);
// Create Express application
var app = express();

var NODE_ENV = 'development';
//Set Variables
app.set('env', process.env.NODE_ENV || 'production');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

routes = require('./routes/route')
app.use('/api', routes);

// Use environment defined port or 3000
var port = process.env.PORT || 2000;

// Start the server
app.listen(port);
console.log('Server running on port ' + port);
module.exports = app;
