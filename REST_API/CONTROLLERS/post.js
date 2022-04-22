const dbOperations = require('../DAL/postOperations');

async function addConditionsToPost(postsOBJs, choiceIDs) {
    for (const postsOBJ of postsOBJs) {
        if (postsOBJ.conditions) {
            for (const condition of postsOBJ.conditions) {
                await dbOperations.addConditionToPost(postsOBJ.postID, choiceIDs[condition])
            }
        }
    }
}

async function addPostsToStory(storyID, posts) {
    var choiceIDs = []
    var postsOBJs = []
    for (const post of posts) {
        var postID = await dbOperations.createPost(post.content, null, storyID);
        postsOBJs.push({ "postID": postID, "conditions": post.conditions });
        if (post.choices) {
            // post.choices.forEach(async choice => {
            //     let id = await dbOperations.createChoice(choice.choiceValue, postID)
            //     choiceIDs.push(id);
            // });
            for (const choice of post.choices) {
                let id = await dbOperations.createChoice(choice.choiceValue, postID)
                choiceIDs.push(id);
            }
        }
    }
    addConditionsToPost(postsOBJs, choiceIDs)
}

exports.createStory = async (req, res) => {
    const { title, summary, posts, userID, image } = req.body;
    var storyID = await dbOperations.createStory(title, summary, image, userID);
    addPostsToStory(storyID, posts)
    // for (const post of posts) {
    //     var postID = await dbOperations.createPost(post.content, null, storyID);
    //     postsOBJs.push({ "postID": postID, "conditions": post.conditions });
    //     if (post.choices) {
    //         post.choices.forEach(async choice => {
    //             let id = await dbOperations.createChoice(choice.choiceValue, postID)
    //             choiceIDs.push(id);
    //         });
    //         // for (const choice in post.choices) {
    //         //     let id = await dbOperations.createChoice(choice.choiceValue, postID)
    //         //     choiceIDs.push(id);
    //         // }
    //     }
    // }
    // for (const postsOBJ of postsOBJs) {
    //     if (postsOBJ.conditions) {
    //         for (const condition of postsOBJ.conditions) {
    //             await dbOperations.addConditionToPost(postsOBJ.postID, choiceIDs[condition])
    //         }
    //     }
    // }
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

exports.getStoryById = async (req, res) => {
    const idStory = req.query.idStory;
    res.status(200).send(await dbOperations.getStoryById(idStory));
}

exports.getPostByChoiceId = async (req, res) => {
    const idChoice = req.query.idChoice;
    res.status(200).send(await dbOperations.getPostByChoiceId(idChoice));
}