const jwt = require('jsonwebtoken');

const JWTValidation = (req, res, next) => {

    //Read Token
    const token = req.header('x-token');

    if (!token) {

        return res.status(401).json({
            ok: false,
            msg: 'Unathorized request'
        })
    }

    try {

        const { uId } = jwt.verify(token, process.env.JWT_SECRET);

        req.uId = uId;

        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Unathorized request'
        })
    }



}

module.exports = {
    JWTValidation
}