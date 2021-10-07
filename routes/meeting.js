var express = require("express");
var router = express.Router();
var nodemailer = require('nodemailer');


const {
    getList,
    newMeeting,
    updateMeeting,
    delMeeting,
    findMeeting,
  } = require("../controller/meeting")

var transporter = nodemailer.createTransport({
  service: "Outlook",
  auth: {
    user: "itprojectexample@outlook.com",
    pass: "COMP30022",
  },
});



function sleep(ms) {
  var StartTime = new Date().getTime();
  while (new Date().getTime() < StartTime + ms);
}

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
    
    for (let i = 0; i < data.participants.length; i++){
      let greating = "Dear " + data.participants[i].lastName + " " + data.participants[i].firstName + "\n\n"
       + belongsWho + " has invited you to a meeting! " + "Please remember to attend the meeting " + data.link + " in " + data.time + " at " + data.date + ".\n\n" + "decription: " + data.participants[i].description;
       var mailOptions = {
        from: "itprojectexample@outlook.com",
        to: data.participants[i].email,
        subject: data.topic,
        text: greating,
      };
      await transporter.sendMail(mailOptions);
    }
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
    meeting = await findMeeting(req.params.id);
    for (let i = 0; i < meeting.participants.length; i++){
      let greating = "Dear " + meeting.participants[i].lastName + " " + meeting.participants[i].firstName + "\n\n"
       + "Your Meeting " + meeting.meetingNumber + " with link " + meeting.link + " in " + meeting.time + " at " + meeting.date + " has been updated" + ".\n\n" + "decription: " + meeting.participants[i].description;
      var mailOptions = {
        from: "itprojectexample@outlook.com",
        to: meeting.participants[i].email,
        subject: meeting.topic,
        text: greating,
      };
      await transporter.sendMail(mailOptions);
    }
    res.status(200).send();
  });
  
// delete chosen meeting
router.delete("/:id", async (req, res, next) => {
    const id = req.params.id;
    meeting = await findMeeting(id);
    for (let i = 0; i < meeting.participants.length; i++){
      let greating = "Dear " + meeting.participants[i].lastName + " " + meeting.participants[i].firstName + "\n\n"
       + "Your Meeting " + meeting.meetingNumber + " with link " + meeting.link + " in " + meeting.time + " at " + meeting.date + " has been deleted" + ".\n\n" + "decription: " + meeting.participants[i].description;
      var mailOptions = {
        from: "itprojectexample@outlook.com",
        to: meeting.participants[i].email,
        subject: meeting.topic,
        text: greating,
      };
      await transporter.sendMail(mailOptions);
    }
    await delMeeting(id);
    
    res.status(200).send();
});
  
module.exports = router;