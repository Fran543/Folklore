var express = require('express');
const verify = require('./verifyToken');
var authController = require('../CONTROLLERS/auth');
var postController = require('../CONTROLLERS/post');
var userController = require('../CONTROLLERS/user');

var router = express.Router();

router.post('/register', authController.register);

router.post('/login', authController.login);

router.post('/createStory', verify, postController.createStory);

router.get('/getStories', verify, postController.getStories);

router.get('/getWarnings', verify, postController.getWarnings);

router.get('/getUser', verify, userController.getUser);

module.exports = router;