import React from 'react';
import pic from '../images/thor.PNG';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import axios from 'axios';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import background from '../images/csgo.jpeg';
import CurrentEvent from './CurrentEvent';
const images = ['../images/bg.jpeg', '../images/thor.PNG'];


class Slider extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.id);
        console.log("name: ", this.props.name);
        this.state = {
            events: [],
            name: this.props.name
        }
    }
    componentDidMount = async () => {
        const res = await axios({
            method: "GET",
            url: "http://localhost:4500/upcomingEvents"
        });
        this.setState({ events: [...this.state.events, ...res.data] })
        console.log("userobject:", this.state.events);
    }
    render() {
        return (
            <div className="slide-container">
                {this.state.events.length ?
                    <Slide>
                        {this.state.events.map((event, index) => (
                            <CurrentEvent event={event} name={this.props.name} />
                        )) }
                    </Slide>
            : <div style={{marginTop: 30}}><text style={{ fontSize: 20, marginLeft: "9%" }}>Unfortunately there are no upcoming events to show!</text></div>}
            </div>
        );
    }
}

export default Slider;