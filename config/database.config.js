const mongoose = require('mongoose');
require('dotenv').config();

const URL = process.env.DB_URL;

mongoose.set("strictQuery", false);
mongoose.connect(URL)
    .then(() => {
        console.log('MONGODB is connected');
    })
    .catch((err) => {
        console.log(err.message);
    });