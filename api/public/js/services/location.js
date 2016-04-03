angular.module('mappersApp')
  .service('Location', Location);

Location.$inject = ['$window'];
function Location($window) {

  var self = this;

  var Promise = $window.Promise;
  var currentPosition = null;

  function updatePosition() {
    $window.navigator.geolocation.getCurrentPosition(function(pos) {
      currentPosition = pos;
    });
  }

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

}