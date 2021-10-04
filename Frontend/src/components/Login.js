import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import logIn from "../actions/logIn";
import UserUtil from "../util/UserUtil";
function Login() {
    // eslint-disable-next-line
  const now = new Date();
  const [ username, setUsername ] = useState( "" );
  const [ password, setPassword ] = useState( "" );
  const [ success, setSuccess ] = useState( false );
  const [ remember, setRemember ] = useState( false );

  const dispatch = useDispatch();

  const saveUsername = ( event ) => {
    setUsername( event.target.value );
  }

  //save password into state
  const savePassword = ( event ) => {
    setPassword( event.target.value );
  }

  const validate = ( username, password ) => {
    if ( username === '' ) {
      alert( "Please enter your username" );
    } else if ( password === '' ) {
      alert( "Please enter your password" );
    }
    else {
      return true;
    }
    return false;
  }

  const handleSubmit = ( event ) => {
    event.preventDefault();
    // console.log( username )

    // dispatch( logIn( username ) );
    // setSuccess( true );
    // UserUtil.setUserWithExpiry( remember, username );


    if ( validate( username, password ) ) {
      fetch("/api/login", {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify( { username: username, password: password } ),
      }
      ).then( response => {
        return response.json();
      } ).then( response => {
          if ( response.isCorrect) {
              // Log in
              dispatch( logIn( username ) );
              setSuccess( true );
              UserUtil.setUserWithExpiry( remember, username );
          }
          else {
              alert( "Your username or password is incorrect" );
          }
      } );
    }
  }


  return (
    <div className="formContainerWrap">
      <div id="formContainer" className="dwo">
        <div className="formRight">
          <form id="login" onSubmit={ handleSubmit }>
            <header>
              <h1>Welcome back!</h1>
              <p>Please login first</p>
            </header>

            <section>
              <label>
                <p>Username</p>
                <input onChange={ saveUsername } type="text" name="username" placeholder=" " />
                <div className="border"></div>
              </label>

              <label>
                <p>Password</p>
                <input onChange={ savePassword } type="password" name="password" placeholder=" " />
                <div className="border"></div>
              </label>

              <label style={ { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" } }>
                <p style={ { display: "inline" } }>Remember me</p>
                <input onChange={ () => { setRemember( !remember ) } } type="checkbox" value={ remember } style={ { display: "inline" } } />
              </label>


              <button type="submit" id="LogBtn">Log in</button>
            </section>

            <br />
            <br />
            <footer>
              <Link className="router" to="/forgot">Forget Password？</Link>
              <Link id="registerBtn" className="router" to="/regist">New User？</Link>
            </footer>
          </form>
          {
            success
              ?
              <Redirect to="/home" />
              : ""
          }



        </div>
      </div>
    </div>
  )
}

export default Login