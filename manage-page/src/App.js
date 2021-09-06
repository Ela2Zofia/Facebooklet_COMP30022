import './css/App.css';
import "./css/Container.css";
import React, { useState } from 'react';
import Home from './components/Home';
import Contacts from './components/Contacts';
import Meetings from './components/Meetings';
import Sidebar from './page-components/Sidebar';
import Calendar from './components/Calendar';
import PrivateRoute from './util/PrivateRoute';
import Header from './page-components/Header';
import Login from "./components/Login";
import Register from "./components/Register";
import ForgetPassword from "./components/ForgetPassword";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

function App() {

  const [ user, setUser ] = useState( "" );

  // const [ contacts, setContacts] = useState([])


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


  return (
    <div className="App">

      <Router className="Router">

        <Route path={ [ "/home", "/contacts", "/meetings", "/calendar" ] }>
          <Sidebar onClick={ checkActive } />
        </Route>

        <Route path={ [ "/forgot", "/login", "/regist" ] }>
          <Header />
        </Route>

        <div>
          <Switch>

            <PrivateRoute component={ Home } path="/home" />

            <PrivateRoute component={ Contacts } path="/contacts" />

            <PrivateRoute component={ Meetings } path="/meetings" />

            <PrivateRoute component={ Calendar } path="/calendar" />

            <Route path="/forgot" component={ ForgetPassword } />

            <Route path="/login" component={ Login } exact />

            <Route path="/regist" component={ Register } />

            <Redirect to="/login" />

          </Switch>
        </div>
        {/* <Footer /> */ }
      </Router>


    </div>
  );
}

export default App;
