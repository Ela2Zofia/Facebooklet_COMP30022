import React from "react";
import { Link, Redirect } from "react-router-dom";
import PubSub from 'pubsub-js'

class ForgetPassword extends React.Component {
  state = {
    email: '',
    isSuccess: false
  }

  saveEmail = ( event ) => {
    this.setState( { email: event.target.value } );
  }

  validate = ( email ) => {
    if ( email === '' ) {
      alert( "Please enter your email" );
    } else {
      return true;
    }
    return false;
  }

  handleSubmit = ( event ) => {
    event.preventDefault();
    let { email } = this.state;
    if ( this.validate( email ) ) {
      fetch( "http://localhost:" + `${process.env.PORT || 8000}` + "/api/forgot", {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify( { email: email } ),
      }
      ).then( response => {
        return response.json();
      } ).then( response => {
        if ( response.isCorrect ) {
          alert( "A verification code has been sent to your mail" );
          this.setState( { isSuccess: true } )
            PubSub.publish("email sent",{email:email});
        }
        else {
          alert( "Can't find the email" );
        }
      } );
    }
  }

  render() {
    if ( this.state.isSuccess ) {
      return <Redirect to="/reset" />
    } else {
      return (
        <div className="formContainerWrap">
          <div id="formContainer" className="dwo">
            <div className="formRight">
              <form id="forgot" onSubmit={ this.handleSubmit }>
                <header>
                  <h1>Forget Password?</h1>
                  <p>Enter Your Email Address</p>
                </header>
                <section>
                  <label>
                    <p>Email</p>
                    <input onChange={ this.saveEmail } type="email" name="Email" placeholder=" " />
                    <div className="border"></div>
                  </label>
                  <button type="submit" id="ForBtn">Confirm</button>
                  <br />
                  <br />
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
// eslint-disable-next-line
export default ForgetPassword