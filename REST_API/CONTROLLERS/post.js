const dbOperations = require('../DAL/postOperations');

exports.createPost = async (req, res) => {
    const { postName, summary, content, image, userID } = req.body;
    await dbOperations.createPost(postName, summary, content, image, userID);
    res.status(200).send('Post created');
}

exports.getWarnings = async (req, res) => {
    res.status(200).send(await dbOperations.getWarnings());
}

exports.getPosts = async (req, res) => {
    res.status(200).send(await dbOperations.getPosts());
}