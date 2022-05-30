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



           
                               