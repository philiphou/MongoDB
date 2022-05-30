//  创建一个 stuModel 模块，用来创建 Model

var mongoose = require('mongoose')

var stuSchema = new mongoose.Schema({
        name: String,
        age: Number,
        gender: {
            type: String,
            default: "female"
        },
        address: String

    })
    //  定义模型; 调用 mongoose.model()方法，传入 参数：1. 结合名称，2. 约束条件 Schema

const StuModel = mongoose.model('students', stuSchema)

//  将 model 暴露出去
Module.exports = StuModel // 直接把 StuModel 赋值给 Module.export 这个对象，引入时候可以直接引入了