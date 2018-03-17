const express = require('express');

const Router = express.Router();
const model = require('./model');

const Blog = model.getModel('blog');

Router.get('/list', function (req, res) {
    Blog.find({}, function (err, doc) {
        return res.json({code: 0, data: doc});
    });
});

Router.post('/write', function (req, res) {
    const {avatar, content, summary, title, tags} = req.body;
    const blogModel = new Blog({avatar, content, summary, title, tags, date: new Date().toLocaleDateString()});
    blogModel.save(function (err, doc) {
        return res.json({code: 0, data: doc});
    });
});

Router.get('/post', function (req, res) {
    const {postId} = req.query;
    Blog.findOne({_id: postId}, function (err, doc) {
        return res.json({code: 0, data: doc});
    });
});

Router.get('/delete', function (req, res) {
    Blog.remove({}, function (err, doc) {
        return res.json({code: 0, data: doc});
    });
});

module.exports = Router;