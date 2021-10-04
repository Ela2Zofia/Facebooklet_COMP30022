class Network {

  // static HOST_CONTACTS = "http://localhost:" + `${process.env.PORT || 8000}` + "/api/contacts";
  // static HOST_MEETINGS = "http://localhost:" + `${process.env.PORT || 8000}` + "/api/meetings";
  // static HOST_REGISTER = "http://localhost:" + `${process.env.PORT || 8000}` + "/api/register";

  /*static HOST_CONTACTS = "/api/contacts";
  static HOST_MEETINGS = "/api/meetings";
  static HOST_REGISTER = "/api/register";
  static HOST_LOGIN = "/api/login";
  static HOST_FORGET = "/api/forgot";
  static HOST_RESET = "/api/reset";*/


  static HOST_CONTACTS = "https://localhost:8000/api/contacts";
  static HOST_MEETINGS = "https://localhost:8000/api/meetings";
  static HOST_REGISTER = "https://localhost:8000/api/register";
  static HOST_LOGIN = "https://localhost:8000/api/login";
  static HOST_FORGET = "https://localhost:8000/api/forgot";
  static HOST_RESET = "https://localhost:8000/api/reset";


  static async loginUserNet( userInfo ) {
    const res =  await fetch(this.HOST_LOGIN, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify( userInfo ),
      }
    )

    if ( !res.ok ) {
      throw new Error( `HTTP error! status: ${res.status}` );
    }

    return await res.json();
  }


  static async registerUserNet( userInfo ) {
    const res =  await fetch( this.HOST_REGISTER, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify( userInfo ),
      }
    );

    if ( !res.ok ) {
      throw new Error( `HTTP error! status: ${res.status}` );
    }

    return await res.json();
  }


  static async forgetUserNet( userInfo ) {
    const res =  await fetch( this.HOST_FORGET, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify( userInfo ),
      }
    );
    if ( !res.ok ) {
      throw new Error( `HTTP error! status: ${res.status}` );
    }

    return await res.json();
  }

  static async resetUserNet( userInfo ) {
    const res =  await fetch(this.HOST_RESET, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify( userInfo ),
      }
    );
    if ( !res.ok ) {
      throw new Error( `HTTP error! status: ${res.status}` );
    }

    return await res.json();
  }



  static async addContactNet( user, contact ) {
    const res = await fetch( this.HOST_CONTACTS, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "User": user
      },
      body: JSON.stringify( contact )
    } );

    if ( !res.ok ) {
      throw new Error( `HTTP error! status: ${res.status}` );
    }

    return await res.json();
  };


  static async fetchContactsNet( user ) {
    const HOST = this.HOST_CONTACTS + "?_sort=firstName";
    const res = await fetch( HOST, {
      method: "GET",
      headers: {
        "Content-type": "application/json",

        "User": user
      }
    } );

    if ( !res.ok ) {
      throw new Error( `HTTP error! status: ${res.status}` );
    }

    return await res.json();
  }


  static async delContactNet( user, id ) {
    const HOST = this.HOST_CONTACTS + "/" + id;
    const res = await fetch( HOST, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "User": user
      }
    } );

    if ( !res.ok ) {
      throw new Error( `HTTP error! status: ${res.status}` );
    }
  };


  static async editContactNet( user, contact ) {
    const HOST = this.HOST_CONTACTS + "/" + contact._id;
    const res = await fetch( HOST, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "User": user
      },
      body: JSON.stringify( contact )
    } )

    if ( !res.ok ) {
      throw new Error( `HTTP error! status: ${res.status}` );
    }
  };


  static async searchContactNet( user, text ) {
    const HOST = this.HOST_CONTACTS + "?_sort=firstName&q=" + text;
    const res = await fetch( HOST, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "User": user
      },
    } )

    if ( !res.ok ) {
      throw new Error( `HTTP error! status: ${res.status}` );
    }

    // console.log(data);
    return await res.json();
  };


  static async fetchMeetingsNet( user ) {
    const HOST = this.HOST_MEETINGS + "?_sort=firstName";
    const res = await fetch( HOST, {
      method: "GET",
      headers: {
        "Content-type": "application/json",

        "User": user
      }
    } );

    if ( !res.ok ) {
      throw new Error( `HTTP error! status: ${res.status}` );
    }

    return await res.json();
  }


  static async addMeetingsNet( user, meeting ) {
    const res = await fetch( this.HOST_MEETINGS, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "User": user
      },
      body: JSON.stringify( meeting )
    } );

    if ( !res.ok ) {
      throw new Error( `HTTP error! status: ${res.status}` );
    }

    return await res.json();
  };


  static async delMeetingNet( user, id ) {
    const HOST = this.HOST_MEETINGS + "/" + id;
    const res = await fetch( HOST, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "User": user
      }
    } );

    if ( !res.ok ) {
      throw new Error( `HTTP error! status: ${res.status}` );
    }
  };


  static async editMeetingNet( user, meeting ) {
    const HOST = this.HOST_MEETINGS + "/" + meeting._id;
    const res = await fetch( HOST, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "User": user
      },
      body: JSON.stringify( meeting )
    } )

    if ( !res.ok ) {
      throw new Error( `HTTP error! status: ${res.status}` );
    }
  };

}

export default Network;