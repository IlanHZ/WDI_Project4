var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  name: String,
  email: String,
  picture: String,
  facebookId: String,
  nationality: String,
  region: String,
  from: Date,
  to: Date,
  type: String,
  description: String,
  lastKnownLocation: mongoose.Schema.Types.Mixed
});

module.exports = mongoose.model('User', userSchema);