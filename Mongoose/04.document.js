/*
1. document 就是集合里的文档，也是 Model 的实例，通过 Model 查询到的结果都是 document

*/

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

// 创建一个 document

var stu = new StuModel({
    name: "swk",
    age: 500,
    gender: "male",
    address: "china"
})
console.log(stu)
    // 将创建的 stu 插入到集合（stuModel)

stu.save((err) => {
        console.log('stu保存成功')
    }) // 调用document 的 。save() 方法，这样新建的 stu 这个实例document就会被保存到集合（stuModel)里，

/*
   document 的方法： 
1. <document>.update(update,[options],[callback])
    修改对象： doc.update({$set:{age:555}},function(err){})  此处不用传入条件，因为就是修改doc自己本身属性；或者直接：doc.age = 555
2. doc.remove() 删除自己， 可以传递一个回调函数 doc.remove(function(err){if(!err){console.log('删除成功’)}})
3. doc.get(name) 获取文档中的属性值，此处是获取文档中name 的值， 也可以直接： doc.name 获取， 因为 doc 是个对象，name 是其属性；
4.  doc.set("name","skw2") 就是将 name 属性值，改为 swk2; 也可以直接：doc.name = "skw2"
5. doc.id 或者 doc._id 都是获取当前文档的 id 值
6. doc.toJSON() 将自己转换为一个 JSON对象；
7. doc.toObject() 将自己转换为一个 普通的Object对象；转换成js里的对象后，前面所有的 doc 方法就都不适用了。
 

* /