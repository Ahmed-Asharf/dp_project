import React, {Component} from 'react';
import logo from '../images/thor.PNG'
import { FaUser } from 'react-icons/fa';
import './Header.css';

class Header extends Component{
    render(){
    return(
        <div className="header" style={{width: "100%", backgroundColor:"#041E42", height: 60, display:"flex", alignItems:"center", justifyContent:"center"}}>
            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", width:"90%", alignItems:"center"}}>
            <div style={{display:"flex", alignItems:"center"}}>
            <img style={{width:100, height: 50}} src={logo} />
            <text style={{marginLeft: 10, fontSize: 30, fontWeight:"bold", color:"white", fontFamily:"Roboto"}}>GOD OF WAR</text>
            </div>
            <FaUser className="toggle_button" onClick={this.props.drawerEvent} style={{height:60, color:"white"}} />
            </div>
        </div>
    );
    }

}

export default Header;