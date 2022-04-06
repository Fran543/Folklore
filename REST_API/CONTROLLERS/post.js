const dbOperations = require('../DAL/postOperations');

exports.createStory = async (req, res) => {
    const { title, summary, posts, userID, image } = req.body;
    var storyID = await dbOperations.createStory(title, summary, image, userID);
    posts.forEach(async post => {
        var postID = await dbOperations.createPost(post.content, null, storyID);
        if (post.choice) {
            post.choice.forEach(async choice => {
                await dbOperations.createChoice(choice.choiceValue, postID);
            });
        }
    })
}

exports.getWarnings = async (req, res) => {
    res.status(200).send(await dbOperations.getWarnings());
}

exports.getPosts = async (req, res) => {
    res.status(200).send(await dbOperations.getPosts());
}

exports.getStories = async (req, res) => {
    res.status(200).send(await dbOperations.getStories());
}