var router = require('express').Router();
var authController = require('../controllers/authentication');

router.post('/auth/facebook', authController.facebook);

module.exports = router;