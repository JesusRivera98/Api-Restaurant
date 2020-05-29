const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const { SECRET_TOKEN } = require('../config');

function validateSessionToken(req, res, next) {
    console.log(SECRET_TOKEN)
    const { sessiontoken } = req.headers;
    jsonwebtoken.verify(sessiontoken, SECRET_TOKEN, (err, decoded) => {
        if (err) {
            console.log(err);
            res.statusMessage = "Session expired!";
            return res.status(400).end();
        }
        
        next();
        // Continue with the posting of the comment
    });
}

module.exports = validateSessionToken;