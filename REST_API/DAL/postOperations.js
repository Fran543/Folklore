var config = require('./dbConfig');
const sql = require('mssql');
const { password } = require('./dbConfig');

sql.on('error', err => {
    console.log(err.message);
})

async function createStory(title, summary, image, userID) {
    try {
        let pool = await sql.connect(config);
        let users = await pool
            .request()
            .input('StoryName', sql.NVarChar(50), title)
            .input('Summary', sql.NVarChar(500), summary)
            .input('ImageBlob', sql.NVarChar(sql.MAX), image)
            .input('UserID', sql.Int, userID)
            .output('IDStory', sql.Int)
            .execute('createStory');
        return users.output.IDStory;
    } catch (err) {
        console.log(err.message);
    } finally {
    }
}
async function createPost(content, image, storyID) {
    try {
        let pool = await sql.connect(config);
        let users = await pool
            .request()
            .input('Content', sql.NVarChar(sql.MAX), content)
            .input('ImageBlob', sql.NVarChar(sql.MAX), image)
            .input('StoryID', sql.Int, storyID)
            .output('IDPost', sql.Int)
            .execute('createPost');
        return users.output.IDPost;
    } catch (err) {
        console.log(err.message);
    } finally {
    }
}

async function createChoice(content, postID) {
    try {
        let pool = await sql.connect(config);
        let users = await pool
            .request()
            .input('Content', sql.NVarChar(sql.MAX), content)
            .input('PostID', sql.Int, postID)
            .output('IDChoice', sql.Int)
            .execute('createChoice');
        return users.output.IDChoice;
    } catch (err) {
        console.log(err.message);
    } finally {
    }
}

async function getWarnings() {
    try {
        let pool = await sql.connect(config);
        let warnings = await pool
            .request()
            .execute('selectWarnings');
        return warnings.recordset;
    } catch (err) {
        console.log(err.message);
    } finally {
    }
}

async function getPosts() {
    try {
        let pool = await sql.connect(config);
        let posts = await pool
            .request()
            .execute('selectPosts');
        return posts.recordset;
    } catch (err) {
        console.log(err.message);
    } finally {
    }
}
async function getStories() {
    try {
        let pool = await sql.connect(config);
        let posts = await pool
            .request()
            .execute('selectStories');
        return posts.recordset;
    } catch (err) {
        console.log(err.message);
    } finally {
    }
}

module.exports = {
    createPost: createPost,
    createStory: createStory,
    createChoice: createChoice,
    getWarnings: getWarnings,
    getPosts: getPosts,
    getStories: getStories,
}