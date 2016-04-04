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
    var user = self.currentUser;
    console.log(user)
    var newUser = User.update({ id: user._id }, {user: user}, function(res){
      console.log("user updated");
    });
    // console.log(newUser);
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
