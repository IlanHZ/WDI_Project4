angular
  .module('mappersApp')
  .controller('EventsController', EventsController);

EventsController.$inject = ['$resource', 'tokenService', 'Location', '$scope'];
function EventsController($resource, tokenService, Location, $scope) {


  var userCurrentLatitude;

  var self = this;

  var Event = $resource("http://localhost:3000/events/:id", { id: '@_id' }, { update: {method: 'PUT'}});

  // make a request to the database, query all the resources from the database, same as .all 
  this.events = Event.query(); 

  // select a specific character
  this.selectedEvent= null;
  
  this.event = Event.query();

  this.newEvent = {};

  var geocoder = new google.maps.Geocoder();

  this.geocode = function() {

    var address = [self.newEvent.address, self.newEvent.city, self.newEvent.postcode].join(',');
    geocoder.geocode({ address: address}, function(results){

      if(results && results.length > 0) {
        var location = results[0].geometry.location;

        $scope.$applyAsync(function() {
          self.newEvent.lat = location.lat();
          self.newEvent.lng = location.lng();
        });
      }

    });
  }


  this.selectEvent = function(event) {
    this.selectedEvent = Event.get({ id: event._id });
  }

  // add an event
  this.addEvent = function() {
    Event.save(this.newEvent, function() {
      self.events.push(self.newEvent);
    });
  }

  // delete
  this.deleteEvent = function(event) {
    Event.remove({ id: event._id })
  }

  // update
  this.updateEvent = function(event) {
    Event.update(event, function() {
    });
  }

}








