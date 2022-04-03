const dbOperations = require('../DAL/postOperations');



exports.createPost = async (req, res) => {

    const { postName, content, summary, image } = req.body;
    // if (username === null || email === null || password === null || passwordConfirm === null) {
    //     return;
    // }
    console.log(image)
    await dbOperations.createPost(postName, content, summary, image);
    res.status(200).send('Post created');
}

exports.getWarnings = async (req, res) => {
    res.status(200).send(await dbOperations.getWarnings());
}

exports.getPosts = async (req, res) => {
    res.status(200).send(await dbOperations.getPosts());
}