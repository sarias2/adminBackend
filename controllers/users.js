const { response } = require('express');
const User = require('../models/users');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

const getUsers = async(req, res) => {

    const users = await User.find({}, 'name email role google');

    res.json({
        ok: true,
        users
    })
}

const createUser = async(req, res = response) => {

    const { email, password, name } = req.body;

    try {

        const emailExists = await User.findOne({ email });

        if (emailExists) {
            return res.status(400).json({
                ok: false,
                msg: 'Email already in use'
            })
        }

        const user = new User(req.body);

        // Encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        // Generate JWT
        const token = await generateJWT(user.id);

        res.json({
            ok: true,
            user,
            token
        })

    } catch (error) {
        res.status(500).json({
            ok: false
        })
    }


}

const updateUser = async(req, res = response) => {

    const uId = req.params.id;

    try {

        const DBUser = await User.findById(uId);

        if (!DBUser) {
            return res.status(404).json({
                ok: false,
                msg: 'The user wasn´t found'
            })
        }

        // Updates
        const { password, google, email, ...fields } = req.body;

        if (DBUser.email !== email) {

            const emailExists = await User.findOne(email);
            if (emailExists) {
                return res.status(400).json({
                    ok: false,
                    msg: 'User already exists'
                })
            }
        }

        fields.email = email;
        delete fields.password;
        delete fields.google;

        const updatedUser = await User.findByIdAndUpdate(uId, fields, { new: true });


        res.json({
            ok: true,
            user: updatedUser
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        })
    }

}

const deleteUser = async(req, res) => {

    const uId = req.params.id;

    try {

        const DBUser = await User.findById(uId);

        if (!DBUser) {
            return res.status(404).json({
                ok: false,
                msg: 'The user wasn´t found'
            })
        }

        await User.findByIdAndDelete(uId);

        res.json({
            ok: true,
            msg: 'User has been deleted'
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        })
    }
}


module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}