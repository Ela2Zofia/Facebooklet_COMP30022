import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import logIn from "../actions/logIn";
function Login() {

  const [ username, setUsername ] = useState( "" );
  const [ password, setPassword ] = useState( "" );
  const [ success, setSuccess] = useState(false);

  const dispatch = useDispatch();

  const saveUsername = ( event ) => {
    setUsername( event.target.value );
  }

  //保存密码到状态中
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
    

    // TODO: 
    if (validate(username,password)) {
        fetch('http://127.0.0.1:8000/login', {
                //请求方法
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({username: username, password: password}),
            }
        ).then(response => {
            return response.json();
        }).then(response=>{
            if (response.isCorrect){
                // Log in
                dispatch(logIn(username));
                setSuccess(true);
                sessionStorage.setItem("user", username);
            }
            else{
                alert("Your username or password is incorrect");
            }
        });
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