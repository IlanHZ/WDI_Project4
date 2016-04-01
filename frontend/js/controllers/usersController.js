// angular
//   .module('mappersApp')
//   .controller('UsersController', UsersController);


// UsersController.$inject = ['User'];
// function UsersController(User) {
//   // CRUD
//   this.all = User.resource.query();

//   this.createUser = function(){
//     User.resource.save(self.newUser, function(res){
//     self.all.push(res);
//     });
//   };

//   this.updateUser = function(user){
//     User.resource.update(user, function(res){
//     });
//   }

//   this.deleteUser = function(user){
//     User.resource.delete({ id: user._id }, function(res){
//       self.all.filter(function( obj ) {
//         if(obj._id === user._id) {
//           self.all.splice((self.all.indexOf(obj)), 1);
//         }
//       });
//     });
//   }
// }
