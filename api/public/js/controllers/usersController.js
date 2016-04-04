angular
  .module('mappersApp')
  .controller('UsersController', UsersController);


UsersController.$inject = ['$resource','tokenService'];
function UsersController($resource, tokenService) {

  this.currentUser = tokenService.getUser();

  var self = this;

  var User = $resource("http://localhost:3000/users/:id", { id: '@_id' }, { update: {method: 'PUT'}});


  // show a clicked user
   this.selectUser = function(user) {
     self.selectedUser = User.get({id: user._id});
     console.log(self.selectedUser)
   };


  // CRUD
  this.all = User.query();


  this.createUser = function(){
    User.resource.save(self.newUser, function(res){
    self.all.push(res);
    });
  };

  this.updateUser = function(){
    console.log(self.currentUser._id)
    console.log("update", self.currentUser);
    var user = self.currentUser;

    User.update({ id: self.currentUser._id }, user, function(res){
      console.log("Response from update user request: ", res)
      console.log("user updated")
    });
  }

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
