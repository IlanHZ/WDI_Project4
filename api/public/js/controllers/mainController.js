angular
.module('mappersApp')
.controller('MainController', MainController);

MainController.$inject = ['$auth', 'tokenService','$window', '$scope', 'User', '$element'];
function MainController($auth, tokenService, $window, $scope, User, $element) {

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
      console.log("socketId", socket.id, "user", self.currentUser.name);
      socket.emit('userId', self.currentUser._id);
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

    socket.on('messageFrom', function(senderId, message) {
      self.messages[senderId] = self.messages[senderId] || [];
      $scope.$applyAsync(function() {
        self.messages[senderId].push(message);
        console.log(self.messages[senderId])
      });
    });

    this.selectUser = function(user) {
      self.selectedUserId = user._id;
    }

    this.chat = function() {
      if(this.selectedUserId) {
        this.messages[this.selectedUserId] = this.messages[this.selectedUserId] || [];
        socket.emit('messageTo', self.currentUser._id, this.selectedUserId, this.message);
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

    this.showContainer = true;

    this.toggleContainer = function() {
      this.showContainer = this.showContainer === false ? true: false;
    }


}








