const express = require('express');

const Router = express.Router();
const model = require('./model');

const Blog = model.getModel('blog');

Router.get('/list', function (req, res) {
    // const { postId } = req.query;
    Blog.find({}, function (err, doc) {
        console.log(err);
        console.log(doc);
        return res.json({code:0, data: doc});
    })
});


module.exports = Router;