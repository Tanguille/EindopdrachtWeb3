require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const helmet = require("helmet");
const bodyParser = require('body-parser')
const auth = require('./middlewares/authenticator');

//TODO: Bcrypt

//Routes
const studentRouter = require('./routes/student');
const loginRouter = require('./routes/login');
const csvRouter = require('./routes/csv');
const opdrachtRouter = require('./routes/opdracht');
const opdrachtElementRouter = require('./routes/opdrachtElement');
const rapportRouter = require('./routes/rapport');
const vraagRouter = require('./routes/vraag');

const app = express();



//middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}));

//Socket.io
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    },
});
server.listen(process.env.PORT);
io.on('connection', (socket) => {
    socket.on('sendQuestion', (data) => {
        console.log('sendQuestion', data);
        io.emit('receiveQuestion', data);
    });
    socket.on('sendResterendeTijd', (data) => {
        console.log('sendResterendeTijd', data);
        io.emit('receiveResterendeTijd', data);
    });
});

//Authentication middleware
app.use((req, res, next) => {
    //TODO: Fix auth on host and admin
    if (req.path == '/login' || req.path == '/admin' || req.path == '/host') {
        next();
    } else
        auth(req, res, next);
});

//Routes gebruiken
app.use('/student', studentRouter);
app.use('/login', loginRouter);
app.use('/csv', csvRouter);
app.use('/opdracht', opdrachtRouter);
app.use('/opdrachtElement', opdrachtElementRouter);
app.use('/rapport', rapportRouter);
app.use('/vraag', vraagRouter);

module.exports = app;
