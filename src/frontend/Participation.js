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
            event: [],
            prevEvents: [],
            prevTeams:  []
        };
    }
    uppercase = word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    };

    componentDidMount = async () => {
        const name = this.props.name;
        const id = this.props.id;
        console.log("name:", name);
        let res = await axios({
            method: "GET",
            url: "http://localhost:4500/prevteams/" + id
        });
        for(var x = 0; x < res.data.length; x++){
            let team = res.data[0];
            res = await axios({
                method: "GET",
                url: "http://localhost:4500/teams/" + team.TEAM_ID
            });
            this.setState({ prevTeams: [...this.state.prevTeams, ...[res.data]] })
        }
        res = await axios({
            method: "GET",
            url: "http://localhost:4500/prevevents/" + id
        });
        console.log(res.data[0]);
        for(let x = 0; x < res.data.length; x++){
            let event = res.data[x];
            res = await axios({
                method: "GET",
                url: "http://localhost:4500/eventinfo/" + event.TOUR_ID
            });
            this.setState({ prevEvents: [...this.state.prevEvents, ...[res.data]] })
        }
        res = await axios({
            method: "GET",
            url: "http://localhost:4500/event/" + name
        });
        this.setState({ event: [...this.state.event, ...res.data] })
    }
    render() {
        // this.useEffect()
        return (
            <div className="card" style={{ width: 800, backgroundColor: "white", borderRadius: 10, display: "flex", alignItems: "center", marginTop: 40, height:"160vh"}}>
                <div style={{ width: "90%" }}>
                    <div style={{ height: "30%" }}>
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
                    <div style={{ height: "30%", marginTop: 90 }}>
                        <div style={{ borderLeftWidth: 6, borderLeftColor: "#E9072B" }}>
                            <text style={{ fontSize: 30, fontFamily: "Roboto", fontWeight: "bold", paddingLeft: 20, color: "black", marginTop: 20}}>Previous Teams</text>
                        </div>
                        <div style={{ marginTop: 20, display: "flex", flexDirection: "row" }}>
                            {this.state.prevTeams.length == 0 ? <text style={{ fontSize: 20, marginBottom: 50 }}>No Teams history to show!</text> :
                                this.state.prevTeams.map((team, index) => (
                                    <EventCard team_id={team.id} />
                                ))}
                        </div>
                    </div>
                    <div style={{ height: "30%",marginTop: 90 }}>
                        <div style={{ borderLeftWidth: 6, borderLeftColor: "#E9072B" }}>
                            <text style={{ fontSize: 30, fontFamily: "Roboto", fontWeight: "bold", paddingLeft: 20, color: "black" }}>Previous Events</text>
                        </div>
                        <div style={{ marginTop: 20, display: "flex", flexDirection: "row" }}>
                            {this.state.prevEvents.length == 0 ? <text style={{ fontSize: 20, marginBottom: 50 }}>No tournament history to show!</text> :
                                this.state.prevEvents.map((event, index) => (
                                    <EventCard tour_id={event.id} />
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Participation;
