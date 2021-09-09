import React from "react";
import tsIcon from '../../src/img/u8.png';
import '../css/Header.css'

class Header extends React.Component{
    render(){
        return(<div id = "welcomeHeader">
            <img className = "icon" src={tsIcon} alt="icon"/>
            <h1 className = "slogan">FaceBooklet</h1>
        </div>)
    }
}

export default Header