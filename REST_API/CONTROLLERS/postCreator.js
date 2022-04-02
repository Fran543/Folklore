const dbOperations = require('../DAL/postOperations');



exports.createPost = async (req, res) => {

    const { postName, content, summary } = req.body;
    // if (username === null || email === null || password === null || passwordConfirm === null) {
    //     return;
    // }
    await dbOperations.createPost(postName, content, summary);
    res.status(200).send('Post created');
}