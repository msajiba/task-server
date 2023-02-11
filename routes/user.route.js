const express = require('express');

const {
    getUsers, createUser, userLogin
} = require('../controllers/user.controller');


const router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);
router.post('/login', userLogin);


module.exports = router;