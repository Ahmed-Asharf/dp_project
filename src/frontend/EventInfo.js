import React, { Component } from 'react';
import Header from './Header'
import background from '../images/bg.jpeg';
import Backdrop from './Backdrop';
import SuperTab from './SuperTab';
import axios from 'axios';
import './Usercard.css'
import Slider from './Slider';
import Footer from './Footer';
import { Cards } from './Cards';

const urls = ["https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500", background]


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
        const id = this.props.location.search.split("id=")[1].split("&")[0];
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
        console.log("userobject:", this.state.user[0]);
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
            // <div>
            //     <div style={{ backgroundImage: `url(${background})` }}>
            //         <Header drawerEvent={this.drawerEvent} logged={true} />
            //         <div style={{ marginTop: 50, display: "flex", alignItems: "center", justifyContent: "center" }}>
            //             <div style={{ width: "90%", height: 200, backgroundColor: "pink", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            //                 {/* here */}
            //                 {
            //                     this.state.clickedEvent.map((event, index) => (
            //                         <div style={{ display: "flex", width: "100%", height: 150, flexDirection: "column", alignItems: "center", justifyContent: "space-between" }}>
            //                             <text style={{ color: "white", fontSize: 20 }}>{event.STARTDATE}</text>
            //                             <text style={{ color: "white" }}>{event.ENDDATE}</text>
            //                             <text style={{ color: "white" }}>{event.description}</text>
            //                             {
            //                                 this.state.name == "undefined" ? <button class="btn btn-outline-secondary" onClick={this.registerUser}>Login to Register</button> :
            //                                     this.state.user.map((user, index) => (
            //                                         user.tour_id == null ? this.state.count == event.maxplayers ? <button class="btn btn-outline-secondary">Registrations closed!</button> :
            //                                             <button class="btn btn-outline-secondary" onClick={this.registerUser}>Register</button> :
            //                                             user.tour_id == this.state.id ?
            //                                                 <button class="btn btn-outline-secondary" onClick={this.cancelRegistration}>Cancel Registration</button> :
            //                                                 <button class="btn btn-outline-secondary">Already Registered in a tournament</button>
            //                                     ))

            //                             }

            //                         </div>
            //                     ))
            //                 }
            //             </div>
            //         </div>
            //         <div style={{ position: "absolute", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            //             <SuperTab show={this.state.sideDrawerOpen} />
            //         </div>
            //         <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 100 }}>
            //             <div style={{ width: "80%" }}>
            //                 <text style={{ color: "#ffbf00", fontSize: 20, fontWeight: "bold" }}>More On Going Events</text>
            //             </div>
            //         </div>
            //         <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            //             <div style={{ width: "80%" }}>
            //                 <Slider id={this.state.id} />
            //             </div>
            //         </div>
            //         {backdrop}
            //     </div>
            // </div>
            <div>
                <link href='http://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css' />
                <Header drawerEvent={this.drawerEvent} />
                <div style={{ height: "120vh", backgroundImage: `linear-gradient(to right bottom, rgba(0, 32, 91, 0.2), rgba(4, 30, 66, 0.4)), url('${background}')`, backgroundSize: "cover" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ width: "90%", height: 200, backgroundColor: "pink", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            {/* here */}
                            {
                                this.state.clickedEvent.map((event, index) => (
                                    <div style={{ display: "flex", width: "100%", height: 150, flexDirection: "column", alignItems: "center", justifyContent: "space-between" }}>
                                        <text style={{ color: "white", fontSize: 20 }}>{event.STARTDATE}</text>
                                        <text style={{ color: "white" }}>{event.ENDDATE}</text>
                                        <text style={{ color: "white" }}>{event.description}</text>
                                        {
                                            this.state.name == "undefined" ? <button class="btn btn-outline-secondary" onClick={this.registerUser}>Login to Register</button> :
                                                this.state.user.map((user, index) => (
                                                    user.tour_id == null ? this.state.count == event.maxplayers ? <button class="btn btn-outline-secondary">Registrations closed!</button> :
                                                        <button class="btn btn-outline-secondary" onClick={this.registerUser}>Register</button> :
                                                        user.tour_id == this.state.id ?
                                                            <button class="btn btn-outline-secondary" onClick={this.cancelRegistration}>Cancel Registration</button> :
                                                            <button class="btn btn-outline-secondary">Already Registered in a tournament</button>
                                                ))

                                        }

                                    </div>
                                ))
                            }
                        </div>
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
                                {this.state.clickedEvent.map((event, index) => (
                                    <Slider id={1} />
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
        );
    }
}

export default Event;