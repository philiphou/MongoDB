const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/mongoose_test')

const Schema = mongoose.Schema;

const stuSchema = new Schema({
    name: String,
    age: Number,
    gender: {
        type: String,
        default: "female"
    },
    address: String
})

const StuModel = mongoose.model('Student', stuSchema)

/*
  - 有了上面的 Model, 我们就可以对数据库进行增删改查了： 
    1. Model.create(docs,callback)
        用来创建一个或者多个文档，并添加到数据库中 参数 1. 文档对象或者文档对象数组（数组里有多个文档对象） 2. 回调函数，操作完成后调用，可选传入

*/

StuModel.create([{
    name: 'jack',
    age: 30,
    gender: 'male',
    address: 'regina'
}, {
    name: 'dave',
    age: 25,
    address: "bc"
}], (err) => {
    if (!err) {
        console.log("文档创建完毕成功")
    }
})

/* 
2. Model 查询方法：
    - Model.find(conditions,[projection],[options],[callback]) 
       conditions: 查询条件对象；
        projection: 投影（可以设置自己想要的字段） 
            - 传递方式1： {name:1,_id:0}
            - 传递方式2： “name -_id”
       options: 查询选项（skip,limit) 例如：{skip:3,limit:2} 表示跳过3个，只选查询到的前2个
       callback: 回调函数，回调函数必须传，因为回调函数返回查询结果。，
        回调函数总会返回一个数组，即便查不到也会返回一个空数组；
    - Model.findById(id,[projection],[options],[callback])
    - Model.findOne(conditions,[projection],[options],[callback]） 查询第一个复合条件的文档
    - 通过find()查询的结果，返回的对象就是document 对象，文档对象； 文档就是Model的实例

*/

StuModel.find({ name: "jack" }, function(err, docs) {
    if (!err) {
        console.log(docs) // 输出：一个数组，数组元素是查询结果，各个文档。
        console.log(docs[0].name) // 输出：jack
    }
})

/*
 3. Model 方法去改：
    
     - Model.updateMany(conditions,doc,[options],[callback])
     - Model.updateOne(conditions,doc,[options],[callback])
     - 参数： 
        conditions: 查询条件
        doc:修改后的对象
        options： 配置参数
        callback: 回调函数
    - Model.replaceOne(conditions,doc,[options],[callback])

 */

//  修改Jack的年龄为18

StuModel.updateOne({ name: "jack" }, { $set: { age: 18 } }, function(err) {
    if (!err) {
        console.log("年龄修改成功")
    }

})

/* 
4. Model 删除功能
    Model.remove()
    Model.deleteOne()
    Model.deleteMany()

*/

StuModel.deleteMany({ name: "jack" }, (err) => {
    if (!err) console.log('删除成功')
})

//  查询文档个数

StuModel.count({}, (err, count) => {
        if (!err) {
            console.log(count)
        }
    }) // 不传任何条件，去计数所有的文档