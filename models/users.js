// Load the required packages
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

// Define the structure of item schema
var userSchema = new mongoose.Schema({
  id          : {type: Number},
  username    : {type : String},
  email       : {type : String},
  categories  : {type: Array},
  posts       : {type: Array},
  comments    : {type: Array},
  created_at  : {type: Date, default: Date.now}
});

userSchema.plugin(autoIncrement.plugin, {
    model: 'userSchema',
    startAt: 1
});

module.exports = mongoose.model('User',userSchema);
