const express = require('express');

const Router = express.Router();
const model = require('./model');

const About = model.getModel('about');

Router.get('/me', function (req, res) {
    const userid = req.cookies.userid;
    About.findOne({userId: userid}, function (err, doc) {
        return res.json({code: 0, data: doc});
    });
});

Router.post('/add', function (req, res) {
    const {userId, name, mail, location, about} = req.body;
    const aboutModal = new About({userId, name, mail, location, about});
    aboutModal.save(function (err, doc) {
        if (err) {
            return res.json({code: 1, msg: '添加about失败!' + err});
        }
        return res.json({code: 0, data: doc});
    });
});

Router.post('/update', function (req, res) {
    const {_id, name, mail, location, about} = req.body;
    About.findByIdAndUpdate({_id}, {name, mail, location, about}, function (err, doc) {
        return res.json({code: 0, data: doc});
    });
});

module.exports = Router;