const express = require('express');

const Router = express.Router();
const model = require('./model');

const About = model.getModel('about');

Router.get('/me', function (req, res) {
    About.findOne({}, function (err, doc) {
        return res.json({code: 0, data: doc});
    });
});

Router.post('/add', function (req, res) {
    const {avatar, name, mail, major, skill, location, about} = req.body;
    const aboutModal = new About({avatar, name, mail, major, skill, location, about});
    aboutModal.save(function (err, doc) {
        if (err) {
            return res.json({code: 1, msg: '添加aboutme失败!' + err});
        }
        return res.json({code: 0, data: doc});
    });
});

Router.post('/update', function (req, res) {
    const {id, avatar, name, mail, major, skill, location, about} = req.body;
    About.findByIdAndUpdate({_id: id}, {avatar, name, mail, major, skill, location, about}, function (err, doc) {
        return res.json({code: 0, data: doc});
    });
});

module.exports = Router;