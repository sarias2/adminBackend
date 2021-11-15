const jwt = require('jsonwebtoken')

const generateJWT = (uId) => {

    return new Promise((resolve, reject) => {

        const payload = {
            uId
        };

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('JWT couldn´t be created');
            } else {
                resolve(token);
            }
        });

    });
}

module.exports = {
    generateJWT
}