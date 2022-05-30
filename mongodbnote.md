# 数据库 （Database)
- 简介： 
        * 数据库是按照数据结构来组织，存储和管理数据的仓库
        * 我们的程序都是在内存中运行的，一旦程序运行结束或者计算机断电，程序运行中的数据都会丢失
        * 所以我们需要将一些程序运行的数据持久化到硬盘中，以确保数据的安全性，而数据库就是数据持久化的最佳选择
        * 说白了，数据库就是存储数据的仓库。
- 分类：
    1. 关系型数据库 (RDBMS)
        * MySQL,Oracle,SQL Server 等，关系型数据库中全都是表
    2. 非关系型数据库： (NoSQL) not only SQL
        * MongoDB, Redis 等，都是键值对数据库，文档数据库MongoDB
- MongoDB简介： 
    1. MongoDB 是为快速开发互联网Web应用而设计的数据库系统
    2. MongoDB 的设计目标是极简，灵活，作为Web应用栈的一部分
    3. MongoDB 的数据模型是面向文档的，所谓文档是一种类似于JSON的结构，简单理解，就是MongoDB这个数据库中存的都是各种各种的 JSON(BSON)
    4. MongoDB 的偶数版为稳定版，奇数版为开发版；
    5. 安装MongoDB
        1. 安装
        2. 配置环境变量： 
            - 找到安装目录，找到 bin 文件所在路径： C:\Program Files\MongoDB\Server\5.0\bin 
            - 在计算机属性高级设置里添加path 环境变量，将上面路径写入。
            - 打开命令行窗口： 输入： mongo 
            - 在 C 盘根目录，创建一个文件夹 data, 在data 文件夹中，创建一个文件夹，叫 db，
            - 打开 cmd 窗口，输入 mongod 启动 mongodb 的服务器；
            - 再打开一个cmd  窗口，输入 mongo, 如果显示： connecting to :test 就表示已经连接成功; 
            - 可以通过 dbpath 指定数据库的路径和监听端口 例如： $ mongod --dbpath "数据库路径地址" --port 端口号
    6. 数据库（database)
        1. 数据库的服务器
            - 服务器用来保存数据
            - mongod 用来启动服务器， 打开后尽量不要关闭。
        2. 数据库的客户端
            - 客户端用来操作服务器，对数据库进行增删改查；
            - mongo 用来启动客户端
        3. 将 mongoDB 设置为系统服务，可以自动在后台启动，不用每次手动启动；（可选项）
            1. 在C盘根目录创建目录：mkdir c/data/db; 和 mkdir /data/log 在C盘根目录的data文件夹下创建两个子文件夹： db 和 log
            2. 创建一个配置文件：
                    * 一直找到mongoDB 安装文件的 bin 文件夹下： C:\Program Files\MongoDB\Server\5.0
                    * 桌面创建一个新的.txt 文件，重命名为：mongod.cfg， 然后剪切复制到上面路径下，和bin文件夹同级目录；mongod.cfg内容网上有
            3. 以管理员的身份打开命令行窗口： cmd 右键 以管理员身份
            4. 执行如下命令：
                 sc.exe create MongoDB binPath = "\"C:\Program Files\MongoDB\Server\5.0\bin\mongod.exe\" --service --config=\"C:\Program Files\MongoDB\Server\5.0\mongod.cfg\"" DisplayName = "MongoDB" start = "auto"
            5. 启动mongodb 服务，在任务管理器的服务项，看看window后台有没有运行mongoDB
            6. 如果启动失败，证明上面操作有误，在控制台输入： sc delete MongoDB, 然后从第一步重新配置；
