const mongoose = require('mongoose');

const userModel = new mongoose.Schema({

    firstName: {
        type: String,
        required: [true, 'Enter your first name'],
    },
    lastName: {
        type: String,
        required: [true, 'Enter your last name'],
    },
    email: {
        type: String,
        required: [true, 'Enter your email'],
    },
    password: {
        type: String,
        required: [true, 'Enter your password'],
    },

});

module.exports = mongoose.model('users', userModel);