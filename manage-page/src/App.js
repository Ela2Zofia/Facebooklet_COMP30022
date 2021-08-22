import './App.css';
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Contacts from './components/Contacts';
import Meetings from './components/Meetings';
import Sidebar from './components/Sidebar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


function App() {

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
          <Sidebar onClick={checkActive}/>
          
          <Switch>

            <Route exact path="/home">
              <Home />
            </Route>

            <Route exact path="/contacts">
              <Contacts />
            </Route>

            <Route exact path="/meetings">
              <Meetings />
            </Route>
          </Switch>

          {/* <Footer /> */}
        </Router>

        
    </div>
  );
}

export default App;
