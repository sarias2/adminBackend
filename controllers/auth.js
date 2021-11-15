const { response } = require('express');
const bcrypt = require('bcryptjs')
const User = require('../models/users');
const { generateJWT } = require('../helpers/jwt');


const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        //Verify email
        const DBUser = await User.findOne({ email });

        if (!DBUser) {
            return res.status(404).json({
                ok: false,
                msg: 'Email not valid'
            })
        }

        // Verify password
        const validPassword = bcrypt.compareSync(password, DBUser.password);
        if (!validPassword) {
            return res.status(404).json({
                ok: false,
                msg: 'Password not valid'
            })
        }

        // Generate JWT
        const token = await generateJWT(DBUser.id);

        res.status(200).json({
            ok: true,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Talk to the System Admin'
        })
    }
}

module.exports = {
    login
}