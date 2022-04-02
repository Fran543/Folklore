var config = require('./dbConfig');
const sql = require('mssql');
const { password } = require('./dbConfig');


sql.on('error', err => {
    console.log(err.message);
})

async function createPost(postName, content, summary) {
    try {
        let pool = await sql.connect(config);
        let users = await pool
            .request()
            .input('PostName', sql.NVarChar(50), postName)
            .input('Content', sql.NVarChar(sql.MAX), content)
            .input('Summary', sql.NVarChar(500), summary)
            .output('IDPost', sql.Int)
            .execute('createPost');
        return users.output.IDUserAccount;
    } catch (err) {
        console.log(err.message);
    } finally {
    }
}

module.exports = {
    createPost: createPost
}