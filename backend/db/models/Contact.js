//对应contact集合

const mongoose = require("../db");
// mongoose.set('useFindAndModify', false);

const ContactSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true, //这个是必须得有的
  },
  lastName: {
    type: String,
    required: true, //这个是必须得有的
  },
  occupation: String,
  email: {
    type: String,
    required: true, //这个是必须得有的
    unique: true, //唯一，不重复
  },
  phone: String,
  tag: String,
  description: String,
});

const Contact = mongoose.model("contact", ContactSchema);

module.exports = Contact;
