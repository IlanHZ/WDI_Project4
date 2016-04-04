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

  self.username =  this.currentUser.name;

  // // Set the username for the chat
  // self.setUsername = function() {
  //   // if the user is logged in
  //   if (currentUser){
  //     // the chat username is the current user name
  //     self.username =  this.currentUser.name;
  //     // if not logged in
  //   } else {
  //     // ask to logged in before using the chat
  //     self.username = "Please log in before using the chat";
  //   }
  // }

  // Push the message into the array once recieved by the server
  socket.on('message', function(message) {
    $scope.$applyAsync(function() {
      self.messages.push(message);
    });
  });

  // update the sendMessage function
  self.sendMessage = function() {
    socket.emit('message', { text: self.message, username: self.username });
    self.message = null;
  }
}




