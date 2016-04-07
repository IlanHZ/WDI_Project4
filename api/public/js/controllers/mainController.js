angular
.module('mappersApp')
.controller('MainController', MainController);

MainController.$inject = ['$auth', 'tokenService','$window', '$scope', 'User'];
function MainController($auth, tokenService, $window, $scope, User) {

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

    socket.on('connect', function() {
      socket.emit('userId', self.userId);
    });

    this.selectedUserId = null;
    
    this.message = "";
    this.messages = {
      global: []
    }

    socket.on('message', function(message) {
      $scope.$applyAsync(function() {
        self.messages.global.push(message);
      });
    });

    this.selectUser = function(user) {
            
      self.selectedUserId = user._id;
    }

    this.chat = function() {
      if(this.selectedUserId) {
        this.messages[this.selectedUserId] = this.messages[this.selectedUserId] || [];
        socket.emit('messageTo', this.selectedUserId, this.message);
        this.messages[this.selectedUserId].push(this.message);
      }
      else {
        socket.emit('message', this.message);
      }
      this.message = "";
    }

    this.show = true;

    this.toggle = function() {
      this.show = this.show === false ? true: false;
    }
  }








