import React from "react";
import { Link, Redirect } from "react-router-dom";
import Network from "../util/Network";
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
    } else if ( password2 !== password1 ) {
      alert( "Those passwords didn’t match. Try again." );
    } else {
      return true;
    }
    return false;
  }

  handleSubmit = async (event) => {
    console.time("ValueChanged");
    event.preventDefault();
    let {username, email, password1, password2} = this.state;

    if (this.validate(username, email, password1, password2)) {

      const serverData = await Network.registerUserNet(
        {username: username, email: email, password: password1}
      )

      if (serverData.isCorrect) {
        alert("Registration successful");
        console.timeEnd("ValueChanged");
        this.setState({isSuccess: true})
      } else {
        alert("The username or email have been used");
      }
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
                    <input onChange={ this.savePassword1 } type="password" name="Password" placeholder=" " pattern="/^(\w){6,20}$/" title="Password should contain only 6-20 Numbers, letters and '_'"/>
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