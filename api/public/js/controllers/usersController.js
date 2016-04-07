angular
  .module('mappersApp')
  .controller('UsersController', UsersController);


UsersController.$inject = ['$resource','tokenService', 'User', 'Location'];
function UsersController($resource, tokenService, User, Location) {


  this.currentUser = tokenService.getUser();

  var self = this;

  // show a clicked user
   this.selectUser = function(user) {
     self.selectedUser = User.get({id: user._id});
   };

  // CRUD

  // GET all the users
  this.all = User.query();

  // CREATE
  this.createUser = function(){
    User.resource.save(self.newUser, function(res){
    self.all.push(res);
    });
  };

  // UPDATE 
  this.updateUser = function(){
    var user = self.currentUser;
    var newUser = User.update({ id: user._id }, user, function(res){
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
