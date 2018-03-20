const express = require('express');
const utils = require('utility');

const Router = express.Router();
const model = require('./model');

const User = model.getModel('user');
const _filter = {'pwd': 0, '__v': 0};

// 注意Router.post 这个请求类型
// blog 不支持注册
// Router.post('/register', function (req, res) {
//     const {user, pwd} = req.body;
//     User.findOne({user}, function (err, doc) {
//         if (doc) {
//             return res.json({code: 1, msg: '用户名重复'});
//         }
//
//         const userModel = new User({user, pwd: md5Pwd(pwd)});
//         userModel.save(function (e, d) {
//             if (e) {
//                 return res.json({code: 1, msg: '后端出错了'});
//             }
//             const {user, type, _id} = d;
//             return res.json({code: 0, data: {user, type, _id}});
//         });
//     });
// });

Router.post('/login', function (req, res) {
    const {user, pwd} = req.body;
    User.findOne({user, pwd: md5Pwd(pwd)}, _filter, function (err, doc) {
        if(!doc) {
            return res.json({code: 1, msg: '用户名或密码错误'});
        }
        res.cookie('userid', doc._id);
        return res.json({code: 0, data: doc});
    });
});

// 加密pwd
function md5Pwd(pwd) {
    const salt = 'react_is_good_#$12#$%&';
    return utils.md5(utils.md5(pwd + salt));
}

module.exports = Router;