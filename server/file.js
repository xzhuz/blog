const express = require('express');
const utils = require('utility');
const Router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    // 目的地
    destination(req, file, cb) {
        console.log(__dirname);
        console.log(path.resolve(__dirname, '../static'));
        cb(null, path.resolve(__dirname, '../static'));
    },
    // 文件名
    filename(req, file, cb) {
        let ext;
        file.originalname.replace(/\.\w+$/, function(val) {
            ext = val;
        });
        // 使用md5格式化文件名
        cb(null, `${utils.md5(file.originalname)}${ext}`);
    }
});
const upload = multer({
    storage,
    limits: {
        files: 1, // 单词上传文件数
        fileSize: 200 * 1000, // 文件大小不能超过 xx b
        fieldNameSize: 10, // form中name值不能超过 xx b
    }, // 超过限制会报错，用错误中间件捕获判断err.code为那种限制
    fileFilter(req, file, cb) {
        // cb第一个参数为错误对象，若传入则会报错，第二个参数布尔值，表明是否可接受该文件
        cb(null, true);
    }
});

// 设置保存路径
// const upload = multer({ dest: 'static/' }).single('file');

Router.post('/upload', upload.single('file'), function(req, res, next) {
    // 文件路径
    return res.json({code:0, filename: req.file.filename, path: req.file.path});
});

module.exports = Router;