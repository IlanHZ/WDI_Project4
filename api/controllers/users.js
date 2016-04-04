var User = require('../models/User');

// GET
function getAll(request, response) {
  User.find(function(error, users) {
    if(error) response.status(404).send(error);
    response.status(200).send(users);
  }).select('-__v');
}

// POST
function createUser(request, response) {
  var user = new User(request.body);

  user.save(function(error) {
    if(error) response.status(500).send(error);
    response.status(201).send(user);
  });
}

// GET
function getUser(request, response) {
  var id = request.params.id;

  User.findById({_id: id}, function(error, user) {
    if(error) response.status(404).send(error);
    response.status(200).send(user);
  }).select('-__v');
}

function updateUser(request, response) {
  var id = request.params.id;
  console.log(request.body.user)
  User.findByIdAndUpdate({_id: id}, request.body.user, function(error, user) {
    if(error) response.status(404).send(error);

    // user.save(function(error) {
    //   if(error) response.status(500).send(error);
      response.status(200).send(user);
    // });
  })
}

function removeUser(request, response) {
  var id = request.params.id;
  console.log("ID passed to removeUser: ", id);

  User.remove({_id: id}, function(error) {
    if(error) response.status(404).send(error);

    response.status(204).send();
  }).select('-__v');
}

module.exports = {
  getAll: getAll,
  createUser: createUser,
  getUser: getUser,
  updateUser: updateUser,
  removeUser: removeUser
};


