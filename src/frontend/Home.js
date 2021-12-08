import React, { Component } from 'react';
import Header from './Header'
import CurrentEvent from './CurrentEvent';
import background from '../images/bg.jpeg';
import Backdrop from './Backdrop';
import Signup from './Signup';
import SuperTab from './SuperTab';
import Slider from './Slider';
import axios from 'axios';

class Home extends Component {
  state = {
    sideDrawerOpen: false,
    isLogin: true,
    recentEvent: []
  };
  drawerEvent = () => {
    this.setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen }
    });
  }

  backdropEvent = () => {
    this.setState({ sideDrawerOpen: false });
  };

  componentDidMount = async () => {
    let res = await axios({
        method: "GET",
        url: "http://localhost:4500/recentEvent"
    });
    this.setState({ recentEvent: [...this.state.recentEvent, ...res.data] })
}
  
  render() {
    let backdrop;
    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropEvent} />
    }
    return (
      <div>
        <link href='http://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css' />
        <Header drawerEvent={this.drawerEvent} />
        <div style={{height:"95vh", backgroundImage: `linear-gradient(to right bottom, rgba(4, 30, 66, 0.2), rgba(4, 30, 66, 0.4)), url('${background}')`, backgroundSize:"cover"}}>
        <text style={{color: "white", fontSize: 80, color: "#E9072B", fontWeight: "bold", fontFamily:"Roboto", letterSpacing:10, position:"absolute", top: 100, left:10}}>god of war</text>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 100}}>
          <div style={{ width: "90%" }}>
            {/* current event info */}
            <text style={{ color: "white", fontSize: 80, color: "#E9072B", fontWeight: "bold", fontFamily:"Roboto", letterSpacing:10, position:"absolute"}}>GAMING BATTLES</text>
            <div style={{ marginTop: 20 }}>
              
              <text style={{ color: "white", fontFamily: "Roboto"}}>Compete with top ranked teams to take your skills to the next level!</text>
            </div>
            </div>
              <CurrentEvent/>
            {/* text */}
            {this.state.recentEvent.map((event, index)=>(
              <Slider id={event.id}/>
            ))}
          </div>
        </div>
        <link rel={"stylesheet"} href={"./style.css"} />
        <div id="particles-js"></div>
        <script type={"text/javascript"} src={"./particles.js"}></script>
        <script type={"text/javascript"} src={"./app.js"}></script>
        <div style={{ position: "absolute", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <SuperTab show={this.state.sideDrawerOpen} />
        </div>
        {backdrop}
      </div>
    );
  }
}

export default Home;