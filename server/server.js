const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const postRouter = require('./blog');
const userRouter = require('./user');
const menuRouter = require('./menu');
const fileRouter = require('./file');

const app = express();

const server = require('http').Server(app);

app.use(cookieParser());
app.use(bodyParser.json());

app.use('/blog', postRouter);
app.use('/user', userRouter);
app.use('/menu', menuRouter);
app.use('/file', fileRouter);

server.listen(9093, function () {
    console.log('Node app start at port 9093');
});