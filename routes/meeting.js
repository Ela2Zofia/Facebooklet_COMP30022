var express = require("express");
var router = express.Router();

const {
    getList,
    newMeeting,
    updateMeeting,
    delMeeting,
  } = require("../controller/meeting")


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
    res.json(data);
    return;
})

// update meeting information
router.put("/:id", async (req, res, next) => {
    await updateMeeting(req.body._id, req.body);
    res.status(200).send();
  });
  
// delete chosen meeting
router.delete("/:id", async (req, res, next) => {
    const id = req.url.split("/")[2];
    await delMeeting(id);
    res.status(200).send();
});
  
module.exports = router;