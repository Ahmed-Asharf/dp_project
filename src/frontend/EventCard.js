import React, { Component } from "react";
import background from '../images/csgo.jpeg';
import axios from 'axios';

class EventCard extends Component {
    constructor() {
        super();
        this.state = {
            event: []
        }
    }
    componentDidMount = async () => {
        const res = await axios({
            method: "GET",
            url: "http://localhost:4500/eventinfo/" + this.props.tour_id
        });
        this.setState({ event: [...this.state.event, ...[res.data]] })
    }
    render() {
        return (
            <article className="card" style={{ height: 200, marginBottom: 50, cursor: "pointer" }}>
                <div className="card__media">
                    <img
                        src={background}
                        alt="Card"
                        style={{ width: "100%", height: 120 }}
                    />
                    <div className="card__date">
                        <span className="date--day">27</span>
                        <span className="date--month">Mar</span>
                    </div>
                    <span className="card__category">Photos</span>
                </div>
                <div>
                    <header>
                        {this.state.event.map((event, index)=>(
                            <h2 className="card__title" style={{marginTop: 30, marginLeft: 20}}>{event.tour_name}</h2>
                        ))}
                    </header>
                </div>
            </article>
        );
    }
};

export default EventCard;
