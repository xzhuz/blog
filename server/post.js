const express = require('express');
const utils = require('utility');

const Router = express.Router();
const model = require('./model');

const Post = model.getModel('post');

Router.get('/list', function (req, res) {
    Post.find({}, function (err, doc) {
        return res.json({code:0, data: doc});
    })
});

module.exports = Router;