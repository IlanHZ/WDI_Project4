angular.module('mappersApp')
  .service('Location', Location);

Location.$inject = ['$window', 'tokenService', 'User'];
function Location($window, tokenService, User) {

  var self = this;

  var Promise = $window.Promise;

  var currentPosition = null;

  // console.log("User:", User);

  function updatePosition() {
    $window.navigator.geolocation.getCurrentPosition(function(pos) {
      currentPosition = pos;
      // save the current position to the db each time 
      // user update(), pass in the user id, lastknown postion stored and updated through the location promise
      var user = tokenService.getToken();

      user.lastKnownPosition = currentPosition;

      User.update(user, function(res) {
        console.log("user updated", res);
      });
    });
  }
  // update the position every 15mn
  setInterval(updatePosition, 1000 * 60 * 15);

  var promise = new Promise(function(resolve, reject) {
    if(currentPosition) return resolve(currentPosition);
    $window.navigator.geolocation.getCurrentPosition(function(pos) {
      currentPosition = pos;
      resolve(pos);
    }, function(err) {
      reject(err);
    });
  });

  self.get = function() {
    return promise;
  }

  self.getActual = function() {
    currentPosition = null;
    return promise;
  }
// console.log("Promise", Promise)
}







