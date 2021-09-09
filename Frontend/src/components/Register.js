import React from "react";
import { Link, Redirect } from "react-router-dom";
class Register extends React.Component {
  state = {
    username: '',
    email: '',
    password1: '',
    password2: '',
    isSuccess: false

  }

  saveUsername = ( event ) => {
    this.setState( { username: event.target.value } );
  }

  saveEmail = ( event ) => {
    this.setState( { email: event.target.value } );
  }

  savePassword1 = ( event ) => {
    this.setState( { password1: event.target.value } );
  }

  savePassword2 = ( event ) => {
    this.setState( { password2: event.target.value } );
  }


  validate = ( username, email, password1, password2 ) => {
    if ( username === '' ) {
      alert( "Please enter your username" );
    } else if ( email === '' ) {
      alert( "Please enter your email" );
    } else if ( password1 === '' ) {
      alert( "Please enter your password" );
    } else if ( password1.length < 6 || password1.length > 20 ) {
      alert( "Use 6-20 characters for your password" )
    } else if ( password2 !== password1 ) {
      alert( "Those passwords didn’t match. Try again." );
    } else {
      return true;
    }
    return false;
  }

  handleSubmit = ( event ) => {
    event.preventDefault();
    let { username, email, password1, password2 } = this.state;
    console.log( typeof ( password1 ) );
    if ( this.validate( username, email, password1, password2 ) ) {
      fetch( 'http://127.0.0.1:8000/register', {
        //请求方法
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify( { username: username, email: email, password: password1 } ),
      }
      ).then( response => {
        return response.json();
      } ).then( response => {
        if ( response.isCorrect ) {
          alert( "Registration successful" );
          this.setState( { isSuccess: true } )
        }
        else {
          alert( "The username or email have been used" );
        }
      } );
    }

  }

  render() {

    if ( this.state.isSuccess ) {
      return <Redirect to="/login" />
    }
    else {
      return (
        <div className="formContainerWrap">
          <div id="formContainer" className="dwo">
            <div className="formRight">
              <form id="register" onSubmit={ this.handleSubmit } >
                <header>
                  <h1>Register</h1>
                </header>

                <section>

                  <label>
                    <p>Username</p>
                    <input onChange={ this.saveUsername } type="text" name="Username" placeholder=" " />
                    <div className="border"></div>
                  </label>

                  <label>
                    <p>E-mail</p>
                    <input onChange={ this.saveEmail } type="email" name="Email" placeholder=" " />
                    <div className="border"></div>
                  </label>

                  <label>
                    <p>Password</p>
                    <input onChange={ this.savePassword1 } type="password" name="Password" placeholder=" " />
                    <div className="border"></div>
                  </label>

                  <label>
                    <p>Comfirm Password</p>
                    <input onChange={ this.savePassword2 } type="password" name="Confirm_Password" placeholder=" " />
                    <div className="border"></div>
                  </label>
                  <button type="submit">Register</button>
                </section>

                <footer>
                  <Link className="router" to="/login">Back</Link>
                </footer>
              </form>
            </div>
          </div>
        </div>

      )
    }
  }
}

export default Register