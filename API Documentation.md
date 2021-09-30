# API documentation for frontend


## 2. Contacts
### 1. Port
```javascript
HOST_CONTACTS = "/contacts"
```

### 2.Sample Data Structure
```json
{
      "id": 1,
      "firstName": "Derrick",
      "lastName": "Li",
      "occupation": "Google CEO",
      "email": "derrickli824@gmail.com",
      "phone": "+61450205002",
      "tag": [
        "people",
        "crazy_smart"
      ],
      "description": "Some"
}
```
### 3. APIs
```javascript
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
    const HOST = this.HOST_CONTACTS+"?_sort=firstName";
    const res = await fetch(HOST, {
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

  static async editContactNet(user, contact){
    const HOST = this.HOST_CONTACTS + "/" +contact._id;
    const res = await fetch(HOST, {
      method: "PUT",
      headers:{
        "Content-type": "application/json",
        // TODO: user header
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
        // TODO: user header
        "User": user
      },
    })

    if(!res.ok){
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  }
```

## 3. Meetings
### 1. Port
```javascript
HOST_MEETINGS = "/meetings"
```

### 2.Sample Data Structure
```json
{
        "topic": "Untitled",
        "meetingNumber": "111222",
        "link": "http://meeting.com",
        "date": "2021-10-13",
        "time": "04:33",
        "duration": 750,
        "participants": [
        {
            "_id": 12,
            "firstName": "Jiawei",
            "lastName": "Li",
            "occupation": "Student",
            "email": "derrickli824@gmail.com",
            "phone": "+61450205002",
            "tag": [],
            "description": "best programmer --- in the world",
            "id": 12
        }
    ],
        "description": "This is a test",
        "id": 1
}
```
### 3. APIs
```javascript
static async fetchMeetingsNet(user){
        const HOST = this.HOST_MEETINGS+"?_sort=firstName";
        const res = await fetch(HOST, {
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
        return data;
    }

    static async addMeetingsNet(user, meeting) {
        const res = await fetch(this.HOST_MEETINGS, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                // TODO: user header
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
                // TODO: user header
                "User": user
            }
        });

        if(!res.ok){
            throw new Error(`HTTP error! status: ${res.status}`);
        }
    };

    static async editMeetingNet(user, meeting){
        const HOST = this.HOST_MEETINGS + "/" +meeting.id;
        const res = await fetch(HOST, {
            method: "PUT",
            headers:{
                "Content-type": "application/json",
                // TODO: user header
                "User": user
            },
            body: JSON.stringify(meeting)
        })

        if(!res.ok){
            throw new Error(`HTTP error! status: ${res.status}`);
        }
    };

}
```



