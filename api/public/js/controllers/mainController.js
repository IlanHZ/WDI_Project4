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

  // global messages
  self.messages = [];
  self.message = null;

  // private messages
  self.privateMessages = [];
  self.privateMessage = null;


  // Push the message into the array once recieved by the server
  socket.on('message', function(message) {
    $scope.$applyAsync(function() {
      self.messages.push(message);
    });
  });

  // Push the message into the array once recieved by the server
  socket.on('privateMessage', function(privateMessage) {
    $scope.$applyAsync(function() {
      self.privateMessages.push(privateMessage);
    });
  });

  // update the sendMessage function
  self.sendMessage = function() {
    // io.to('some room').emit('some event');
    socket.emit('message', { text: self.message, username: this.currentUser.name });
    self.message = null;
  }


  // join the room room when click on join room
  self.joinRoom = function() {
    socket.emit('subscribe', { room: 'testRoom' });
    console.log("Emit")
  }

  // send a private message
  self.sendPrivateMessage = function(message) {
    socket.emit('privateMessage', { text: self.privateMessage, username: this.currentUser.name });
    self.privateMessage = null;
  }
}




