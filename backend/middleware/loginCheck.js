const { ErrorModel } = require("../model/resModel");

module.exports = (req, res, next) => {
  console.log("login-check");
  console.log(req.session.username);
  if (req.session.username) {
    console.log(req.session.username);
    next();
    return;
  }
  res.json(new ErrorModel("未登陆"));
};
