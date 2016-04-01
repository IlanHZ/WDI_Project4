// var User = require('../models/User');

// // GET
// function getAll(request, response) {
//   User.find(function(error, users) {
//     if(error) response.status(404).send(error);
//     response.status(200).send(users);
//   }).select('-__v');
// }

// // POST
// function createUser(request, response) {
//   var user = new User(request.body);

//   user.save(function(error) {
//     if(error) response.status(500).send(error);
//     response.status(201).send(user);
//   });
// }

// // GET
// function getCriminal(request, response) {
//   var id = request.params.id;

//   Criminal.findById({_id: id}, function(error, criminal) {
//     if(error) response.status(404).send(error);
//     response.status(200).send(criminal);
//   }).select('-__v');
// }

// function updateUser(request, response) {
//   var id = request.params.id;

//   User.findById({_id: id}, function(error, user) {
//     if(error) response.status(404).send(error);

//     if(request.body.name) user.name = request.body.name;
//     if(request.body.location) user.location = request.body.location;
//     if(request.body.status) user.status = request.body.status;

//     user.save(function(error) {
//       if(error) response.status(500).send(error);

//       response.status(200).send(user);
//     });
//   }).select('-__v');
// }

// function removeUser(request, response) {
//   var id = request.params.id;
//   console.log("ID passed to removeUser: ", id);

//   User.remove({_id: id}, function(error) {
//     if(error) response.status(404).send(error);

//     response.status(204).send();
//   }).select('-__v');
// }

// module.exports = {
//   getAll: getAll,
//   createUser: createUser,
//   getUser: getUser,
//   updateUser: updateUser,
//   removeUser: removeUser
// };

