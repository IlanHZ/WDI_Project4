var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
  title: String,
  location: String,
  type: String,
  date: Date,
  time: Number,
  description: String,
  city: String,
  address: String,
  postcode: String,
  lat: Number,
  lng: Number
});

module.exports = mongoose.model('Event', eventSchema);