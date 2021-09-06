class Network{
  // const HOST = "http://localhost:8000/contacts";
  // const HOST = "http://localhost:5000/contacts";

  static HOST_CONTACTS = "http://localhost:5000/contacts"
  static HOST_CONTACTS = "http://localhost:5000/meetings"

  static async addContactNet(user, contact) {
    const res = await fetch(this.HOST_CONTACTS, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        // TODO: user header
        "User": user
      },
      body: JSON.stringify(contact)
    });
    
    if(!res.ok){
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json()
    return data;
  };

  static async fetchContactsNet(user){
    const res = await fetch(this.HOST_CONTACTS, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
  
        // TODO: user header
        "User": user
      }
    });

    if(!res.ok){
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    // console.log(data);
    return data;
  }

  static async delContactNet(user, id){
    const HOST = this.HOST_CONTACTS + "/" +id;
    const res = await fetch(HOST, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        // TODO: user header
        "User": user
      }
    });

    if(!res.ok){
      throw new Error(`HTTP error! status: ${res.status}`);
    }
  };

}

export default Network;