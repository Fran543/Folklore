var config = require('./dbConfig');
const sql = require('mssql');
const { password } = require('./dbConfig');

sql.on('error', err => {
    console.log(err.message);
})

async function createPost(postName, content, summary, image, userID) {
    try {
        let pool = await sql.connect(config);
        let users = await pool
            .request()
            .input('PostName', sql.NVarChar(50), postName)
            .input('Content', sql.NVarChar(sql.MAX), content)
            .input('Summary', sql.NVarChar(500), summary)
            .input('ImageBlob', sql.NVarChar(sql.MAX), image)
            .input('UserID', sql.Int, userID)
            .output('IDPost', sql.Int)
            .execute('createPost');
        return users.output.IDUserAccount;
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

module.exports = {
    createPost: createPost,
    getWarnings: getWarnings,
    getPosts: getPosts,
}