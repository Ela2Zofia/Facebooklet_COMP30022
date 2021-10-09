const express = require("express");
const app = express();
const path = require('path');

//import router-su
const contactRouter = require("./routes/contact");
const meetingRouter = require("./routes/meeting");

var bodyParser = require("body-parser");
var md5 = require("md5-node");
var nodemailer = require("nodemailer");
var code_dictonary = {};
var transporter = nodemailer.createTransport({
  service: "Outlook",
  auth: {
    user: "itprojectexample@outlook.com",
    pass: "COMP30022",
  },
});
// middleware which uses for receiving post request
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
const { findUser, checkDb, addInDb, checkDupl, changePassword } = require("./controller/user");
const { db } = require("./db/models/User");


// // middleware of connecting frontend and backend
// app.use(function (req, res, next) {
//   // Website you wish to allow to connect
//   res.setHeader("Access-Control-Allow-Origin", "*");

//   // Request methods you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );

//   // Request headers you wish to allow
//   res.setHeader("Access-Control-Allow-Headers", "*");

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader("Access-Control-Allow-Credentials", true);

//   // Pass to next layer of middleware
//   next();
// });



// login request
app.post("/api/login", async (request, response) => {
  console.log("Recieved login");
  var username = request.body.username;
  var password = md5(request.body.password);
  // const back = JSON.stringify({ isCorrect: true });
  //   response.send(back);
  const data = await findUser(username, password);
  if (data) {
    /*
    console.log("user found!: ", data.username);
    //set session
    request.session.username = data.username;
    console.log(request.session.username);*/
    response.json({ isCorrect: true });
    return;
  }
  response.json(false);
  console.log("user is not found!");
});

// user registers their account
app.post("/api/register", async function (req, res) {
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  console.log(password);
  const back = JSON.stringify({ isCorrect: true });

  // check duplicatin username and email in the database
  const result = await checkDupl(username, email);
  // console.log(data);
  if (result) {
    return res.send(false);
  }else{
    res.send(back);
  }
  var mailOptions = {
    from: "itprojectexample.com",
    to: email,
    subject: "Your Password",
    text: password,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      // res.send(error);
    } else {
      console.log("Email sent!");
      // res.send(back);
    }
  });
  addInDb(username, md5(password), email);
});

// forgot password function
app.post("/api/forgot", async function (req, res) {
  var email = req.body.email;
  const back = JSON.stringify({ isCorrect: true });
  const data = await checkDb(email);
  let text = "";
  const randomNumber = Math.floor(Math.random() * 999999999) + 10000000;
  if (data.length !== 0) {
    for (let index = 0; index < data.length; index++) {
      text += data[index].username;
    }
    var mailOptions = {
      from: "itprojectexample@outlook.com",
      to: email,
      subject: text.concat(": Your verification code"),
      text: randomNumber.toString(),
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.send(error);
      } else {
        console.log("Email sent!");
        res.send(back);
      }
    })
    code_dictonary[email] = randomNumber;
  }else{
    res.send(false);
    console.log("Email address is not found!");
  }
});

// reset the password after the user's verification
app.post("/api/reset", async function (req, res) {
  var email = req.body.email;
  var password = md5(req.body.password);
  var code = req.body.code;
  var verfication_code = code_dictonary[email];
  const back = JSON.stringify({ isCorrect: true });
  // if the verfication code is correct
  if(code == verfication_code){
    // change the user's old password
    delete code_dictonary[email];
    const result = await changePassword(email, password);
    // if the password changed successfully
    if (result) {
      res.send(back);
    }else {
      res.send(false);
    }
  } else {
    res.send(false);
  }
})

//register route
app.use("/api/contacts", contactRouter);

// meeting page
app.use("/api/meetings", meetingRouter);

app.use(express.static(path.join(__dirname, '/Frontend/build')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/Frontend/build', 'index.html'));
});

app.listen(process.env.PORT || 8000, () => {
  console.log("The server is ON, port " + `${process.env.PORT || 8000}` + " is listening");
});
