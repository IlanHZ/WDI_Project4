angular
.module('mappersApp')
.controller('MainController', MainController);

MainController.$inject = ['$auth', 'tokenService','$window', '$scope'];
function MainController($auth, tokenService, $window, $scope) {

  var self = this;
  
  var socket = $window.io();


  // LOGIN
  this.isLoggedIn = function() {
    return !!tokenService.getToken();
    // set the current user name if logged in
    this.currentUser.name
  }

  this.currentUser = tokenService.getUser();

  this.authenticate = function(provider) {
    $auth.authenticate(provider)
    .then(function() {
      self.currentUser = tokenService.getUser();
    });
  }

  this.logout = function() {
    tokenService.removeToken();
    this.currentUser = null;
  }


  // SOCKET
  self.messages = [];

  self.message = null;


  // Push the message into the array once recieved by the server
  socket.on('message', function(message) {
    $scope.$applyAsync(function() {
      self.messages.push(message);
    });
  });

  // update the sendMessage function
  self.sendMessage = function() {
    socket.emit('message', { text: self.message, username: this.currentUser.name });
    self.message = null;
  }
}




