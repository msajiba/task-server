const express = require('express');
const app = express();
const cors = require('cors');
require('./config/database.config');

const userRouter = require('./routes/user.route');


//MIDDLEWARE 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}))

// ROUTE ASSIGN
app.use('/api/user', userRouter);


//HANDLE ROUTING ERROR
app.use((req, res, next) => {
    res.status(404).json({
        message: "Route not found"
    });
});

//HANDLE SERVER ERROR
app.use((err, req, res, next) => {
    res.status(500).json({
        message: "Something broke!"
    });
});


module.exports = app;