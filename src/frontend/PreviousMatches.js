import react, { Component } from 'react';
import axios from 'axios';

class PreviousMatches extends Component {
    constructor() {
        super();
        this.state = {
            previous: []
        }
    }
    componentDidMount = async () => {
        let res = await axios({
            method: "GET",
            url: `http://localhost:4500/previousMatches/${this.props.id}`
        });
        this.setState({ previous: [...this.state.previous, ...res.data] })
        console.log("previous:", res.data);
    }
    render() {
        return (
            <>
                {
                    this.state.previous.length != 0 ?
                        <>
                            <div style={{ borderLeftWidth: 6, borderLeftColor: "#E9072B", marginLeft: "5%", marginTop: 100 }}>
                                <text style={{ fontSize: 40, fontFamily: "Roboto", fontWeight: "bold", paddingLeft: 20 }}>Previous Matches</text>
                            </div>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 50 }}>
                                <div style={{ width: "80%" }}>
                                    {
                                        this.state.previous.map((match, index) => (
                                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 10, backgroundColor: "#041E42", height: 180, flexDirection: "column" }}>
                                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "80%", flexDirection: "row" }}>
                                                    <div style={{ width: "20%", opacity: match.winner == match.teamB ? 0.5 : 1 }}>
                                                        <div style={{ display: "flex", height: 100, justifyContent: "center", alignItems: "center", backgroundColor: match.winner == match.teamA ? "white" : "red", borderRadius: 10, borderColor: "#E9072B", borderWidth: match.winner == match.teamA ? 6 : 0 }}>
                                                            <text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}>{match.teamA}</text>
                                                        </div>
                                                    </div>
                                                    <div style={{ width: "20%" }}>
                                                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                            <text style={{ textAlign: "center", color: "#E9072B", fontSize: 25, fontWeight: "bold" }}>VS</text>
                                                        </div>
                                                    </div>
                                                    <div style={{ width: "20%", opacity: match.winner == match.teamA ? 0.5 : 1}}>
                                                        <div style={{ display: "flex", height: 100, justifyContent: "center", alignItems: "center", backgroundColor: match.winner == match.teamA ? "white" : "red", borderRadius: 10, borderColor: "#E9072B", borderWidth: match.winner == match.teamB ? 6 : 0  }}>
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

export default PreviousMatches;