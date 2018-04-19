const express = require('express');
const utils = require('utility');

const Router = express.Router();
const model = require('./model');

const User = model.getModel('user');
const _filter = {'pwd': 0, '__v': 0};

// 注意Router.post 这个请求类型
// blog 不支持注册
Router.post('/register', function (req, res) {
    const {username, password} = req.body;
    User.findOne({username}, function (err, doc) {
        if (doc) {
            return res.json({code: 1, msg: '用户名重复'});
        }

        const userModel = new User({username, password: md5Pwd(password)});
        userModel.save(function (e, d) {
            if (e) {
                return res.json({code: 1, msg: '后端出错了'});
            }
            const {user, type, _id} = d;
            return res.json({code: 0, data: {user, type, _id}});
        });
    });
});

Router.post('/login', function (req, res) {
    const {username, password} = req.body;
    User.findOne({username: username, password: md5Pwd(password)}, _filter, function (err, doc) {
        if(!doc) {
            return res.json({code: 1, msg: '用户名或密码错误'});
        }
        res.cookie('userid', doc._id, {maxAge: 6000000});
        return res.json({code: 0, data: doc});
    });
});

Router.get('/info', function (req, res) {
    // 用户是否有cookie
    const {userid} = req.cookies;
    if (!userid) {
        return res.json({code: 1});
    }
    User.findOne({_id: userid}, _filter, function (err, doc) {
        if (err) {
            return res.json({code: 1, msg: '后端出错了'});
        }
        return res.json({code: 0, data: doc});
    });
});

// Router.post('/update', function (req, res) {
//     const userid = req.cookies.userid;
//     if (!userid) {
//         return res.dumps({code: 1});
//     }
//     const body = req.body;
//     User.findByIdAndUpdate(userid, body, function (err, doc) {
//         const data = Object.assign({}, {
//             user: doc.user
//         }, body);
//         return res.json({code: 0, data});
//     });
// });


// 加密pwd
function md5Pwd(pwd) {
    const salt = 'react_is_good_#$12#$%&';
    return utils.md5(utils.md5(pwd + salt));
}

module.exports = Router;
