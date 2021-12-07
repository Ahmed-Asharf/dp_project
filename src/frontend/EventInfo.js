import React, { Component } from 'react';
import Header from './Header'
import background from '../images/bg.jpeg';
import Backdrop from './Backdrop';
import SuperTab from './SuperTab';
import axios from 'axios';
import './Usercard.css'
import Slider from './Slider';
import picture from '../images/thor.PNG';
class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            clickedEvent: [],
            id: 0,
            name: "",
            user: [],
            count: 0
        }
    }
    async componentDidMount() {
        const id = this.props.location.search.split("id=")[1].split("&&")[0];
        const name = this.props.location.search.split("name=")[1];
        this.state.id = id;
        this.state.name = name;
        let res = await axios({
            method: "GET",
            url: `http://localhost:4500/registeredPlayers/${id}`
        });
        if (res.data.length) {
            this.state.count = res.data[0].count;
        }
        console.log("count:", this.state.count);
        res = await axios({
            method: "GET",
            url: "http://localhost:4500/events"
        });
        this.setState({ events: [...this.state.events, ...res.data] })
        console.log(this.state.events);
        res = await axios({
            method: "GET",
            url: `http://localhost:4500/eventinfo/${id}`
        });
        this.setState({ clickedEvent: [...this.state.clickedEvent, ...res.data] })
        res = await axios({
            method: "GET",
            url: `http://localhost:4500/playerprofile/${name}`
        });
        this.setState({ user: [...this.state.user, ...res.data.data.docs] })
        console.log("userobject:", this.state.clickedEvent[0]);
    }
    drawerEvent = () => {
        this.setState((prevState) => {
            return { sideDrawerOpen: !prevState.sideDrawerOpen }
        });
    }

    backdropEvent = () => {
        this.setState({ sideDrawerOpen: false });
    };
    registerUser = async (e) => {
        console.log(this.state.id, this.state.name);
        try {
            e.preventDefault();
            const data = {
                tour_id: this.state.id,
                id: this.state.user[0].id
            }
            const res = await axios({
                method: "POST",
                url: "http://localhost:4500/regUserEvent",
                data,
            });
            if (res.data.status === "success") {
                //redirect to dashboard
                alert(res.data.status);
            } else {
                throw new Error("Email and Password does not exist");
            }
        } catch (err) {
            alert(err.message);
        }
    }
    cancelRegistration = async (e) => {
        console.log(this.state.id, this.state.name);
        try {
            e.preventDefault();
            const data = {
                tour_id: this.state.id,
                id: this.state.user[0].id
            }
            const res = await axios({
                method: "POST",
                url: "http://localhost:4500/cancelReg",
                data,
            });
            if (res.data.status === "success") {
                //redirect to dashboard
                alert(res.data.status);
            } else {
                throw new Error("Email and Password does not exist");
            }
        } catch (err) {
            alert(err.message);
        }
    }
    render() {
        let backdrop;
        if (this.state.sideDrawerOpen) {
            backdrop = <Backdrop click={this.backdropEvent} />
        }
        return (
            <div>
                {this.state.user.map((user, index) => (
                    <div style={{ backgroundImage: `url(${background})` }}>
                        <Header drawerEvent={this.drawerEvent} />
                        <div style={{ display: "flex", width: "95%", justifyContent: "space-between", marginTop: 40 }}>
                            <text></text>
                            <div className="card" style={{ width: 200, backgroundColor: "white", borderRadius: 10, alignItems: "center" }}>
                                <div className="avatar">
                                    <img
                                        src={picture}
                                        className="card-img-top"
                                        alt=""
                                    />
                                </div>
                                <h5 className="card-title">
                                    {user.userName}
                                </h5>
                                <p className="card-text">
                                    {user.EMAIL}
                                </p>
                            </div>
                        </div>
                        <div style={{ marginTop: 50, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <div style={{ width: "90%", height: 200, backgroundColor: "pink", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                {/* here */}
                                {
                                    this.state.clickedEvent.map((event, index) => (
                                        <div style={{ display: "flex", width: "100%", height: 150, flexDirection: "column", alignItems: "center", justifyContent: "space-between" }}>
                                            <text style={{ color: "white", fontSize: 20 }}>{event.STARTDATE}</text>
                                            <text style={{ color: "white" }}>{event.ENDDATE}</text>
                                            <text style={{ color: "white" }}>{event.description}</text>
                                            {
                                                user.tour_id == null ? this.state.count == event.maxplayers ? <button class="btn btn-outline-secondary">Registrations closed!</button> :
                                                <button class="btn btn-outline-secondary" onClick={this.registerUser}>Register</button> :
                                                user.tour_id == this.state.id ?
                                                    <button class="btn btn-outline-secondary" onClick={this.cancelRegistration}>Cancel Registration</button> :
                                                    <button class="btn btn-outline-secondary">Already Registered in another tournament</button>
                                                        
                                            }

                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div style={{ position: "absolute", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <SuperTab show={this.state.sideDrawerOpen} />
                        </div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 100 }}>
                            <div style={{ width: "80%" }}>
                                <text style={{ color: "#ffbf00", fontSize: 20, fontWeight: "bold" }}>More On Going Events</text>
                            </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <div style={{ width: "80%" }}>
                                <Slider name={user.userName} id={this.state.id} />
                            </div>
                        </div>
                        {backdrop}
                    </div>
                ))}
            </div>
        );
    }
}

export default Event;