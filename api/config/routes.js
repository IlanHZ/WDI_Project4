var router = require('express').Router();
var authController = require('../controllers/authentication');

router.post('/auth/facebook', authController.facebook);

var usersController = require('../controllers/users');
var eventsController = require('../controllers/events');


// USERS // 

router.route('/users')

  //GET all users
  .get(usersController.getAll)

  //POST a new user
  .post(usersController.createUser);


router.route('/users/:id')

  // GET return specific user
  .get(usersController.getUser)

  // PATCH update existing user
  .patch(usersController.updateUser)

  // DELETE remove specific user from DB
  .delete(usersController.removeUser);

// EVENTS //

router.route('/events')

  //GET all events
  .get(eventsController.getAll)

  //POST a new event
  .post(eventsController.createEvent);


router.route('/events/:id')

  // GET return specific event
  .get(eventsController.getEvent)

  // PATCH update existing event
  .patch(eventsController.updateEvent)

  // DELETE remove specific event from DB
  .delete(eventsController.removeEvent);



module.exports = router;



