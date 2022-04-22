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
    console.log(json);
    res.status(200).send(JSON.parse(json));
}