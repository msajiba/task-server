const bcrypt = require('bcrypt');
const saltRounds = 10;

const userModel = require("../models/user.model");

const createUser = async (req, res) => {

    try {

        const {
            firstName,
            lastName,
            email,
            password
        } = req.body;

        const existEmail = await userModel.findOne({
            email: email
        });

        bcrypt.hash(password, saltRounds, async (err, hash) => {

            if (existEmail) {
                return res.json({
                    message: 'User already exist'
                });
            }
            const newUser = new userModel({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hash
            });
            await newUser.save();
            res.status(201).json({
                message: "User create successfully"
            });
        });

    } catch (error) {
        res.status(403).send(error.message);
    }

};

const getUsers = async (req, res) => {
    res.send('get all users');
};


module.exports = {
    createUser,
    getUsers,
}