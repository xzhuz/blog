const express = require('express');

const Router = express.Router();
const model = require('./model');

const Article = model.getModel('article');

Router.get('/list', function (req, res) {
    Article.find({}, {}, {sort: {"date": -1}}, function (err, doc) {
        return res.json({code: 0, data: doc});
    });
});

Router.post('/publish', function (req, res) {
    const {coverImg, content, summary, title, tags, visit, publish} = req.body;
    const articleModel = new Article({coverImg, content, summary, title, tags, visit, publish});
    articleModel.save(function (err, doc) {
        if (err) {
            return res.json({code: 1, msg: '发布失败!' + err});
        }
        return res.json({code: 0, data: doc});
    });
});

/**
 * 热门博客
 */
Router.get('/popular', function (req, res) {
    Article.find({}, {}, {sort: {"visit": -1}, limit: 3}, function (err, doc) {
        return res.json({code: 0, data: doc});
    });
});

/**
 * 部分博客
 */
Router.get('/part', function(req, res) {
    const {start, end} = req.query;
    Article.find({}, {}, {sort: {"date": -1}, skip: Number.parseInt(start), limit: Number.parseInt(end)}, function (err, doc) {
        return res.json({code: 0, data: doc});
    });
});

/**
 * 统计
 */

Router.get('/count', function (req, res) {
    Article.count({}, function (err, doc) {
        return res.json({code: 0, data: doc});
    });
});

/**
 * 获取文章
 */
Router.get('/article', function (req, res) {
    const {articleId} = req.query;
    Article.findOne({_id: articleId}, function (err, doc) {
        return res.json({code: 0, data: doc});
    });
});

/**
 * 根据tag来查询
 */
Router.get('/tag', function (req, res) {
    const {tag} = req.query;
    Article.find({tags: {$in: [tag]}}, function (err, doc) {
        return res.json({code: 0, data: doc});
    });
});

// Router.get('/clear', function (req, res) {
//     Article.remove({}, function (err, doc) {
//         return res.json({code: 0, data: doc});
//     });
// });

// 删除博客
Router.get('/delete', function (req, res) {
    const {id} = req.query;
    Article.remove({_id: id}, function (err, doc) {
        return res.json({code: 0, data: doc});
    });
});

// 更新
Router.post('/update', function (req, res) {
    const {id, coverImg, content, summary, title, tags, publish} = req.body;
    console.log(coverImg);
    Article.findByIdAndUpdate({_id: id}, {coverImg, content, summary, title, tags, publish}, function (err, doc) {
        return res.json({code: 0, data: doc});
    });
});

Router.post('/visit', function (req, res) {
   const {id, visit}  = req.body;
    Article.findByIdAndUpdate({_id: id}, {visit}, function (err, doc) {
        return res.json({code: 0, data: doc});
    });
});

module.exports = Router;