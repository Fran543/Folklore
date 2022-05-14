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

router.get('/getTrendingStories', postController.getTrendingStories);

router.get('/getUserLibrary', verify, userController.getUserLibrary);

router.get('/removeStoryFromUser', verify, userController.removeStoryFromUser);

router.get('/getSearchItems', userController.getSearchItems);

router.get('/getStoryById', postController.getStoryById);

router.get('/getStoryComments', postController.getStoryComments);

router.get('/getPostByChoiceId', postController.getPostByChoiceId);

router.get('/getWarnings', postController.getWarnings);

router.get('/getUser', userController.getUser);

router.get('/getUserBlogs', verify, userController.getUserBlogs);

router.get('/getUserStories', verify, userController.getUserStories);

router.get('/deleteUser', verify, userController.deleteUser);

router.post('/addCommentToStory', verify, postController.addCommentToStory);

router.post('/addScoreToStory', verify, postController.addScoreToStory);

router.post('/getUserStoryScore', verify, postController.getUserStoryScore);

module.exports = router;