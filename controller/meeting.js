const Meeting = require("../db/models/Meeting");

// search the database and get the meeting list
const getList = async (userName) => {
    //fuzzy search
    const whereOpt = {};
    if (userName) {
      whereOpt.belongsWho = userName;
    }
    //a list of meeting that the USER has, sorted by topic in alphabetical order (A-Z a-z)
    const list = await Meeting.find(whereOpt).sort({
      topic: 1,
    });
    return list;
  };

// add new meeting according its structure
const newMeeting = async (userName, meetingData = {}) => {
    const topic = meetingData.topic;
    const meetingNumber = meetingData.meetingNumber;
    const password = meetingData.password;
    const link = meetingData.link;
    const date = meetingData.date;
    const time = meetingData.time;
    const duration = meetingData.duration;
    const participants = meetingData.participants;
    const description = meetingData.description;
    const belongsWho = userName;
  
    const meeting = await Meeting.create({
        topic,
        meetingNumber,
        password,
        link,
        date,
        time,
        duration,
        participants,
        description,
        belongsWho,
    });

    return meeting;
};

// update meeting information
const updateMeeting = async (id, meetingData = {}) => {
    const topic = meetingData.topic;
    const meetingNumber = meetingData.meetingNumber;
    const password = meetingData.password;
    const link = meetingData.link;
    const date = meetingData.date;
    const time = meetingData.time;
    const duration = meetingData.duration;
    const participants = meetingData.participants;
    const description = meetingData.description;
  
    const meeting = await Meeting.findOneAndUpdate(
      { _id: id },
      {
        topic,
        meetingNumber,
        password,
        link,
        date,
        time,
        duration,
        participants,
        description,
      },
      { new: true }
    );
  
    if (meeting == null) {
      return false;
    }
    return true;
};
  
//delete chosen contact
const delMeeting = async (id) => {
    const contact = await Meeting.findOneAndDelete({
      _id: id,
    });
};

const findMeeting = async (id) => {
    const meeting = await Meeting.findById({
      _id: id,
    });
    return meeting;
};

module.exports = {
    getList,
    newMeeting,
    updateMeeting,
    delMeeting,
    findMeeting,
};