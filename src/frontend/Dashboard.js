import React, { Component } from 'react';
import Header from './Header'
import CurrentSlider from './CurrentSlider';
import background from '../images/bg.jpeg';
import Backdrop from './Backdrop';
import Signup from './Signup';
import SuperTab from './SuperTab';
import axios from 'axios';
import Usercard from './Usercard';
import './Usercard.css'
import Slider from './Slider';
import picture from '../images/thor.PNG';
import { Cards } from './Cards';
import Footer from './Footer';
import Participation from './Participation';
import LeaderBoard from './LeaderBoard';

const urls = ["https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500", background]

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      sideDrawerOpen: false,
      isLogin: true,
      user: [],
      recentEvent: []
    };
  }
  componentDidUpdate = (prevProps) => {
    if (this.props != prevProps) {
      this.componentDidMount();
    }
  }
  componentDidMount = async () => {
    const name = this.props.location.search.split("name=")[1];
    let res = await axios({
      method: "GET",
      url: "http://localhost:4500/playerProfile/" + name
    });
    this.setState({ user: [...this.state.user, ...res.data.data.docs] })
    // this.user = [res.data.data.docs[0]];
    console.log("userobjectdash:", this.user);
    res = await axios({
      method: "GET",
      url: "http://localhost:4500/recentEvent"
    });
    this.setState({ recentEvent: [...this.state.recentEvent, ...res.data] })
  }
  drawerEvent = () => {
    this.setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen }
    });
  }

  backdropEvent = () => {
    this.setState({ sideDrawerOpen: false });
  };
  render() {
    let backdrop;
    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropEvent} />
    }
    return (
      <div>
        {this.state.user.map((user, index) => (
          <div>
            <link href='http://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css' />
            <Header drawerEvent={this.drawerEvent} logged={true} name={user.userName} />
            <div style={{ height: "180vh", backgroundImage: `linear-gradient(to right bottom, rgba(0, 32, 91, 0.2), rgba(4, 30, 66, 0.4)), url('${background}')`, backgroundSize: "cover" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: "90%" }}>
                  {/* current event info */}
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <Usercard name={user.userName} />
                    <Participation name={user.userName} id={user.id}/>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 50 }}>
              <div style={{ width: "90%" }}>
                <div style={{ borderLeftWidth: 6, borderLeftColor: "#E9072B" }}>
                  <text style={{ fontSize: 40, fontFamily: "Roboto", fontWeight: "bold", paddingLeft: 20 }}>Recent Event</text>
                </div>
                <CurrentSlider name={user.userName} />
              </div>
            </div>
            {/* text */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 150, backgroundColor: "#041E42", width: "100%" }}>
              <div style={{ width: "90%", marginBottom: 100 }}>
                <div style={{ borderLeftWidth: 6, borderLeftColor: "#E9072B", marginTop: 100 }}>
                  <text style={{ fontSize: 40, fontFamily: "Roboto", fontWeight: "bold", paddingLeft: 20, color: "white" }}>More on going events</text>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: "80%" }}>
                    {this.state.recentEvent.map((event, index) => (
                      <Slider id={event.id} name={user.userName}/>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 50 }}>
              <div style={{ width: "90%" }}>
                <div style={{ borderLeftWidth: 6, borderLeftColor: "#E9072B" }}>
                  <text style={{ fontSize: 40, fontFamily: "Roboto", fontWeight: "bold", paddingLeft: 20 }}>Explore More</text>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: "90%", marginTop: 40 }}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  {urls.map((url, index) => (
                    <Cards url={url} />
                  ))}
                </div>
              </div>
            </div>
            <LeaderBoard />
            <Footer />
            <link rel={"stylesheet"} href={"./style.css"} />
            <div id="particles-js"></div>
            <script type={"text/javascript"} src={"./particles.js"}></script>
            <script type={"text/javascript"} src={"./app.js"}></script>
            <div style={{ position: "absolute", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <SuperTab show={this.state.sideDrawerOpen} />
            </div>
            {backdrop}
          </div>
        ))
        }
      </div>
    );
  }
}

export default Dashboard;