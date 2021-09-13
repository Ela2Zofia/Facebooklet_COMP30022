const Contact = require("../db/models/Contact");

const getList = async (author, keyword) => {
    //动态拼接查询条件
    const whereOpt = {};
    if (author) {
      whereOpt.author = author;
    }
    if (keyword) {
      whereOpt.keyword = new RegExp(keyword);
    }
  
    //按照id逆序代表按照创建时间逆序
    const list = await Contact.find(whereOpt).sort({ _id: -1 });
    return list;
  };
  
  const getDetail = async (id) => {
    const blog = await Contact.findById(id);
  
    //创建时间的格式化
  
    return blog;
  };
  
  //blogData = {}代表如果blogData没有就给个空对象(ES6新语法)
  const newContact = async (contactData = {}) => {
    //blogData 是一个博客对象，包含title content 属性
  
    const firstName = contactData.firstName;
    const lastName = contactData.lastName;
    const occupation = contactData.Occupation;
    const email = contactData.email;
    const phone = contactData.phoneNumber;
    const description = contactData.description;
    const tag = contactData.tags;
  
    const contact = await Contact.create({
      firstName,
      lastName,
      occupation,
      email,
      phone,
      tag,
      description,
    });
  
    console.log(contact);
  
    return {
      id: contact._id,
    };
  };
  
  const updateBlog = async (id, blogData = {}) => {
    //id就是要更新博客的id
    //blogData 是一个博客对象，包含title content 属性
    const title = blogData.title;
    const content = blogData.content;
  
    const blog = await Contact.findOneAndUpdate(
      { _id: id },
      { title, content },
      { new: true }
    );
  
    if (blog == null) {
      return false;
    }
    return true;
  };
  
  const delBlog = async (id) => {
    const blog = await Contact.findOneAndDelete({
      _id: id,
    });
    console.log(blog);
    if (blog == null) {
      return false;
    }
    return true;
  };
  
  module.exports = {
    getList,
    getDetail,
    newContact,
    updateBlog,
    delBlog,
  };
  