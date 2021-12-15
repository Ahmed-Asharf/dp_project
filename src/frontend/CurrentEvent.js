import React, { Component } from 'react';
import logo from '../images/thor.PNG';
import { LogoFacebook, LogoInstagram, LogoYoutube, LogoReddit } from 'react-ionicons'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { env } from 'process';
import background from '../images/csgo2.jpeg';
import { withRouter } from 'react-router-dom';

class CurrentEvent extends Component {
    constructor() {
        super()
        this.state = {
            recentEvent: []
        }
    }
    componentDidMount = async () => {
        let res = await axios({
            method: "GET",
            url: "http://localhost:4500/recentEvent"
        });
        this.setState({ recentEvent: [...this.state.recentEvent, ...res.data] })
    }
    navigate = (id, name) => {
        this.props.history.push(`/event?id=${id}&name=${name}`);
    }
    render() {
        return (
            <div style={{ backgroundImage: `linear-gradient(to right bottom, rgba(0, 32, 91, 0.2), rgba(4, 30, 66, 0.6)), url('${this.props.event.IMAGE}')`, backgroundSize: "cover", borderRadius: 10, height: "80vh" }}>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 50 }}>
                    <div style={{ width: "60%", display: "flex", justifyContent: "center" }}>

                        <div style={{ width: "100%" }}>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <img style={{ width: 140, height: 100, marginTop: 50 }} src={logo} />
                            </div>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <text style={{ color: "#E9072B", fontSize: 25, fontWeight: "bold", marginTop: 20 }}>Event Name: {this.props.event.id}</text>
                            </div>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <div style={{ marginTop: 40 }}>
                                    <text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>{this.props.event.STARTDATE.split("T")[0]} - {this.props.event.ENDDATE.split("T")[0]}</text>
                                </div>
                            </div>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <div>
                                    <text style={{ color: "white" }}>Karachi, Pakistan</text>
                                </div>
                            </div>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <div style={{ marginTop: 20 }}>
                                    <text style={{ color: "white", textAlign: "center" }}>{this.props.event.TAGLINE}</text>
                                </div>
                            </div>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <div>
                                    <button type="button" class="btn btn-outline-secondary" style={{ width: 200, height: 40, marginTop: 20 }}><text style={{ fontWeight: "bold", color: "#E9072B" }} onClick={() => { this.navigate(this.props.event.id, this.props.name) }}>View Event</text></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 40 }}>
                    <div style={{ width: "80%", marginBottom: 50, borderBottomColor: "#E9072B", borderBottomWidth: 3 }}>
                        <text style={{ color: "white" }}>{this.props.event.description}</text>
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <text style={{ color: "white" }}>Share this event!</text>
                </div>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 15 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", width: 200, marginBottom: 50 }}>
                        <LogoFacebook
                            color={'white'}
                            height="40px"
                            width="40px"
                            onClick={() => alert('Hi!')}
                        />
                        <LogoInstagram
                            color={'white'}
                            height="40px"
                            width="40px"
                            onClick={() => alert('Hi!')}
                        />
                        <LogoYoutube
                            color={'white'}
                            height="40px"
                            width="40px"
                            onClick={() => alert('Hi!')}
                        />
                        <LogoReddit
                            color={'white'}
                            height="40px"
                            width="40px"
                            onClick={() => alert('Hi!')}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(CurrentEvent);
