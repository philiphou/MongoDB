/*
1.引入mongoose 并连接数据库
*/

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/mongoose_test')
mongoose.connection.once("open", () => {
    console.log("数据库已经连接成功")
})

//  2. 创建 Schema对象（模式对象）约束

var Schema = mongoose.Schema // 将 mongoose.Schema 这个属性方法赋值给 Schema, 其可作为一个构造函数用来配置新的 Schema;

//  3. 创建 Schema 实例对象，构造函数里的参数是一个对象，该对象就是各种约束；复杂约束可以使用对象传入，比如gender, 设置默认值是“female"

var stuSchema = new Schema({
        name: String,
        age: Number,
        gender: {
            type: String,
            default: "female"
        },
        address: String
    })
    //4. 通过Schema创建我们的model,model类似于数据库中的 collection 集合； 通过model才可以操作数据库,语法： mongoose.model(modelName,schema)
    // Model 可以看作是一个构造函数，可以去创建文档document 实例的，下面我们创建一个Model, 
    //    modelName: 就是我们所创造的（映射的）集合的名字；Mongoose 会自动将集合名变成复数
    //  创建一个模型对象需要传入的参数：1.集合名字 2. 对这个集合的约束对象 Schema
const StuModel = mongoose.model('student', stuSchema)
    // 5. 通过 Model 创建文档；向数据库中插入文档: StuModel.create(doc,function(err){}) 需要两个参数，1. 插入文档内容，2. 回调函数

StuModel.create({
    name: 'philip',
    age: 35,
    gender: "male",
    address: 'toronto'
}, (err) => {
    if (!err) {
        console.log('文档创建成功')
    }
})