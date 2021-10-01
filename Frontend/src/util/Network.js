class Network{
  // const HOST = "http://localhost:8000/contacts";
  // const HOST = "http://localhost:5000/contacts";

  static HOST_CONTACTS = "http://localhost:" + `${process.env.PORT || 8000}` + "/api/contacts";
  static HOST_MEETINGS = "http://localhost:" + `${process.env.PORT || 8000}` + "/api/meetings";
  static HOST_REGISTER = "http://localhost:" + `${process.env.PORT || 8000}` + "/api/register";

  static async addContactNet(user, contact) {
    const res = await fetch(this.HOST_CONTACTS, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
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
    const HOST = this.HOST_CONTACTS+"?_sort=firstName";
    const res = await fetch(HOST, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
  
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
        "User": user
      }
    });

    if(!res.ok){
      throw new Error(`HTTP error! status: ${res.status}`);
    }
  };

  static async editContactNet(user, contact){
    const HOST = this.HOST_CONTACTS + "/" +contact._id;
    const res = await fetch(HOST, {
      method: "PUT",
      headers:{
        "Content-type": "application/json",
        "User": user
      },
      body: JSON.stringify(contact)
    })

    if(!res.ok){
      throw new Error(`HTTP error! status: ${res.status}`);
    }
  };

  static async searchContactNet(user, text){
    const HOST = this.HOST_CONTACTS + "?_sort=firstName&q=" + text;
    const res = await fetch(HOST, {
      method: "GET",
      headers:{
        "Content-type": "application/json",
        "User": user
      },
    })

    if(!res.ok){
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    // console.log(data);
    return data;
  };

  static registerUserNet(userInfo){
    return fetch( this.HOST_REGISTER, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(userInfo),
      }
    );
  }


    static async fetchMeetingsNet(user){
        const HOST = this.HOST_MEETINGS+"?_sort=firstName";
        const res = await fetch(HOST, {
            method: "GET",
            headers: {
                "Content-type": "application/json",

                "User": user
            }
        });

        if(!res.ok){
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        return data;
    }

    static async addMeetingsNet(user, meeting) {
        const res = await fetch(this.HOST_MEETINGS, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "User": user
            },
            body: JSON.stringify(meeting)
        });

        if(!res.ok){
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json()
        return data;
    };


    static async delMeetingNet(user, id){
        const HOST = this.HOST_MEETINGS + "/" +id;
        const res = await fetch(HOST, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                "User": user
            }
        });

        if(!res.ok){
            throw new Error(`HTTP error! status: ${res.status}`);
        }
    };

    static async editMeetingNet(user, meeting){
        const HOST = this.HOST_MEETINGS + "/" +meeting._id;
        const res = await fetch(HOST, {
            method: "PUT",
            headers:{
                "Content-type": "application/json",
                "User": user
            },
            body: JSON.stringify(meeting)
        })

        if(!res.ok){
            throw new Error(`HTTP error! status: ${res.status}`);
        }
    };

}

export default Network;