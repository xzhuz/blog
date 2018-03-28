const express = require('express');
const utils = require('utility');
const Router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    // 目的地
    destination(req, file, cb) {
        cb(null, path.resolve(__dirname, './static'));
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
}).single('file');

Router.post('/upload', upload, function(req, res) {
    const {host} = req.headers;
    const filePath = 'http://' + host + '/file/load/' + req.file.filename;
    const doc = {filename: req.file.filename, filePath: filePath};
    // 文件路径
    return res.json({code:0, data: doc});
});

Router.get('/load/:name', function (req, res) {
    const {name} = req.params;
    const url = path.resolve(__dirname, `./static/${name}`);
    // res.setHeader('Content-Type', 'image/png');
    const content =  fs.readFileSync(url,"binary");
    res.writeHead(200, "Ok");
    // 格式必须为 binary，否则会出错
    res.write(content,"binary");
    res.end();
});

module.exports = Router;
