//contact collection

const mongoose = require("../db");
// mongoose.set('useFindAndModify', false);

const ContactSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true, //must have firstName
  },
  lastName: {
    type: String,
  },
  occupation: String,
  email: {
    type: String,
  },
  phone: String,
  tag: [],
  description: String,
  searchInfo: String,
  belongsWho: String
});

const Contact = mongoose.model("contact", ContactSchema);

module.exports = Contact;
