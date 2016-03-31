angular
  .module('mappersApp')
  .controller('MapController', MapController)
  .directive('map', InitMap);


function MapController() {
  this.mapCenter = {lat: 13.736717, lng:  100.523186};
  this.mapMarkers = [{ lat: 13.410994034321702, lng: 105.7763671875 }];

}


function InitMap() {
  return {
    // E(element <map></map>) | A(attribute map="something") | C(class class="map") | M(comment <!-- directive: map --> )
    // Use mainly of the first two | use of element in this exemple
    restrict: 'E',
    // Swap this tag with sth else (replace) | do I replace the directive with sth(TRUE) or replace what is inside  with sth(FALSE)
    replace: true,
    // the actual code we will swap the directive for
    template: '<div class="google-map"></div>',
    scope: {
      // '=' work as an ng-model, link controller-directive, expect an object from the controller| '@' except it to be a string (lat and lng in the map tag in html | '&' expect a function)
      center: '=',
      markers: '='
    },
    // element is the DOM element as a jQuery object 
    link: function(scope, $element, attr) {
      if(!scope.center) throw new Error("You must provide a center for your map directive")

      console.log(scope.center);

      var map = new google.maps.Map($element[0], {
        center: scope.center,
        zoom: 10,
      });

      if(scope.markers) {
        scope.markers.forEach(function(marker) {
          new google.maps.Marker({
           position: marker.position,
           map: map,
           animation: google.maps.Animation.DROP
          });
        });
      }
    }
  }
}