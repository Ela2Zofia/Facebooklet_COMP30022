const express = require('express');
var app = new express(); // 实例化express
// 用来获取post数据
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//数据库操作
var MongoClient = require('mongodb').MongoClient;
const { ConnectionClosedEvent } = require('mongodb');
var dbUrl = 'mongodb://localhost:27017/project_demo'; // 连接数据库
var md5 = require('md5-node'); // 加密模块
var session = require('express-session');

// 使用ejs模板引擎
app.set('view engine', 'ejs');
// 配置public为我们的静态资源目录
app.use(express.static('public'));
// 保存登录过的用户
app.use(session({ // 配置中间件
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge:1000*60*30
    },
    rolling: true //每次操作刷新cookie
  }))
// 自定义中间件，判断登陆状态
app.use(function(req, res, next) {
    // 判断路由，除了login和dologin之外不需要跳转
    if (req.url == '/login' || req.url == '/dologin') {
        next();
    } else {
        // 除了login和dologin界面 都要判断是否存在session
        if (req.session.userinfo && req.session.userinfo.username != "") {
            //ejs中 设置全局变量，所有页面可以使用
            app.locals['userinfo'] = req.session.userinfo; 
            next();
        } else {
            // 如果没登陆就跳转登陆页面
            res.redirect('/login');
        }
    }
})



// 默认页面 直接额跳转登陆页面
app.get('/', function(req, res) {
    res.redirect('/login');
})

// 登陆路由
app.get('/login', function(req, res) {
    res.render('login');
})

// 获取登陆提交的表单
app.post('/dologin', function(req, res) {
    var username = req.body.username;
    var password = md5(req.body.password); // 用md5加密
    // 1. 获取数据
    // 2. 连接数据库，对比数据
    MongoClient.connect(dbUrl, function(err, db) {
        if (err) {
            console.log(err);
            return;
        }
        // 在数据库查询数据
        const mydb = db.db('project_demo');
        var result = mydb.collection('user').find({
            username: username,
            password: password
        });
        result.toArray(function(error, data) {
            if (error) {
                console.log(error);
            } else {
                // 查到数据
                if (data.length > 0) {
                    console.log("登陆成功");
                    // 保存用户信息, 也就是zexuh
                    req.session.userinfo = data[0]; //
                    res.redirect("/product"); //登陆成功跳转到主页
                } else{
                    // console.log("登陆失败");
                    // 登陆失败弹出警告并且重新登陆
                    res.send("<script>alert('failed to login');location.href='/login'</script>");
                }
                db.close();
            }
        })
    })
})


app.get('/product', function(req, res) {
    
    /*res.render('xxx', {
        userinfo:req.session.userinfo
    });*/
    res.send('product列表');
    /*
    MongoClient.connect(dbUrl, function(err, db) {
        if (err) {
            console.log(err);
            return;
        }
        // 在数据库查询数据
        const mydb = db.db('project_demo');
        var result = mydb.collection('product').find( );
        result.toArray(function(error, data) {
            if (error) {
                console.log(error);
            }
            db.close();
            res.render('/product', {
                list: data, // 在html显示数据库的数据
            });
        })
    })*/
})

app.get('/productadd', function(req, res) {
    res.send('增加商品');
})

app.get('/productedit', function(req, res) {
    res.send('编辑商品');
})

app.get('/productdelete', function(req, res) {
    res.send('删除商品');
})

app.get('/logout', function(req, res) {
    res.session.destroy(function(error) {
        if (error) {
            console.log(error)
        } else {
            res.redirect('/login');
        }
    })
})


app.listen(3000, '127.0.0.1');