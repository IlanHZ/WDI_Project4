angular
  .module('mappersApp')
  .controller('UsersController', UsersController);


UsersController.$inject = ['$resource','tokenService', 'User', 'Location'];
function UsersController($resource, tokenService, User, Location) {


  this.currentUser = tokenService.getUser();
  console.log(this.currentUser)

  var self = this;

  // show a clicked user
   this.selectUser = function(user) {
     self.selectedUser = User.get({id: user._id});
     console.log(self.selectedUser)
   };

  // CRUD

  // GET all the users
  this.all = User.query();
  console.log("All users", this.all)

  // CREATE
  this.createUser = function(){
    User.resource.save(self.newUser, function(res){
    self.all.push(res);
    });
  };

  // UPDATE 
  this.updateUser = function(){
    var user = self.currentUser;
    console.log(user)
    var newUser = User.update({ id: user._id }, user, function(res){
      console.log("user updated");
    });
  }

  // DELETE
  this.deleteUser = function(user){
    User.resource.delete({ id: user._id }, function(res){
      self.all.filter(function( obj ) {
        if(obj._id === user._id) {
          self.all.splice((self.all.indexOf(obj)), 1);
        }
      });
    });
  }
}
