// meeting collection

const mongoose = require("../db");

const MeetingSchema = mongoose.Schema({
  topic: {
    type: String,
  },
  meetingNumber: {
    type: String,
    required: true, // must have meeting number
  },
  link:{
    type: String,
    required: true, // must have meeting link
  },
  date: {
    type: String,
    required: true, // must have date
  },
  time: {
    type: String,
    required: true, // must have time
  },
  duration: {
    type: Number,
    required: true, // must have duration
  },
  participants: [{
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
  }],
  description: String,
  belongsWho: String
});

const Meeting = mongoose.model("meeting", MeetingSchema);

module.exports = Meeting;