angular
  .module('mappersApp')
  .controller('MapController', MapController)
  .directive('map', InitMap);


MapController.$inject = ["$resource"]
function MapController($resource) {
  var self = this;
  var Event = $resource("http://localhost:3000/events/:id", { id: '@_id' }, { update: {method: 'PUT'}});
  this.mapEventMarkers = Event.query(); 
  console.log(this.mapEventMarkers)

  this.mapCenter = {lat: 13.736717, lng:  100.523186};
  // this.mapMarkers = [{
  //   name: "Testing Position",
  //   position: { lat: 13.410994034321702, lng: 105.7763671875, }
  // }]
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
      console.log("Scope center:", scope.center);

      var map = new google.maps.Map($element[0], {
        center: scope.center,
        zoom: 5,
      });

      var allMarkers = [];
      
      if(scope.markers) {
        
        scope.markers.$promise.then(function(markers) {
          console.log("Scope Markers:", markers);
          markers.forEach(function(marker) {

            var latLng = new google.maps.LatLng(marker.lat, marker.lng);

            var marker = new google.maps.Marker({
              position: latLng,
              map: map,
              animation: google.maps.Animation.DROP
            });

            allMarkers.push(marker);
          });
        });
      }
      // create a polyline 
      poly = new google.maps.Polyline({
        strokeColor: '#000000',
        strokeOpacity: 1.0,
        strokeWeight: 3
      });
      console.log("POLY:", poly);
      poly.setMap(map);

      // Add a listener for the click event
      map.addListener('click', addLatLng);

      // Handles click events on a map, and adds a new point to the Polyline.
      function addLatLng(event) {
        console.log(event.latLng)
        var path = poly.getPath();
        console.log("path:" + path)

        // Because path is an MVCArray, we can simply append a new coordinate
        // and it will automatically appear.
        path.push(event.latLng);

        // Add a new marker at the new plotted point on the polyline.
        var marker = new google.maps.Marker({
          position: event.latLng,
          title: '#' + path.getLength(),
          map: map
        });
        console.log("Marker number:" + marker.title)
        console.log("Marker coordinate:" + marker.position )

        // Add circle overlay and bind to marker
        var circle = new google.maps.Circle({
          map: map,
          radius: 100000,    // 10 miles in metres
          fillColor: '#AA0000'
        });
        circle.bindTo('center', marker, 'position');

        // var eventsPosition = new google.maps.latLng()
        // check if a specific point is included in the radius of the polyline
        // isLocationOnEdge(point:LatLng, poly:Polygon|Polyline, tolerance?:number)
        console.log("marker position:", marker.position)
        console.log(allMarkers);
        allMarkers.forEach(function(marker) {
          if (google.maps.geometry.poly.isLocationOnEdge(marker.getPosition(), poly, 1)) {
            console.log("In the radius");
            marker.setMap(map);
          } else {
            console.log("Out of the radius");
            marker.setMap(null);
          }
        });
      } 

     // *** Geolocation ***

      var infoWindow = new google.maps.InfoWindow({map: map});

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          console.log(position)

          infoWindow.setPosition(pos);
          infoWindow.setContent('Location found.');
          map.setCenter(pos);
        }, function() {
          handleLocationError(true, infoWindow, map.getCenter());
        });
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }


      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
          infoWindow.setPosition(pos);
          infoWindow.setContent(browserHasGeolocation ?'Error: The Geolocation service failed.': 'Error: Your browser doesn\'t support geolocation.');
      }
    }
  }
}




  // function displayEvents() {
  //   $.get('/events').then(function(data){

  //     var events = data

  //     events.forEach(function(event, idx){
  //       setTimeout(function(){
  //         var marker = new google.maps.Marker({

  //           // parseFloat convert a string into a number
  //           position: { lat: parseFloat(event.lat), lng: parseFloat(event.lng) },
  //           map: map,
  //           animation: google.maps.Animation.DROP,
  //         });
  //       });
  //     });
  //   });
  // }











