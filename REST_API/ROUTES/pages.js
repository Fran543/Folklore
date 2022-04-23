var express = require('express');
const verify = require('./verifyToken');
var authController = require('../CONTROLLERS/auth');
var postController = require('../CONTROLLERS/post');
var userController = require('../CONTROLLERS/user');

var router = express.Router();

router.post('/register', authController.register);

router.post('/login', authController.login);

router.get('/logout', authController.logout);

router.post('/createStory', verify, postController.createStory);

router.get('/getStories', postController.getStories);

router.get('/getUserLibrary', verify, userController.getUserLibrary);

router.get('/removeStoryFromUser', verify, userController.removeStoryFromUser);

router.get('/getSearchItems', userController.getSearchItems);

router.get('/getStoryById', postController.getStoryById);

router.get('/getPostByChoiceId', postController.getPostByChoiceId);

router.get('/getWarnings', verify, postController.getWarnings);

router.get('/getUser', verify, userController.getUser);

router.get('/deleteUser', verify, userController.deleteUser);

module.exports = router;