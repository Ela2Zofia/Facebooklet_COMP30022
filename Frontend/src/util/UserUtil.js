class UserUtil{

  // 10 minute ttl for user auto login
  static ttl = 600*1000;

  static setUserWithExpiry(remember, user){
    var now = new Date();
    var time = now.getTime()
    if (remember){
      time = time + this.ttl;
    }
    const item = {
      user: user,
      expiry: time
    }

    localStorage.setItem("user", JSON.stringify(item))
  }

  // verify
  static getUser(){
    var now = new Date();

    const user = localStorage.getItem("user");
    if(user){
      const item = JSON.parse(user);
      if(now.getTime()>item.expiry){
        console.log(now.getTime());
        console.log(item.expiry);
        localStorage.removeItem("user");
        return null;
      }else{
        
        return item.user;
      }

    }else{
      return null;
    }

  }
}

export default UserUtil;