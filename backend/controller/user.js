const User = require("../db/models/User");

// check whehther a user is in the database using email
const checkDb = async (email) => {
  const data = await User.find({
    // username: req.body.username,
    // password: req.botedy.password,
    email: email,
  });
  // console.log(data);
  return data;
};

// check whether a user's in the database using username and password
const findUser = async (username, password) => {
  const data = await User.findOne({
    username: username,
    password: password,
  });
  // console.log(data);
  return data;
};

// add user into database
const addInDb = async (username, password, email) => {
  // create user
  const userdata = await User.create({
    username: username,
    password: password,
    email: email,
  });
  //   console.log(userdata);
};

// check whether a user using duplicate username and email to register
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

// change the password using email verfication
const changePassword = async (email, password) => {
  const userData = await User.findOneAndUpdate({
    email: email
  }, {
    $set: {
      password: password
    }
  })
  return userData;
};

module.exports = {
  checkDb,
  addInDb,
  checkDupl,
  findUser,
  changePassword
};
