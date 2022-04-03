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

router.post('/createPost', postController.createPost);

router.get('/getWarnings', postController.getWarnings);

router.get('/getPosts', postController.getPosts);


module.exports = router;