const express = require("express");
const app = express();

//引入redis-su
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
// const { SuccessModel, ErrorModel } = require("./model/resModel");

//把路由引用过来-su
const contactRouter = require("./routes/contact");

var bodyParser = require("body-parser");
var md5 = require("md5-node");
var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "itprojectexample@gmail.com",
    pass: "COMP30022",
  },
});
// 配置 body-parser 中间件（插件，专门用来解析表单 POST 请求体）
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
const { findUser, checkDb, addInDb, checkDupl } = require("./controller/user");


//使用redis存储数据-su
const redisClient = require("./db/redis");
const sessionStore = new RedisStore({
  client: redisClient,
});
app.use(
  session({
    secret: "WJiol#23123_",
    cookie: {
      // path: '/', //默认配置
      // httpOnly: true, //默认配置
      //cookie在24小时后失效
      maxAge: 24 * 60 * 60 * 1000,
    },
    store: sessionStore,
  })
);

// michael's code
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers", "*");

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.post("/login", async (request, response) => {
  var username = request.body.username;
  var password = md5(request.body.password);
  const back = JSON.stringify({ isCorrect: true });
  //   response.send(back);
  const data = await findUser(username, password);
  if (data) {
    console.log("user found!");
    //设置session
    request.session.username = data.username;
    console.log(request.session.username);
    return response.send(back);
  }
  response.send(false);
  console.log("user is not found!");
});

app.post("/register", async function (req, res) {
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  console.log(password);
  const back = JSON.stringify({ isCorrect: true });

  //再查一下有没有重名和重复邮箱的
  const result = await checkDupl(username, email);
  // console.log(data);
  if (result) {
    return res.send(false);
  }
  var mailOptions = {
    from: "itprojectexample.com",
    to: email,
    subject: "Your Password",
    text: password,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.send(error);
    } else {
      console.log("Email sent!");
      res.send(back);
    }
  });
  addInDb(username, md5(password), email);
});

app.post("/forgot", async function (req, res) {
  var email = req.body.email;
  const back = JSON.stringify({ isCorrect: true });
  const data = await checkDb(email);
  const randomNumber = Math.floor(Math.random() * 999999999) + 10000000;
  if (data.length !== 0) {
    var mailOptions = {
      from: "itprojectexample.com",
      to: email,
      subject: "Your verification code",
      text: randomNumber.toString(),
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.send(error);
      } else {
        console.log("Email sent!");
        res.send(back);
      }
    });
    //rederict
  } else {
    res.send(false);
    console.log("Email address is not found!");
  }
});


//注册路由-su
app.use("/", contactRouter);

app.listen(8000, () => {
  console.log("The server is ON, port 8000 is listening");
});
