const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const postRouter = require('./blog');
const userRouter = require('./user');

const app = express();

const server = require('http').Server(app);

app.use(cookieParser());
app.use(bodyParser.json());

app.use('/blog', postRouter);
app.use('/user', userRouter);

server.listen(9093, function () {
    console.log('Node app start at port 9093');
});