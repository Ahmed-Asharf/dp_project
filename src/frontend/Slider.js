import React from 'react';
import pic from '../images/thor.PNG';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import axios from 'axios';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import background from '../images/csgo.jpeg';
import { withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const images = ['../images/bg.jpeg', '../images/thor.PNG'];


class Slider extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.id);
    console.log("name: ", this.props.name);
    this.state = {
      events: []
    }
  }
  componentDidMount = async () => {
    const res = await axios({
      method: "GET",
      url: "http://localhost:4500/eventinfo"
    });
    this.setState({ events: [...this.state.events, ...res.data] })
    console.log("userobject:", this.state.events);
  }
  navigate = (id, name) => {
    this.props.history.push(`/event?id=${id}&name=${name}`);
  }
  render() {
    return (
      <div className="slide-container" style={{ marginTop: 50 }}>
        <Slide>
          {this.state.events.map((event, index) => (
            event.id != this.props.id ?
              <div className="each-slide" key={index}>
                <div style={{ height: 400, backgroundImage: `url(${background})`, display: "flex", alignItems: "center", justifyContent: "center", alignItems: "center" }}>
                  <div style={{ padding: 15, height: "100%", width: "60%", height: "60%", marginTop: 40, display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: "column", backgroundImage: `linear-gradient(to right bottom, rgba(255, 255, 255, 0.5), rgba(4, 30, 66, 0.7))`, borderRadius: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", height: "100%", alignItems: "center", width: "80%", flexDirection: "column" }}>
                      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                        <text style={{ color: "black", fontSize: 30, fontWeight: "bold" }}>{event.tour_name}</text>
                        <div style={{ width: 40, borderBottomWidth: 3, borderBottomColor: "#E9072B" }}></div>
                      </div>
                      <span style={{ color: "black" }}>{event.STARTDATE.split("T")[0]} - {event.ENDDATE.split("T")[0]}</span>
                      <span style={{ color: "black" }}>${event.PRIZE}</span>
                      <span style={{ color: "black" }}>{event.TAGLINE}</span>
                        <button class="btn btn-outline-secondary" style={{ backgroundColor: "#E9072B", color: "white", fontWeight: "bold" }} onClick={()=>{this.navigate(event.id, this.props.name)}}>View Event</button>
                    </div>
                  </div>
                </div>
              </div> :
              <div style={{ height: "100%", display: "flex", justifyContent: "center", backgroundColor: "white", borderRadius: 10, flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <text style={{ fontSize: 30, fontFamily: "Roboto", fontWeight: "bold", color: "black" }}>Stay connected for more such events</text>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div style={{ display: "flex", width: "30%", flexDirection: "row", justifyContent: "space-between", marginTop: 50 }}>
                    <button>facebook</button>
                    <button>facebook</button>
                    <button>facebook</button>
                  </div>
                </div>
              </div>
          ))}
          {/* : <h1>No Data</h1>} */}
        </Slide>

      </div>
    );
  }
}

export default withRouter(Slider);