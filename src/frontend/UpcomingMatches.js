import react, { Component, setState } from 'react';
import axios from 'axios';
class UpcomingMatches extends Component {
    constructor() {
        super();
        this.state = {
            upcoming: []
        }
    }
    componentDidMount = async () => {
        let res = await axios({
            method: "GET",
            url: `http://localhost:4500/upcomingMatches/${this.props.id}`
        });
        this.setState({ upcoming: [...this.state.upcoming, ...res.data] })
        console.log("upcoming: ", res.data);
    }
    render() {
        return (
            <>
                {
                    this.state.upcoming.length != 0 ?
                        <>
                            <div style={{ borderLeftWidth: 6, borderLeftColor: "#E9072B", marginLeft: "5%", marginTop: 100 }}>
                                <text style={{ fontSize: 40, fontFamily: "Roboto", fontWeight: "bold", paddingLeft: 20 }}>Upcoming Matches</text>
                            </div>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 50 }}>
                                <div style={{ width: "80%", backgroundColor: "pink" }}>
                                    {
                                        this.state.upcoming.map((match, index) => (
                                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 10, backgroundColor: "#041E42", height: 180, flexDirection: "column" }}>
                                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "80%", flexDirection: "row" }}>
                                                    <div style={{ width: "20%" }}>
                                                        <div style={{ display: "flex", height: 100, justifyContent: "center", alignItems: "center", backgroundColor: "white", borderRadius: 10 }}>
                                                            <text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}>{match.teamA}</text>
                                                        </div>
                                                    </div>
                                                    <div style={{ width: "20%" }}>
                                                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                            <text style={{ textAlign: "center", color: "#E9072B", fontSize: 25, fontWeight: "bold" }}>VS</text>
                                                        </div>
                                                    </div>
                                                    <div style={{ width: "20%" }}>
                                                        <div style={{ display: "flex", height: 100, justifyContent: "center", alignItems: "center", backgroundColor: "white", borderRadius: 10 }}>
                                                            <text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}>{match.teamB}</text>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
                                                        {match.match_date.split("T")[0]}
                                                    </text>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </>
                        : <></>
                }
            </>
        );
    }
}

export default UpcomingMatches;