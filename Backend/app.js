require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const auth = require('./middlewares/authenticator');

const studentRouter = require('./routes/student');
const loginRouter = require('./routes/login');
const csvRouter = require('./routes/csv');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}));

//Authentication middleware
app.use((req, res, next) => {
    //console.log("req.headers:", req.headers);
    if (req.path !== '/student') {
        next();
    } else
        auth(req, res, next);
});

//Routes
app.use('/student', studentRouter);
app.use('/login', loginRouter);
app.use('/csv', csvRouter);

module.exports = app;
