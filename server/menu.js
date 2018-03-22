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
    const {path, describe, active} = req.body;
    const menuModel = new Menu({path, describe, active});
    menuModel.save(function (err, doc) {
        return res.json({code: 0, data: doc});
    });
});

Router.get('/delete', function (req, res) {
    Menu.remove({}, function (err, doc) {
        return res.json({code: 0, data: doc});
    });
});


// Router.post('/update', function (req, res) {
//     const {id, path, describe} = req.body;
//     Menu.findByIdAndUpdate({_id: id}, {path, describe}, function (err, doc) {
//         const data = Object.assign({}, {
//             user: doc.user,
//         }, body);
//         return res.json({code: 0, data});
//     });
// });

module.exports = Router;


