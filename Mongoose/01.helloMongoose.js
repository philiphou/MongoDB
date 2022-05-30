/*

1. 下载安装 mongoose： npm i mongoose --save
2. 在项目中引入 mongoose: var mongoose = require('mongoose')
3. 连接mongoDB ： mongoose.connect("mongodb://localhost/test",{useMongoClient:true})
   如果端口号是默认端口号：27017 则可以省略
   可以监听MongoDB数据库的连接状态： 
     -  在 mongoose对象中，有一个属性叫 connection, 该对象表示的就是数据库连接
     - 通过监听该对象的状态，可以来监听数据库的连接与断开；

    mongoose.connection.once("open",()=>{})

4. 断开数据库连接： (一般不需要)
   mongoose.disconnect()
   mongoDB 数据库一般情况下只需要连接一次，除非项目停止，一般连接不会断开；

*/

//  引入

const mongoose = require('mongoose')
    // 连接数据库：
mongoose.connect("mongodb://127.0.0.1/mongoose_test")
    //  监听连接成功事件
mongoose.connection.once("open", () => {
    console.log("数据库已经连接成功")
})

// 断开数据库连接

mongoose.disconnect()
mongoose.connection.once("close", () => {
    console.log("数据库已断开")
})