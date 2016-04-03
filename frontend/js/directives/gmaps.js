angular
  .module('mappersApp')
  .controller('MapController', MapController)
  .directive('map', InitMap);


MapController.$inject = ["$resource"]
function MapController($resource) {

  var self = this;

  // ng resource to access the back-end
  var Event = $resource("http://localhost:3000/events/:id", { id: '@_id' }, { update: {method: 'PUT'}});

  // get all the events 
  this.mapEventMarkers = Event.query(); 
  console.log("mapEventMarkers", this.mapEventMarkers)

  // set the center of the map
  this.mapCenter = {lat: 51.5074, lng: 0.1278};
}

InitMap.$inject = ["Location", 'tokenService'];
function InitMap(Location, tokenService) {

  return {
    restrict: 'E',
    replace: true,
    template: '<div class="google-map"></div>',
    scope: {
      center: '=',
      markers: '='
    },

    link: function(scope, $element, attr) {

      // get the geolocation from the promise
      Location.get().then(function(pos){
        console.log("Current latitude :", pos.coords.latitude);
        console.log("Current longitude :", pos.coords.longitude);
      });

      if(!scope.center) throw new Error("You must provide a center for your map directive")

      var map = new google.maps.Map($element[0], {
        center: scope.center,
        zoom: 2,
        mapTypeId: google.maps.MapTypeId.SATELLITE
      });

      // array containing all the markers related to the events
      var allEventsMarker = [];

      var currentInfoWindow;

      if(scope.markers) {
        
        scope.markers.$promise.then(function(markers) {
         
          markers.forEach(function(marker, event) {

            var latLng = new google.maps.LatLng(marker.lat, marker.lng);


            // get the geolocation from the promise
            // Location.get().then(function(pos){
            //   console.log("Current latitude :", pos.coords.latitude);
            //   console.log("Current longitude :", pos.coords.longitude);
            // });
            console.log(marker.title)
            // Create an infowindow for the events markers
            var eventInfoWindow = new google.maps.InfoWindow({

              position: latLng,
              // content: "<p>Event:" + marker.title + "</p>"
              content:"Event:" + marker.title

            });
           

            
            var marker = new google.maps.Marker({
              position: latLng,
              map: map,
              animation: google.maps.Animation.DROP,
              icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
              // draggable: true
            });


            // var eventInfowindow = new google.maps.InfoWindow({
            //   position: latLng,
            //   // set a variable with the content of the event infowindow
            //   content: "<p>Event:"+ marker.title + "</p>"

            // });

        

            // set the content of the infowindow
            // eventInfoWindow.setContent("Event:"+ marker.title);

            // on click, open the infowindow

            marker.addListener('click', function(){

              // if an other one is clicked, close the current one.
              if(currentInfoWindow) currentInfoWindow.close();

              currentInfoWindow = eventInfoWindow;

              eventInfoWindow.open(map);
            });

            allEventsMarker.push(marker);

          });
        });
      }

      // create a polyline 
      poly = new google.maps.Polyline({
        strokeColor: '#000000',
        strokeOpacity: 1.0,
        strokeWeight: 3
      });

      poly.setMap(map);

      // Add a listener for the click event
      map.addListener('click', addLatLng);

      // Handles click events on a map, and adds a new point to the Polyline.
      function addLatLng(myTravelLine) {
        console.log("My Travel Line:", myTravelLine.latLng)

        var path = poly.getPath();

        // Because path is an MVCArray, we can simply append a new coordinate
        // and it will automatically appear.
        path.push(myTravelLine.latLng);

        // Add a new marker at the new plotted point on the polyline.
        var marker = new google.maps.Marker({
          position: myTravelLine.latLng,
          title: '#' + path.getLength(),
          map: map,
          icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
        });
        console.log("Marker coordinate:" + marker.position )


        // Add circle overlay and bind to marker
        var circle = new google.maps.Circle({
          map: map,
          radius: 100000,    // 10 miles in metres
          fillColor: '#AA0000'
        });

        circle.bindTo('center', marker, 'position');

        // isLocationOnEdge(point:LatLng, poly:Polygon|Polyline, tolerance?:number)

        allEventsMarker.forEach(function(marker) {

          // isLocationOnEdge(point:LatLng, poly:Polygon|Polyline, tolerance?:number)
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

    // get the informations on the user from the token (facbook login)    
    this.currentUser = tokenService.getUser();

    // set the infowindow variable for the user
    var userInfowindow = new google.maps.InfoWindow({

      // set a variable with the content of the users infowindow
      content: "<img id='userInfoWindowImage' src=" + this.currentUser.picture + "></img>" + "<p id='userInfoWindowName'>" + this.currentUser.name + "</p>"

    });


    var myCurrentPosition = new google.maps.Marker({
      map: map,
      icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
    });

      // create a click event on the marker to open the infowindow
      myCurrentPosition.addListener('click', function() {

        userInfowindow.open(map, myCurrentPosition);

      });

      if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(function(position) {

          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          myCurrentPosition.setPosition(pos);

          // map.setCenter(pos);

        }, function() {

          handleLocationError(true, myCurrentPosition, map.getCenter());

        });

      } else {

        // Browser doesn't support Geolocation
        handleLocationError(false, myCurrentPosition, map.getCenter());
      }

      function handleLocationError(browserHasGeolocation, myCurrentPosition, pos) {

        myCurrentPosition.setPosition(pos);
        myCurrentPosition.setContent(browserHasGeolocation ?'Error: The Geolocation service failed.': 'Error: Your browser doesn\'t support geolocation.');

      }
    }
  }
}










