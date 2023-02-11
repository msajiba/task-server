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
    try {
        const users = await userModel.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(404).send(error.message);
    }
};

const userLogin = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        const user = await userModel.findOne({
            email: email
        });

        if (user) {
            bcrypt.compare(password, user.password, async (err, result) => {

                //apply De_morgan law
                if (!!result === true) {
                    res.status(200).json({
                        message: 'valid user'
                    });
                } else {
                    res.status(404).json({
                        message: 'Password incorrect'
                    });
                }
            });
        } else {
            res.status(404).json({
                message: "Not valid user"
            });
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
}

module.exports = {
    createUser,
    getUsers,
    userLogin,
}