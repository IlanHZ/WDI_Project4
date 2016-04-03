var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
  title: String,
  location: String, 
  organizer: String,
  type: String,
  start_date: Date,
  end_date: Date,
  time: Number,
  description: String,
  city: String,
  address: String,
  postcode: String,
  lat: String,
  lng: String
});

module.exports = mongoose.model('Event', eventSchema);