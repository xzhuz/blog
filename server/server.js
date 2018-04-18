const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const articleRouter = require('./article');
const userRouter = require('./user');
const fileRouter = require('./file');
const aboutRouter = require('./about');

const app = express();

const server = require('http').Server(app);

app.use(cookieParser());
app.use(bodyParser.json());

app.use('/articles', articleRouter);
app.use('/user', userRouter);
app.use('/file', fileRouter);
app.use('/about', aboutRouter);

server.listen(9093, function () {
    console.log('Node app start at port 9093');
});
