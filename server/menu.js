const express = require('express');

const Router = express.Router();
const model = require('./model');

const Menu = model.getModel('menu');

Router.get('/list', function (req, res) {
    Menu.find({}, function (err, doc) {
        return res.json({code: 0, data: doc});
    });
});

Router.post('/add', function (req, res) {
    const {path, describe, active, click} = req.body;
    const menuModel = new Menu({path, describe, active, click});
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
    const {id, active} = req.body;
    Menu.findByIdAndUpdate({_id: id}, {active}, function (err, doc) {
        return res.json({code: 0, data: doc});
    });
});

module.exports = Router;


