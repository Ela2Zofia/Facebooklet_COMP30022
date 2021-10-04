const { json } = require("body-parser");
var express = require("express");
var router = express.Router();

//test
// router.get("/contacts", function (req, res, next) {
//   res.json({
//     errno: 0,
//     data: [1, 2, 3],
//   });
// });

const {
  getList,
  updateContact,
  newContact,
  delContact,
} = require("../controller/contact");

//get contact list, and implement the search function
router.get("/", async (req, res, next) => {
  let belongsWho = req.headers.user || "";
  // console.log(belongsWho);
  // get the search text
  const keyword = req.query.q || "";

  //get the contact list
  const listData = await getList(belongsWho, keyword);
  if(belongsWho === ""){
    res.json();
  }else{
    res.json(listData);
  }
  
  return;
});

// add new contact
router.post("/", async (req, res, next) => {
  const belongsWho = req.headers.user;
  const data = await newContact(belongsWho, req.body);
  res.json(data);
  return;
});

// update contact information
router.put("/:id", async (req, res, next) => {
  console.log(req.body._id);
  await updateContact(req.params.id, req.body);
  res.status(200).send();
});

//delete chosen contact
router.delete("/:id", async (req, res, next) => {
  
  const id = req.params.id;
  // console.log(id);
  await delContact(id);
  res.status(200).send();
});

module.exports = router;
