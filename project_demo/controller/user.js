const User = require("../db/models/User");

const checkDb = async (email) => {
  const data = await User.find({
    // username: req.body.username,
    // password: req.body.password,
    email: email,
  });
  // console.log(data);
  return data;
};

const addInDb = async (username, password, email) => {
  //创建用户
  const userdata = await User.create({
    username: username,
    password: password,
    email: email,
  });
  //   console.log(userdata);
};

const checkDupl = async (username, email) => {
  const nameData = await User.findOne({
    username: username,
  });
  const emailData = await User.findOne({
    email: email,
  });

  if (nameData !== null || emailData !== null) {
    return true
  }
  // console.log(data);
  return false;
};

module.exports = {
  checkDb,
  addInDb,
  checkDupl,
};
