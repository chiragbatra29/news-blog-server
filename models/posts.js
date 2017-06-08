// Load the required packages
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

// Define the structure of item schema
var postSchema = new mongoose.Schema({
  id            : {type: Number},
  post_name     : {type : String},
  category_name : {type: String},
  content       : {type: String},
  comments      : {type:Array},
  created_at    : {type: Date, default: Date.now}
});

postSchema.plugin(autoIncrement.plugin, {
    model: 'postSchema',
    startAt: 1
});

module.exports = mongoose.model('Post',postSchema);
