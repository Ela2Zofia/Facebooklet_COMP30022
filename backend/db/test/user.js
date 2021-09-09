const User = require("../models/User");

!(async () => {
    //创建用户
    const zhangsan = await User.create({
      username: "zhangsan",
      password: "123",
      realname: "张三",
    });
    console.log(zhangsan);

  // //查询
  // const list = await User.find();
  // console.log(list);

//   //模拟登陆
//   const zhangsan = await User.find({
//     username: "zhangsan",
//     password: "123",
//   });
//   console.log(zhangsan);
})();
