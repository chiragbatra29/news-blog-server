// Load the required packages
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

// Define the structure of item schema
var categorySchema = new mongoose.Schema({
  id            : {type: Number},
  category_name : {type : String},
  type          : {type: String},
  posts         : {type: Array},
  created_by    : Number,
  created_at    : {type: Date, default: Date.now}
});

categorySchema.plugin(autoIncrement.plugin, {
    model: 'categorySchema',
    startAt: 1
});

module.exports = mongoose.model('Category',categorySchema);
