const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const postRouter = require('./post');

const app = express();

const server = require('http').Server(app);

app.use(cookieParser());
app.use(bodyParser.json());

app.use('/post', postRouter);

server.listen(9093, function () {
    console.log('Node app start at port 9093');
});