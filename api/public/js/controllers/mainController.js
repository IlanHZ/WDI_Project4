angular
.module('mappersApp')
.controller('MainController', MainController);

MainController.$inject = ['$auth', 'tokenService','$window', '$scope', 'User'];
function MainController($auth, tokenService, $window, $scope, User) {


  var self = this;
  
  var socket = $window.io();

  console.log(self.selectedUser)


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
  // console.log("CURRENT USER ID", this.currentUser._id)

    socket.on('connect', function() {
      socket.emit('userId', self.userId);
    });

    // this.userId = $window.localStorage.getItem('userId');

    // id of the current user
    this.userId = this.currentUser._id;

    this.selectedUserId = null;


    this.message = "";
    this.all = [];

    socket.on('message', function(message) {
      $scope.$applyAsync(function() {
        self.all.push(message);
      });
    });

    this.selectUser = function(user) {
            
      self.selectedUserId = user._id;
      console.log("SELECTED USER ID", user._id)

    }

    this.chat = function() {
      // only works if never clicked...
      if(this.selectedUserId) {
        socket.emit('messageTo', this.selectedUserId, this.message);
        self.all.push(this.message);
        console.log("messageTo")
      }
      else {
        socket.emit('message', this.message);
        console.log("message")
      }
      this.message = "";
    }
  }








