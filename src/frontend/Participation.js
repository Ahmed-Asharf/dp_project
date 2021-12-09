import React, { Component } from "react";
import picture from '../images/thor.PNG';
import axios from 'axios';
import EventCard from './EventCard';
import background1 from '../images/thor.PNG';
import background2 from '../images/csgo2.jpeg';

const urls = ["https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500", background1, background2]

class Participation extends Component {
    constructor() {
        super();
        this.state = {
            event: []
        };
    }
    uppercase = word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    };

    componentDidMount = async () => {
        const name = this.props.name;
        console.log("name:", name);
        let res = await axios({
            method: "GET",
            url: "http://localhost:4500/event/" + name
        });
        this.setState({ event: [...this.state.event, ...res.data] })
    }
    render() {
        // this.useEffect()
        return (
            <div className="card" style={{ width: 800, backgroundColor: "white", borderRadius: 10, display: "flex", alignItems: "center", marginTop: 40 }}>
                <div style={{ width: "90%" }}>
                    <div style={{ height: "50%" }}>
                        <div style={{ borderLeftWidth: 6, borderLeftColor: "#E9072B", marginTop: 30 }}>
                            <text style={{ fontSize: 30, fontFamily: "Roboto", fontWeight: "bold", paddingLeft: 20, color: "black" }}>Scheduled Event</text>
                        </div>
                        <div style={{ marginTop: 20, display: "flex", flexDirection: "row" }}>
                            {this.state.event.length == 0 ? <text style={{ fontSize: 20, marginBottom: 50 }}>You are not registered in any event so far!</text> :
                                this.state.event.map((event, index) => (
                                    <EventCard tour_id={event.id} />
                                ))}
                        </div>
                    </div>
                    <div style={{ height: "50%" }}>
                        <div style={{ borderLeftWidth: 6, borderLeftColor: "#E9072B" }}>
                            <text style={{ fontSize: 30, fontFamily: "Roboto", fontWeight: "bold", paddingLeft: 20, color: "black" }}>Previous Events</text>
                        </div>
                        <div style={{ marginTop: 20, display: "flex", flexDirection: "row" }}>
                            {urls.length == 0 ? <text style={{ fontSize: 20, marginBottom: 50 }}>No tournament history to show!</text> :
                                urls.map((url, index) => (
                                    <EventCard url={url} />
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Participation;
