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
            .input('IDUserAccount', sql.Int, id)
            .execute('ReadUserAccount');
        console.log(users.recordsets);
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
            .input('Password', sql.NVarChar(50), password)
            .input('Active', sql.Bit, 1)
            .output('IDUser', sql.Int)
            .execute('createUser');
        return users.output.IDUserAccount;
    } catch (err) {
        console.log(err.message);
    } finally {
    }
}

async function checkUserEmail(username, email) {
    try {
        let pool = await sql.connect(config);
        let users = await pool
            .request()
            .input('Username', sql.NVarChar(50), username)
            .input('Email', sql.NVarChar(50), email)
            .query('select * from AppUser where Username = @Username OR Email = @Email');
        console.log(users)
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

module.exports = {
    getUsers: getUsers,
    getUser: getUser,
    createUser: createUser,
    checkUserEmail: checkUserEmail
}