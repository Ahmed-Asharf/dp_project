import React, { Component } from "react";
import picture from '../images/thor.PNG';
import axios from 'axios';
class UserCards extends Component {
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
        console.log(name);
        let res = await axios({
            method: "GET",
            url: "http://localhost:4500/playerProfile/" + name
        });
        this.setState({ user: [...this.state.user, ...res.data.data.docs] })
        console.log("userobjectsas:", this.state);
    }
    render() {
        // this.useEffect()
        return (
            <div style={{ display: "flex", marginTop: 40 }}>
                {this.state.user.map((user, index) => (
                    <div className="card" style={{ width: 400, backgroundColor: "white", borderRadius: 10, height: 500 }}>
                        <div style={{ backgroundColor: "#041E42", height: 150, width: "100%", borderRadius: 10 }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <div style={{ width: "90%" }}>
                                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "85%" }}>
                                        <div className="avatar">
                                            <img
                                                src={picture}
                                                className="card-img-top"
                                                alt=""
                                                style={{ height: 100, width: 100, marginTop: 20 }}
                                            />
                                        </div>
                                        <h5 className="card-title" style={{ color: "white", textTransform: "uppercase", fontWeight: "bold", fontSize: 25 }}>
                                            {user.userName}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <div style={{ width: "90%" }}>
                                <div style={{ display: "flex", flexDirection: "column", marginTop: 30, justifyContent: "space-between", height: "100%" }}>
                                    <div style={{ borderLeftWidth: 4, borderLeftColor: "#E9072B" }}><text style={{ fontWeight: "bold", paddingLeft: 10 }}>Name:</text><text style={{ paddingLeft: 10 }}>{"Ahmed Naeem"}</text></div>
                                    <div style={{ borderLeftWidth: 4, borderLeftColor: "#E9072B", marginTop: 10 }}><text style={{ fontWeight: "bold", paddingLeft: 10 }}>Email:</text><text style={{ paddingLeft: 10 }}>{user.EMAIL}</text></div>
                                    <div style={{ borderLeftWidth: 4, borderLeftColor: "#E9072B", marginTop: 10 }}><text style={{ fontWeight: "bold", paddingLeft: 10 }}>Phone:</text><text style={{ paddingLeft: 10 }}>{user.phone}</text></div>
                                    <div style={{ borderLeftWidth: 4, borderLeftColor: "#E9072B", marginTop: 10 }}><text style={{ fontWeight: "bold", paddingLeft: 10 }}>Team:</text><text style={{ paddingLeft: 10 }}>{user.team_id != null ? user.team_id : "N/A"}</text></div>
                                    <div style={{ borderLeftWidth: 4, borderLeftColor: "#E9072B", marginTop: 10 }}><text style={{ fontWeight: "bold", paddingLeft: 10 }}>Event:</text><text style={{ paddingLeft: 10 }}>{user.tour_id != null ? user.tour_id : "N/A"}</text></div>
                                    <div style={{ borderLeftWidth: 4, borderLeftColor: "#E9072B", marginTop: 10 }}><text style={{ fontWeight: "bold", paddingLeft: 10 }}>Rank:</text><text style={{ paddingLeft: 10 }}>{"N/A"}</text></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

export default UserCards;
