const mongoose = require('mongoose');

// 链接mongo,
const DB_URL = 'mongodb://localhost:27017/blog';
mongoose.connect(DB_URL);
mongoose.connection.on('connected', function () {
    console.log('mongo connect success');
});


const models = {
    blog: {
        // 头像
        'avatar': {'type': String},
        // 标题
        'title': {'type': String, require: true},
        "summary": {'type': String},
        // 内容
        'content': {'type': String},
        'tags': {'type': Array, require: true},
        'date': {'type': String, require: true},
    }
};


for (let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]));
}

module.exports = {
    getModel: function (name) {
        return mongoose.model(name);
    }
};
