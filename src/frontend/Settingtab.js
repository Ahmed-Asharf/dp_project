import React, { Component, useState } from "react";
import picture from '../images/thor.PNG';
import axios from 'axios';
import EventCard from './EventCard';
import background1 from '../images/thor.PNG';
import background2 from '../images/csgo2.jpeg';
import InputField from "../components/InputField";
import 'bootstrap/dist/css/bootstrap.min.css';

const urls = ["https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500", background1, background2]

class Participation extends Component {
    constructor() {
        super();
        this.state = {
            user: []
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
            url: "http://localhost:4500/usersName/" + name
        });
        this.setState({ user: [...this.state.user, ...res.data] })
    }
    handleChange = (e) => {
        // if (e.target.name === "email") setData({ ...data, email: e.target.value });
        // else setData({ ...data, password: e.target.value });
      };
    render() {
        // this.useEffect()
        return (
            <div className="card" style={{ width: 800, backgroundColor: "white", borderRadius: 10, display: "flex", alignItems: "center", marginTop: 40 }}>
                <div style={{ width: "90%" }}>
                    <div style={{ borderLeftWidth: 6, borderLeftColor: "#E9072B", marginTop: 30 }}>
                        <text style={{ fontSize: 30, fontFamily: "Roboto", fontWeight: "bold", paddingLeft: 20, color: "black" }}>Account Settings</text>
                    </div>
                    <div style={{ width: "100%", backgroundColor: "#68A2B9", marginTop: 20, height: 40, display: "flex", alignItems: "center", borderRadius: 10 }}>
                        <InputField
                            type="email"
                            name="email"
                            holder="Enter new email"
                            value={""}
                            className="w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
                            inputChange={this.handleChange}
                            style={{marginTop:20}}
                        />
                    </div>
                    <div style={{ width: "100%", backgroundColor: "#68A2B9", marginTop: 20, height: 100, display: "flex", alignItems: "center", borderRadius: 10 }}>
                        <InputField
                            type="email"
                            name="email"
                            holder="Enter new email"
                            value={""}
                            className="w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
                            inputChange={this.handleChange}
                            style={{marginTop:20}}
                        />
                    </div>
                    <div style={{display:"flex", width:"100%", justifyContent:"flex-end"}}>
                    <button type="button" class="btn btn-danger" style={{backgroundColor:"#E9072B", marginTop:30}}>Save changes</button>
                    </div>
                    <div style={{ borderLeftWidth: 6, borderLeftColor: "#E9072B", marginTop: 30 }}>
                        <text style={{ fontSize: 30, fontFamily: "Roboto", fontWeight: "bold", paddingLeft: 20, color: "black" }}>Password Settings</text>
                    </div>
                    <div style={{ width: "100%", backgroundColor: "#68A2B9", marginTop: 20, height: 40, display: "flex", alignItems: "center", borderRadius: 10 }}>
                        <InputField
                            type="password"
                            name="password"
                            holder="Current Password"
                            value={""}
                            className="w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
                            inputChange={this.handleChange}
                            style={{marginTop:20}}
                        />
                    </div>
                    <div style={{ width: "100%", backgroundColor: "#68A2B9", marginTop: 20, height: 40, display: "flex", alignItems: "center", borderRadius: 10 }}>
                        <InputField
                            type="email"
                            name="email"
                            holder="New Password"
                            value={""}
                            className="w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
                            inputChange={this.handleChange}
                            style={{marginTop:20}}
                        />
                    </div>
                    <div style={{ width: "100%", backgroundColor: "#68A2B9", marginTop: 20, height: 40, display: "flex", alignItems: "center", borderRadius: 10, marginBottom:50}}>
                        <InputField
                            type="email"
                            name="email"
                            holder="Confirm New Password"
                            value={""}
                            className="w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
                            inputChange={this.handleChange}
                            style={{marginTop:20}}
                        />
                    </div>
                    <div style={{display:"flex", width:"100%", justifyContent:"flex-end"}}>
                    <button type="button" class="btn btn-danger" style={{backgroundColor:"#E9072B", marginBottom:30}}>Save password</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Participation;
