const express = require('express');

const Router = express.Router();
const model = require('./model');

const Blog = model.getModel('blog');

Router.get('/list', function (req, res) {
    Blog.find({}, {}, {sort: {"date": -1}}, function (err, doc) {
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

// Router.get('/clear', function (req, res) {
//     Blog.remove({}, function (err, doc) {
//         return res.json({code: 0, data: doc});
//     });
// });

Router.get('/delete', function (req, res) {
    const {id} = req.query;
    Blog.remove({_id: id}, function (err, doc) {
        return res.json({code: 0, data: doc});
    });
});

// 更新
Router.post('/update', function (req, res) {
    const {id, content, summary, title, tags} = req.body;
    Blog.findByIdAndUpdate({_id: id}, {content, summary, title, tags}, function (err, doc) {
        return res.json({code: 0, data: doc});
    });
});

Router.post('/visit', function (req, res) {
   const {id, visit}  = req.body;
    Blog.findByIdAndUpdate({_id: id}, {visit}, function (err, doc) {
        return res.json({code: 0, data: doc});
    });
});

module.exports = Router;