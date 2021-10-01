const Contact = require("../db/models/Contact");

const getList = async (userName,keyword) => {
  //Dynamic stitching query condition
  //fuzzy search
  const whereOpt = {};
  if (userName) {
    whereOpt.belongsWho = userName;
  }
  if (keyword) {
    whereOpt.searchInfo = { $regex: `${keyword}`, $options: "i" };
  }

  //a list of contacts that the USER has, sorted by firstName in alphabetical order (A-Z a-z)
  const list = await Contact.find(whereOpt).sort({
    firstName: 1,
  });
  return list;
};

//add new contact
const newContact = async (userName, contactData = {}) => {
  const firstName = contactData.firstName;
  const lastName = contactData.lastName;
  const occupation = contactData.occupation;
  const email = contactData.email;
  const phone = contactData.phone;
  const description = contactData.description;
  const tag = contactData.tag;
  const searchInfo = firstName + " " + lastName + " " + tag.join(",") + " " + occupation;
  const belongsWho = userName;

  const contact = await Contact.create({
    firstName,
    lastName,
    occupation,
    email,
    phone,
    tag,
    description,
    searchInfo,
    belongsWho,
  });

  console.log(contact);
  return contact;
};

// update contact information
const updateContact = async (id, contactData = {}) => {
  const firstName = contactData.firstName;
  const lastName = contactData.lastName;
  const occupation = contactData.occupation;
  const email = contactData.email;
  const phone = contactData.phone;
  const description = contactData.description;
  const tag = contactData.tag;
  const searchInfo = firstName + " " + lastName + " " + tag.join(",") + " " + occupation;

  const contact = await Contact.findOneAndUpdate(
    { _id: id },
    {
      firstName,
      lastName,
      occupation,
      email,
      phone,
      tag,
      description,
      searchInfo,
    },
    { new: true }
  );

  if (contact == null) {
    return false;
  }
  return true;
};

//delete chosen contact
const delContact = async (id) => {
  const contact = await Contact.findOneAndDelete({
    _id: id,
  });
};

// const searchContact = async (id) => {
//   const contact = await Contact.findOne({
//     _id: id,
//   });
//   console.log(contact);
//   if (contact == null) {
//     return false;
//   }
//   return true;
// };

module.exports = {
  getList,
  newContact,
  updateContact,
  delContact,
  // searchContact,
};
