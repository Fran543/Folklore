const dbOperations = require('../DAL/userOperations');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


exports.register = (req, res) => {

    const { username, email, password, passwordConfirm } = req.body;
    // if (username === null || email === null || password === null || passwordConfirm === null) {
    //     return;
    // }
    dbOperations.checkUserEmail(username, email).then(async result => {
        if (result !== null) {
            return res.status(300).send('Username or email exists');
        } else if (password !== passwordConfirm) {
            return res.status(300).send('Passwords do not match');
        }

        // let hashedPassword = await bcrypt.hash(password, 8);
        await dbOperations.createUser(username, email, password);
        res.status(200).send('User created');

        // return res.render('index', {
        //     message: 'User registered'
        // });
    })
}
