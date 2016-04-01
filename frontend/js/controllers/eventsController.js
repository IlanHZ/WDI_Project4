angular
  .module('mappersApp')
  .controller('EventsController', EventsController);

EventsController.$inject = ['Event'];
function EventsController(Event) {

  var self = this;

  // CRUD
  this.all = Event.resource.query();

  this.createEvent = function(){
    Event.resource.save(self.newEvent, function(res){
    self.all.push(res);
    });
  };

  this.updateEvent = function(event){
    Event.resource.update(event, function(res){
    });
  }

  this.deleteEvent = function(Event){
    Event.resource.delete({ id: Event._id }, function(res){
      self.all.filter(function( obj ) {
        if(obj._id === Event._id) {
          self.all.splice((self.all.indexOf(obj)), 1);
        }
      });
    });
  }
}
