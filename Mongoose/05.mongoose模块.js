require('./tools/mongoose_connect')
const stuModel = require('./models/stuModel') // 引入模型

console.log(stuModel)

stuModel.find({}, (err, doc) => { if (!err) { console.log(doc) } })