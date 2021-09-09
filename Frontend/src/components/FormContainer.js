import React from 'react';
import "../css/Container.css"
import ForgetPassword from "./ForgetPassword";
import Login from "./Login";
import Register from "./Register";

import { Route, Switch, Redirect } from "react-router-dom";



class FormContainer extends React.Component {
  render() {
    return (
      <div id="formContainer" className="dwo">
        <div className="formRight">
          <Switch>
            <Route path="/forgot" component={ ForgetPassword } />

            <Route path="/login" component={ Login } exact />

            <Route path="/regist" component={ Register } />

            <Redirect to="/login" />
          </Switch>
        </div>
      </div> )
  }
}

export default FormContainer