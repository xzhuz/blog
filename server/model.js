const mongoose = require('mongoose');

// 链接mongo,
const DB_URL = 'mongodb://localhost:27017/blog';
mongoose.connect(DB_URL);
mongoose.connection.on('connected', function () {
    console.log('mongo connect success');
});


const models = {
    article: {
        'thumb': {'type': String},
        // 标题
        'title': {'type': String, require: true},
        "summary": {'type': String},
        // 内容
        'content': {'type': String},
        'tags': {'type': String, require: true},
        'visit': {'type': Number, require: true, default: 0},
        'publish': {'type': Boolean, require: true, default: false},
        'date': {'type': Date, require: true, default: new Date()},
    },
    user: {
        'user': {'type': String, require: true},
        'pwd': {'type': String, require: true},
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
