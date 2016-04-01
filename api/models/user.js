var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  name: String,
  email: String,
  picture: String,
  facebookId: String,
  nationalty: String,
  region: String,
  from: Date,
  to: Date,
  type: String,
  description: String
});

module.exports = mongoose.model('User', userSchema);