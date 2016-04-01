var Event = require('../models/Event');

// GET
function getAll(request, response) {
  Event.find(function(error, events) {
    if(error) response.status(404).send(error);
    response.status(200).send(events);
  }).select('-__v');
}

// POST
function createEvent(request, response) {
  var event = new Event(request.body);

  event.save(function(error) {
    if(error) response.status(500).send(error);
    response.status(201).send(event);
  });
}

// GET
function getEvent(request, response) {
  var id = request.params.id;

  Event.findById({_id: id}, function(error, event) {
    if(error) response.status(404).send(error);
    response.status(200).send(event);
  }).select('-__v');
}

function updateEvent(request, response) {
  var id = request.params.id;

  Event.findById({_id: id}, function(error, event) {
    if(error) response.status(404).send(error);

    if(request.body.name) event.name = request.body.name;
    if(request.body.location) event.location = request.body.location;
    if(request.body.status) event.status = request.body.status;

    event.save(function(error) {
      if(error) response.status(500).send(error);

      response.status(200).send(event);
    });
  }).select('-__v');
}

function removeEvent(request, response) {
  var id = request.params.id;
  console.log("ID passed to removeEvent: ", id);

  Event.remove({_id: id}, function(error) {
    if(error) response.status(404).send(error);

    response.status(204).send();
  }).select('-__v');
}

module.exports = {
  getAll: getAll,
  createEvent: createEvent,
  getEvent: getEvent,
  updateEvent: updateEvent,
  removeEvent: removeEvent
};