- MongoDB 基本操作：
    1. 基本概念
        -  数据库（database)
             数据库是个仓库，用来存放集合
        - 集合 (collection)
             集合类似于数组，在集合中可以存放文档
        - 文档 (document)
             文档是数据库中最小的单位，存储和操作的内容都是文档；
             在 mongoDB中，我们的数据库和集合都不需要我们手动创建；
             当我们创建文档时，如果文档所在的集合或数据库不存在，则自动创建；
    2. 基本操作：
        - show dbs ； 显示当前的所有数据库
        - use 数据库名称 : 进入到指定的数据库中； 即使没有，也可以进入目录下，当文档插入时候，数据库自动创建，
        - db : 显示当前所在的数据库名称； 
        - show collections : 显示数据库里所有的集合；
    3. 数据库的CRUD操作：增删改查
        - 增加：向数据库中插入文档：
            db.<collection名>.insert(doc) ：向集合中插入文档；中间的是collection名
            例如： 向 test 数据库的 student 结合中 添加新的学生对象：{“name”:"liyi","age":"28"}
             需要首先进入test 数据库： use test
             然后输入： db.student.insert({“name”:"liyi","age":"28"}) // 这样顺带这把数据库 test 和 集合 students就都一起创建好了。。
        - 查询当前集合中的所有文档： 
           db.<collection名>.find() 
           例如: 查找上面刚创建的students 集合里的文档： 
             进入到指定数据库 test
             db.students.find() // 输出：{ "_id" : ObjectId("62943b9319b3a2444290c003"), "name" : "liyi", "age" : 28 }

        - 图形化工具： MongoDB compass ，可以增删改查数据库，集合和文档; 
             1. 当我们向集合中插入文档时候，如果没有给文档指定 _id属性，则数据库会自动为文档添加，该属性用来作为文档的唯一标识。 根据时间戳和机器猫生成的，确保唯一性。
             2. _id 属性也可以自己指定，如果自己指定了，数据库就不会再添加了，如果自己指定，也要必须确保文档的唯一性； 建议数据库生成。 
                 data.<collection>.find({"name":"liyi"}).count() 寻找名字叫liyi 的人并返回个数
             3. 修改： 
                    db.students.find()
                    db.<collection>.update(查询条件，更改内容) ： update 默认情况会使用新对象替换旧对象， 如果需要修改指定属性，而不是替换，需要使用“修改操作符”  {$set:{}} 可以用来修改文档中的指定属性。 update()默认情况只改一个，会把查询到的复合条件的第一个文档修改；
                    db.students.update({"name":"liyi"},{$set:{"age":18，“city":"toronto"}}) 选中名为liyi的文档，将年龄属性改为18，添加地址属性：多伦多
                    同理： unset() 可以删除属性；
                    db.<collection>.updateMany() 同时修改多个复合条件的文档；
                    db.<collection>.updateOne() 修改一个复合条件的文档
              4. 删除文档： 
                   db.<collection>.remove() // 可以根据条件删除文档，参数传入方式和 find() 一样,默认情况会删除多个；如果remove 第二个参数传入 true, 则只会删除一个；如果只传递一个空对象做参数，则会清空集合，删除所有文档；类似于直接删除文档： db.<collection>.drop()
                   db.<collection>.deleteOne()
                   db.<collection>.deleteMany()
                   db.<collectioni>.drop() 删除集合
                   db.dropDatebase() 删除数据库
                   一般数据库中的数据不会被删除，方法很少调用；一般会在数据中添加字段，表示数据是否被删除；字段属性： {isDeleted:0}
              5. MongoDB 支持直接通过内嵌文档的属性进行查询： 如果要查询内嵌文档，可以通过. 的形式匹配，如果要通过内嵌文档对文档查询，此时属性名必须使用引号；
                      db.users.fin({"hobby.movies":"hero"}) 就是 在集合user 里找，内嵌文档hoppy里电影属性值是或者数组元素离有 hero 的文档；
                       数组修改符： {$push:{a:1}}
                       db.numbers.find({num:{$gte:500，$lt:800}}) 找num值大于等于500小于800的文档：$gt: 大于  $gte: 大于等于 $lt: 小于 $lte:小于等于 $eq: 等于
                       db.numbers.find().limit(10) 显示搜寻到的结果的前十条；
                       db.numbers.find().skip(10).limit(10) 搜寻第11-20条数据，skip()是跳过多少个。实际上skip 类似于页码 1,2,3,4。。。
        - 文档之间的关系：
            1. 一对一 one to one
                - 例如： 夫妻
                - 在MongoDB中，可以通过内嵌文档的形式来体现一对一的关系；
                   db.couple.insert{
                       [
                           {
                               name:"黄蓉"，
                               husband:{
                                   name:"郭靖“
                               }
                           }，
                           {
                               name:"小龙女"，
                               husband:{
                                   name:"杨过"
                               }
                           }，
                       ]

                   }

            2. 一对多 或者多对一 (最常见)
                例如：父母和孩子；用户和订单；文章和评论；
                - 可以通过内嵌文档，来映射一对多关系；就是内嵌文档变成一个数组；
                - 第二种一对多映射方法:用户 （user) 和 订单 （orders） 可以在orders集合的每个文档里里添加一个属性 user_id: 来连接到 users集合，
                  因为users 集合有数据库自己生成的唯一的 _id，两个集合的文档就都包含一个相同属性： _id;

                  let user_id = db.users.findOne({username:"swk"})._id
                  db.orders.find({user_id:user_id})
               
            3. 多对多
               例如： 分类和商品； 老师和学生； 体现一对多关系，可以在学生集合里每个学生文档下添加一个teachers_id 属性，该属性值是个数组，数组里的元素是对应的多个老师的 _id; 这样就实现了多对多关系；
               增删改查可以查文档函数；
               查询文档时候，默认是根据_id 查询排列；
            4.  排序： .sort() 指定排序规则， 需要传递一个对象指定排序规则，1 是升序，-1 是降序 ；
                db.emp.find({}).sort({salary：1})  就是将员工表按照工资从低到高排序；
                db.emp.find({}).sort({salary：1，empno:-1})  就是将员工表按照工资从低到高,员工号从高到低排序；
                limit, skip, 和 sort 可以以任意顺序调用；
                在查询时，可以在第二个参数里设置查询结果的投影： 
                db.emp.find({},{ename:1}) 这样就会查询所有员工，并只显示员工的id 和姓名  .find({},{}) 传递了两个参数，第二个参数是个映射，可以用来只显示某些属性；
           

    - Mongoose：
        - 简介
            1. 之前我们都是通过shell 来完成对数据库各种操作的，在开发中大部分时候我们都需要通过程序来完成对数据库的操作
            2. 而 mongoose 就是一个让我们可以通过 node 来操作 mongoDB的模块
            3. mongoose 是一个对象文档模型（ODM)库，它对Node原生的mongoDB进行了进一步的优化封装，并提供了更多的功能。
            4. 在大多数情况下，它被用来把结构化的模式应用到一个MongoDB集合，并提供了验证和类型转换等好处；
        - 好处
            1. 可以为文档创建一个模式结构 （Schema)，类似于一种约束；
            2. 可以对模型中的对象/文档进行验证
            3. 数据可以通过类型转换转换为对象模型
            4. 可以使用中间件来应用业务逻辑挂钩
            5. 比 node 原生的 MongoDB 驱动更容易；
        - 新的对象
            1. Schema(模式对象)
                - Schema 对象定义约束了数据库中的文档结构
            2. Model
                - Model 对象作为集合中的所有文档的标识，相当于 MongoDB数据库中的集合 collection
            3. Document
                - Document 表示集合中的具体文档，相当于集合中的一个具体文档；
        -  

           
                               