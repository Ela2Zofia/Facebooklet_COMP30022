var express = require("express");
var router = express.Router();
var nodemailer = require('nodemailer');

const {
    getList,
    newMeeting,
    updateMeeting,
    delMeeting,
  } = require("../controller/meeting")

var transporter = nodemailer.createTransport({
  service: "Outlook",
  auth: {
    user: "itprojectexample@outlook.com",
    pass: "COMP30022",
  },
});

// get meeting list and its page
router.get("/", async (req, res, next) => {
    let belongsWho = req.headers.user || "";
    //get the contact list
    const listData = await getList(belongsWho);
    res.json(listData);
    return;
});

// add new meeting
router.post("/", async (req, res, next) => {
    const belongsWho = req.headers.user;
    const data = await newMeeting(belongsWho, req.body);
    let greating = "Dear " + data.participants[0].lastName + " " + data.participants[0].firstName + "\n\n" + belongsWho + " has invited you to meeting! " + "Please remember to attend the meeting " + data.link + " in " + data.time + " at " + data.date + ".\n\n" + "decription: " + data.participants[0].description;
    var mailOptions = {
      from: "itprojectexample@outlook.com",
      to: data.participants[0].email,
      subject: data.topic,
      text: greating,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.send(error);
      } else {
        console.log("Email sent!");
        res.send(back);
      }
    });
    if (belongsWho == ""){
      res.json()
    }else{
      res.json(data);
    }
    return;
})

// update meeting information
router.put("/:id", async (req, res, next) => {
    await updateMeeting(req.params.id, req.body);
    res.status(200).send();
  });
  
// delete chosen meeting
router.delete("/:id", async (req, res, next) => {
    const id = req.params.id;
    await delMeeting(id);
    res.status(200).send();
});
  
module.exports = router;