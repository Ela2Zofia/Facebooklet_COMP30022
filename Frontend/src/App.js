import './css/App.css';
import "./css/Container.css";
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logIn from './actions/logIn';
import Home from './components/Home';
import Contacts from './components/Contacts';
import Meetings from './components/Meetings';
import Sidebar from './page-components/Sidebar';
import Calendar from './components/Calendar';
import PrivateRoute from './util/PrivateRoute';
import PublicRoute from './util/PublicRoute';
import Header from './page-components/Header';
import Login from "./components/Login";
import Register from "./components/Register";
import ForgetPassword from "./components/ForgetPassword";
import Reset from "./components/Reset"
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

function App() {

  const dispatch = useDispatch();
  const user = useSelector(state=>state.user);
  function checkStorage(){
    if (localStorage.getItem("user")){
      dispatch(logIn(localStorage.getItem("user")));
    }
  }

  function checkActive( link ) {
    const react_links = document.getElementsByClassName( "SidebarItem" );

    for ( let i in react_links ) {

      if ( typeof ( react_links[ i ] ) === "object" ) {
        if ( react_links[ i ].dataset.url === link ) {
          react_links[ i ].setAttribute( "id", "active" );
        } else {
          react_links[ i ].setAttribute( "id", "" );
        }
      }

    }
  };

  checkStorage();



  return (
    <div className="App">

      <Router className="Router">

        <Route path={ [ "/home", "/contacts", "/meetings", "/calendar" ] }>
          <Sidebar onClick={ checkActive } />
        </Route>

        <Route path={ [ "/forgot", "/login", "/regist", "/reset" ] }>
          <Header />
        </Route>

        <div>
          <Switch>

            <PrivateRoute component={ Home } restricted={user} path="/home" />

            <PrivateRoute component={ Contacts } restricted={user} path="/contacts" />

            <PrivateRoute component={ Meetings } restricted={user} path="/meetings" />

            <PrivateRoute component={ Calendar } restricted={user} path="/calendar" />

            <PublicRoute component={ ForgetPassword } restricted={user === ""} path="/forgot"  />

            <PublicRoute component={ Login } restricted={user === ""} path="/login"  exact />

            <PublicRoute component={ Register } restricted={user === ""} path="/regist"  />

              <PublicRoute component={ Reset } restricted={user === ""} path="/reset"  />

            {
              (localStorage.getItem("user") !== "")
              ? <Redirect to="/home" />
              : <Redirect to="/login" />
            }
            

          </Switch>
        </div>
        {/* <Footer /> */ }
      </Router>


    </div>
  );
}

export default App;
