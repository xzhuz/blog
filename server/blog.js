const express = require('express');

const Router = express.Router();
const model = require('./model');

const Blog = model.getModel('blog');

Router.get('/list', function (req, res) {
    Blog.find({}, function (err, doc) {
        return res.json({code: 0, data: doc});
    });
});

Router.post('/publish', function (req, res) {
    const {icon, content, summary, title, tags, visit} = req.body;
    const blogModel = new Blog({icon, content, summary, title, tags, visit});
    blogModel.save(function (err, doc) {
        if (err) {
            return res.json({code: 1, msg: '发布失败!' + err});
        }
        return res.json({code: 0, data: doc});
    });
});

Router.get('/popular', function (req, res) {
    Blog.find({}, {}, {sort: {"visit": -1}, limit: 3}, function (err, doc) {
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