var express = require('express');
const verify = require('./verifyToken');
var authController = require('../CONTROLLERS/auth');
var postController = require('../CONTROLLERS/post');

var router = express.Router();

router.post('/register', authController.register);

router.get('/register', (req, res) => {
    res.send("Hello")
});

router.post('/login', authController.login);

router.get('/login', (req, res) => {
    res.send("Hello")
});

router.post('/createPost', verify, postController.createPost);

router.get('/getWarnings', verify, postController.getWarnings);

router.get('/getPosts', postController.getPosts);

// router.get('/getPosts', postController.getPosts);


module.exports = router;