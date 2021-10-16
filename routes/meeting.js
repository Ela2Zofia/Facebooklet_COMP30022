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
    
    if (belongsWho == ""){
      res.json()
    }else{
      res.json(data);
    }
    for (let i = 0; i < data.participants.length; i++){
      let greating = "Dear " + data.participants[i].lastName + " " + data.participants[i].firstName + "\n\n"
       + belongsWho + " has invited you to a meeting! " + "Please remember to attend the meeting " + data.link + " in " + data.time + " at " + data.date + ".\n\n" + "Your meeting number is "+data.meetingNumber+"\n"+"Your Password is "+data.password+"\n"+"decription: " + data.participants[i].description;
       var mailOptions = {
        from: "itprojectexample@outlook.com",
        to: data.participants[i].email,
        subject: "face-booklet meeting notification",
        text: greating,
      };
      await transporter.sendMail(mailOptions);
    }
    return;
})

// update meeting information
router.put("/:id", async (req, res, next) => {
    await updateMeeting(req.params.id, req.body);
    res.status(200).send();
    meeting = await findMeeting(req.params.id);
    for (let i = 0; i < meeting.participants.length; i++){
      let greating = "Dear " + meeting.participants[i].lastName + " " + meeting.participants[i].firstName + "\n\n"
       + "Your Meeting " + meeting.meetingNumber + " with link " + meeting.link + " in " + meeting.time + " at " + meeting.date + " has been updated" + ".\n\n"+ "Your meeting number is "+meeting.meetingNumber+"\n" + "Your Password is "+meeting.password+"\n"+"decription: " + meeting.participants[i].description;
      var mailOptions = {
        from: "itprojectexample@outlook.com",
        to: meeting.participants[i].email,
        subject: "face-booklet meeting notification",
        text: greating,
      };
      await transporter.sendMail(mailOptions);
    }
  });
  
// delete chosen meeting
router.delete("/:id", async (req, res, next) => {
    const id = req.params.id;
    
    res.status(200).send();
    meeting = await findMeeting(id);
    await delMeeting(id);
    for (let i = 0; i < meeting.participants.length; i++){
      let greating = "Dear " + meeting.participants[i].lastName + " " + meeting.participants[i].firstName + "\n\n"
       + "Your Meeting " + meeting.meetingNumber + " with link " + meeting.link + " in " + meeting.time + " at " + meeting.date + " has been deleted" + ".\n\n" + "Your meeting number is "+meeting.meetingNumber+"\n"+"Your Password is "+meeting.password+"\n"+"decription: " + meeting.participants[i].description;
      var mailOptions = {
        from: "itprojectexample@outlook.com",
        to: meeting.participants[i].email,
        subject: "face-booklet meeting notification",
        text: greating,
      };
      await transporter.sendMail(mailOptions);
    }
    
    
});
  
module.exports = router;
