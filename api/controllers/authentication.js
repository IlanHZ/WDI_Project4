var request = require('request-promise');
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var config = require('../config/app');
var oauth = require('../config/oauth');

function facebook(req, res) {
  var params = {
    code: req.body.code,
    client_id: req.body.clientId,
    // process.env means it comes from the zshrc file.
    client_secret: process.env.FACEBOOK_API_SECRET,
    redirect_uri: config.appUrl + "/"
  };

  // step 1, we make a request to facebook for an access token
  request
    .get({
      url: oauth.facebook.accessTokenUrl,
      qs: params,
      json: true
    })
    .then(function(accessToken) {
      // step 2, we use the access token to get the user's profile data from facebook's api
      return request.get({
        url: oauth.facebook.profileUrl,
        qs: accessToken,
        json: true
      });
    })
    .then(function(profile) {
      console.log(profile);
      // step 3, we try to find a user in our database by their email
      return User.findOne({ email: profile.email })
        .then(function(user) {
          // if we find the user, we set their facebookId and picture to their profile data
          if(user) {
            user.facebookId = profile.id;
            user.picture = user.picture || profile.picture.data.url;
          }
          else {
            // otherwise, we create a new user record with the user's profile data from facebook
            user = new User({
              facebookId: profile.id,
              name: profile.name,
              picture: profile.picture.data.url,
              email: profile.email,
              
            });
          }
          // either way, we save the user record
          return user.save();
        });
    })
    .then(function(user) {
      // step 4, we create a JWT and send it back to our angular app
      var payload = { _id: user._id, name: user.name, picture: user.picture };
      var token = jwt.sign(payload, config.secret, { expiresIn: '24h' });
      return res.send({ token: token, user: payload });
    })
    .catch(function(err) {
      // we handle any errors here
      return res.status(500).json({ error: err });
    });
}


module.exports = {
  facebook: facebook
};







