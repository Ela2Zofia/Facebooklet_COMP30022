var express = require("express");
var router = express.Router();

//test
// router.get("/contacts", function (req, res, next) {
//   res.json({
//     errno: 0,
//     data: [1, 2, 3],
//   });
// });

const { newContact } = require("../controller/contact");
const { SuccessModel } = require("../model/resModel");
//导出来直接是个函数，所以不用大括号{}
const loginCheck = require("../middleware/loginCheck");

// router.get("/contacts", async (req, res, next) => {
//   let contact = req.query.contact || "";
//   const keyword = req.query.keyword || "";

//   // if (req.query.contacts) {
//   //   // 管理员界面
//   //   if (req.session.username == null) {
//   //     //未登录
//   //     res.json(new ErrorModel("未登陆"));
//   //     return;
//   //   }
//   //   // 强制查询自己的博客
//   //   // contact = req.session.username;
//   // }

//   const listData = await getList(contact, keyword);
//   // return result.then((listData) => {
//   //   res.json(new SuccessModel(listData));
//   // });
//   console.log(new SuccessModel(listData));
//   res.json(new SuccessModel(listData));
//   return;
// });

router.post("/contacts", async (req, res, next) => {
  console.log("a");
  req.body.author = req.session.username;
  const data = await newContact(req.body);
  console.log(data);
  res.json(new SuccessModel(data));
  return;

  // req.body.author = req.session.username;
  // const result = newBlog(req.body);
  // return result.then(data=>{
  //   res.json(new SuccessModel(data));
  // });
});

// // router.put("/update", loginCheck, async (req, res, next) => {
// //   const val = await updateBlog(req.query.id, req.body);
// //   if (val) {
// //     res.json(new SuccessModel(val));
// //     return;
// //   } else {
// //     res.json(new ErrorModel("更新联系人失败"));
// //   }
// // });

// // router.delete("/del", loginCheck, async (req, res, next) => {
// //   const author = req.session.username;
// //   const val = await delBlog(req.query.id, author);
// //   console.log(val);
// //   if (val) {
// //     res.json(new SuccessModel(val));
// //     return;
// //   } else {
// //     res.json(new ErrorModel("删除联系人失败"));
// //   }
// // });

module.exports = router;
