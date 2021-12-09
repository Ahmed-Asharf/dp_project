import React from 'react';
import pic from '../images/thor.PNG';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import axios from 'axios';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import background from '../images/csgo.jpeg';
const images = ['../images/bg.jpeg', '../images/thor.PNG'];


class Slider extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.id);
    console.log("name: ", this.props.name);
    this.state = {
      events: [],
    }
  }
  componentDidMount = async () => {
    const res = await axios({
      method: "GET",
      url: "http://localhost:4500/events"
    });
    this.setState({ events: [...this.state.events, ...res.data] })
    console.log("userobject:", this.state.events);
  }
  render() {
    return (
      <div className="slide-container">
        <Slide>
          {/* map the events array here */}
          {/* {this.state.events.length > 0 ? */}
            {this.state.events.map((event, index) => (
             event.id != this.props.id ?
              <div className="each-slide" key={index}>
                <div style={{ height: 400, backgroundImage: `url(${background})`, alignItems: "center", justifyContent: "center", alignItems:"center"}}>
                  <div style={{padding:40, height:"100%", marginTop: 40, display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: "column" }}>
                    <span style={{ color: "white" }}>{event.id}</span>
                    <span style={{ color: "white" }}>{event.PRIZE}</span>
                    <span style={{ color: "white" }}>{event.STARTDATE}</span>
                    <span style={{ color: "white" }}>{event.ENDDATE}</span>
                    <Link to={{ pathname: `/event?id=${event.id}&name=${this.props.name}` }}>
                      <button class="btn btn-outline-secondary">View Event</button>
                    </Link>
                  </div>
                </div>
              </div> : <div style={{height: "50%", marginTop: 20, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                <text style={{fontSize:20, color:"white"}}>Ragnarok is Coming</text>
              </div>
            ))}
            {/* : <h1>No Data</h1>} */}
        </Slide>

      </div>
    );
  }
}

export default Slider;