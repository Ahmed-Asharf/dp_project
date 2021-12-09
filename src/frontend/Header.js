import React, {Component} from 'react';
import logo from '../images/thor.PNG'
import { FaUser, FaCog, FaSignOutAlt, FaSadCry } from 'react-icons/fa';
import './Header.css';
import Navbar from './NavBar';
class Header extends Component{
    logOut = () => {
        window.location.replace("http://localhost:3000");
    }
    settings = () => {
        window.location.replace("http://localhost:3000/settings?name=" + this.props.name);
    }
    render(){
    return(
        <div className="header" style={{width: "100%", backgroundColor:"#041E42", height: 60, display:"flex", alignItems:"center", justifyContent:"center"}}>
            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", width:"90%", alignItems:"center"}}>
            <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", width:"54%"}}>
            <div style={{display:"flex", flexDirection:"row"}}>
            <img style={{width:100, height: 50}} src={logo} />
            <text style={{marginLeft: 10, fontSize: 30, fontWeight:"bold", color:"white", fontFamily:"Roboto"}}>GOD OF WAR</text>
            </div>
            <div>
            <Navbar />
            </div>
            </div>
            <div style={{display:"flex", flexDirection:"row", width: 60, justifyContent:"space-between"}}>
               {
                   this.props.logged ? <FaCog className="toggle_button" onClick={this.settings} style={{height:60, color:"white"}} />:<text></text>
               }
               {
                   this.props.logged ? <FaSignOutAlt className="toggle_button" onClick={this.logOut} style={{height:60, color:"white"}} />: 
                   <FaUser className="toggle_button" onClick={this.props.drawerEvent} style={{height:60, color:"white"}} />
               }
            </div>
            </div>
        </div>
    );
    }

}

export default Header;