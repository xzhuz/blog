const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const articleRouter = require('./article');
const userRouter = require('./user');
const fileRouter = require('./file');

const app = express();

const server = require('http').Server(app);

app.use(cookieParser());
app.use(bodyParser.json());

app.use('/api/articles', articleRouter);
app.use('/api/user', userRouter);
app.use('/api/file', fileRouter);

server.listen(9093, function () {
    console.log('Node app start at port 9093');
});
