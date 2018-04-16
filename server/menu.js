const express = require('express');

const Router = express.Router();
const model = require('./model');

const Menu = model.getModel('menu');

Router.get('/list', function (req, res) {
    Menu.find({}, {}, {sort: {"index": 1}}, function (err, doc) {
        return doc ? res.json({code: 0, data: doc}) : res.json({code: 2});
    });
});

Router.post('/add', function (req, res) {
    const {index, path, describe, active, click} = req.body;
    const menuModel = new Menu({index, path, describe, active, click});
    menuModel.save(function (err, doc) {
        return res.json({code: 0, data: doc});
    });
});

Router.get('/remove', function (req, res) {
    Menu.remove({}, function (err, doc) {
        return res.json({code: 0, data: doc});
    });
});

Router.get('/delete', function (req, res) {
    const {id} = req.query;
    Menu.remove({_id: id}, function (err, doc) {
        return res.json({code: 0, data: doc});
    });
});


Router.post('/update', function (req, res) {
    const {id, active, describe, index, click, path} = req.body;
    Menu.findByIdAndUpdate({_id: id}, {active, describe, index, click, path}, function (err, doc) {
        return res.json({code: 0, data: doc});
    });
});

module.exports = Router;


