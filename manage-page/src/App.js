import './css/App.css';
import React, { useState } from 'react';
import Home from './components/Home';
import Contacts from './components/Contacts';
import Meetings from './components/Meetings';
import Sidebar from './page-components/Sidebar';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Calendar from './components/Calendar';
import PrivateRoute from './util/PrivateRoute';

function App() {

  const [user, setUser] = useState("");

  // const [ contacts, setContacts] = useState([])
  
  
  function checkActive(link){
    const react_links = document.getElementsByClassName("SidebarItem");
    
    for(let i in react_links){
      
      if(typeof(react_links[i])==="object"){
        if (react_links[i].dataset.url === link){
          react_links[i].setAttribute("id", "active");
        }else{
          react_links[i].setAttribute("id", "");
        }
      }
      
    }
  };


  return (
    <div className="App">

        <Router className="Router">

          <Route path={["/home","/contacts","/meetings", "/calendar"]}>
            <Sidebar onClick={checkActive}/>
          </Route>

          <div>
            <Switch>

              <PrivateRoute component={Home} path="/home"/> 

              <PrivateRoute component={Contacts} path="/contacts"/> 

              <PrivateRoute component={Meetings} path="/meetings"/> 

              <PrivateRoute component={Calendar} path="/calendar"/> 
              
              <Route path="/signin">
                <h1>Plz sign in?</h1>
              </Route>
              
              {/* <Route path="/home">
                <Home />
              </Route>

              <Route path="/contacts">
                <Contacts />
              </Route>

              <Route exact path="/meetings">
                <Meetings />
              </Route>

              <Route exact path="/calendar">
                <Calendar />
              </Route> */}

            </Switch>
          </div>
          {/* <Footer /> */}
        </Router>

        
    </div>
  );
}

export default App;
