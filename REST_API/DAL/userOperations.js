var config = require('./dbConfig');
const sql = require('mssql');
const { password } = require('./dbConfig');

sql.on('error', err => {
    console.log(err.message);
})

async function getUsers() {
    try {
        let pool = await sql.connect(config);
        let users = await pool.request().execute('ReadUserAccounts');
        return users.recordsets;
    } catch (err) {
        console.log(err.message);
    } finally {
    }
}

async function getUser(id) {
    try {
        let pool = await sql.connect(config);
        let users = await pool
            .request()
            .input('IDUser', sql.Int, id)
            .execute('selectUser');
        return users.recordsets[0][0];
    } catch (err) {
        console.log(err.message);
    } finally {
    }
}

async function deleteUser(id) {
    try {
        let pool = await sql.connect(config);
        let users = await pool
            .request()
            .input('IDUser', sql.Int, id)
            .execute('deleteUser');
        return users.recordsets[0][0];
    } catch (err) {
        console.log(err.message);
    } finally {
    }
}

async function createUser(username, email, password) {
    try {
        let pool = await sql.connect(config);
        let users = await pool
            .request()
            .input('Username', sql.NVarChar(50), username)
            .input('Email', sql.NVarChar(50), email)
            .input('Password', sql.NVarChar(sql.MAX), password)
            .input('Active', sql.Bit, 1)
            .output('IDUser', sql.Int)
            .execute('createUser');
        return users.output.IDUserAccount;
    } catch (err) {
        console.log(err.message);
    } finally {
    }
}

async function checkUsernameAndEmail(username, email) {
    try {
        let pool = await sql.connect(config);
        let users = await pool
            .request()
            .input('Username', sql.NVarChar(50), username)
            .input('Email', sql.NVarChar(50), email)
            .query('select * from AppUser where Username = @Username OR Email = @Email');
        if (users !== null) {
            if (users.rowsAffected[0] > 0) {
                return users.recordset;
            }
        }
        return null;
    } catch (err) {
        console.log(err.message);
    } finally {
    }
}
async function checkEmail(email) {
    try {
        let pool = await sql.connect(config);
        let users = await pool
            .request()
            .input('Email', sql.NVarChar(50), email)
            .query('select * from AppUser where Email = @Email');
        if (users !== null) {
            if (users.rowsAffected[0] > 0) {
                return users.recordset;
            }
        }
        return null;
    } catch (err) {
        console.log(err.message);
    } finally {
    }
}

async function getUserBlogs(id) {
    try {
        let pool = await sql.connect(config);
        let users = await pool
            .request()
            .input('IDUser', sql.Int, id)
            .execute('getUserBlogs');
        return users.recordsets[0];
    } catch (err) {
        console.log(err.message);
    } finally {
    }
}

async function getUserStories(id) {
    try {
        let pool = await sql.connect(config);
        let users = await pool
            .request()
            .input('IDUser', sql.Int, id)
            .execute('getUserStories');
        return users.recordsets[0];
    } catch (err) {
        console.log(err.message);
    } finally {
    }
}

async function getUserLibrary(id) {
    try {
        let pool = await sql.connect(config);
        let users = await pool
            .request()
            .input('IDUser', sql.Int, id)
            .execute('getUserLibrary');
        return users.recordsets[0];
    } catch (err) {
        console.log(err.message);
    } finally {
    }
}

async function getSearchItems(id) {
    try {
        let pool = await sql.connect(config);
        let users = await pool
            .request()
            .execute('getSearchItems');
        return users.recordsets;
    } catch (err) {
        console.log(err.message);
    } finally {
    }
}

async function removeStoryFromUser(userID, storyID) {
    console.log(userID + " " + storyID)
    try {
        let pool = await sql.connect(config);
        let users = await pool
            .request()
            .input('UserID', sql.Int, userID)
            .input('StoryID', sql.Int, storyID)
            .execute('removeStoryFromUser');
        return users.recordsets;
    } catch (err) {
        console.log(err.message);
    }
}

module.exports = {
    getUsers: getUsers,
    getUser: getUser,
    deleteUser: deleteUser,
    createUser: createUser,
    checkUsernameAndEmail: checkUsernameAndEmail,
    checkEmail: checkEmail,
    getUserBlogs: getUserBlogs,
    getUserStories: getUserStories,
    getUserLibrary: getUserLibrary,
    getSearchItems: getSearchItems,
    removeStoryFromUser: removeStoryFromUser
}