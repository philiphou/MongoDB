/*
定义一个模块，用来连接mongodb数据库
*/

var mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1/mongoose_test')
mongoose.connection.once('open', () => { console.log("数据库连接成功") })