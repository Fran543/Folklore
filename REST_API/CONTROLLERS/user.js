const { user } = require('../DAL/dbConfig');
const dbOperations = require('../DAL/userOperations');


exports.getUser = async (req, res) => {
    var user = await dbOperations.getUser(req.body.userID);
    var blogs = await dbOperations.getUserBlogs(req.body.userID);
    var stories = await dbOperations.getUserStories(req.body.userID);
    var json = '{'
        + '"username":"' + user.Username + '",'
        + '"email":"' + user.Email
        + '",'
        + '"blogs":['
    for (const blog of blogs) {
        json += '{'
        json += '"blogName":"' + blog.StoryName + '",'
            + '"pubDate":"' + blog.PubName + '",'
            + '"summary":"' + blog.Summary + '",'
            + '"imageBlob":"' + blog.ImageBlob + '"}'
        if (!(blogs.indexOf(blog) === blogs.length - 1)) json += ',';
    }
    json += '],"stories":['
    for (const story of stories) {
        json += '{'
        json += '"storyName":"' + story.StoryName + '",'
            + '"pubDate":"' + story.PubDate + '",'
            + '"summary":"' + story.Summary + '",'
            + '"imageBlob":"' + story.ImageBlob + '"}'
        if (!(stories.indexOf(story) === stories.length - 1)) json += ',';
    }
    json += ']}'
    res.status(200).send(JSON.parse(json));
}

exports.deleteUser = async (req, res) => {
    try {
        var user = await dbOperations.deleteUser(req.body.userID);
        res.clearCookie("jwt");
        res.status(200).send("User deleted");
    } catch (error) {
        return res.status(400).send(error);
    }
}

exports.getSearchItems = async (req, res) => {
    res.status(200).send(await dbOperations.getSearchItems());
}

exports.getUserLibrary = async (req, res) => {
    res.status(200).send(await dbOperations.getUserLibrary(req.body.userID));
}

exports.getUserBlogs = async (req, res) => {
    res.status(200).send(await dbOperations.getUserBlogs(req.body.userID));
}

exports.getUserStories = async (req, res) => {
    res.status(200).send(await dbOperations.getUserStories(req.body.userID));
}

exports.removeStoryFromUser = async (req, res) => {
    try {
        await dbOperations.removeStoryFromUser(req.body.userID, req.query.storyID)
        res.status(200).send("Story removed from library");
    } catch (error) {
        return res.status(400).send(error);
    }
}