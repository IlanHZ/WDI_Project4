angular
  .module('mappersApp')
  .controller('EventsController', EventsController);

EventsController.$inject = ['$resource', 'tokenService', 'Location'];
function EventsController($resource, tokenService, Location) {


  var userCurrentLatitude;

  
  // get the geolocation from the promise
  // Location.get().then(function(pos){
  //   console.log("Current latitude :", pos.coords.latitude);
  //   console.log("Current longitude :", pos.coords.longitude);

  //   var userCurrentLatitude = pos.coords.latitude
  //   var userCurrentLongitude = pos.coords.longitude
  // });

  console.log(userCurrentLatitude)


  this.currentUser = tokenService.getUser();
  
  console.log("current user:", this.currentUser)

  var self = this;

  var Event = $resource("http://localhost:3000/events/:id", { id: '@_id' }, { update: {method: 'PUT'}});

  // make a request to the database, query all the resources from the database, same as .all 
  this.events = Event.query(); 

  // select a specific character
  this.selectedEvent= null;
  
  this.event = Event.query();

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
      console.log(event);
    });
  }

}








