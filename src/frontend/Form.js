import React, { useState, useEffect } from 'react';
import axios from 'axios';
const Form = (props) => {
    const [data, setData] = useState({ team: "", members: [] });
    const [teamName, setteamName] = useState("");
    const [memberName, setMemberName] = useState([]);
    const [memberEmail, setMemberEmail] = useState([]);
    const [memberList, setMemberList] = useState([]);
    console.log(props);
    console.log("length", memberList.length);
    const handleFormSubmit = (e) => {
        e.preventDefault();
        [...Array(props.maxplayers)].map((memName, index) => {
            setMemberList((memberList) => [
                ...memberList,
                { name: memberName[index], email: memberEmail[index] },
            ]);
        });
    };
    useEffect(async () => {
        let teamData = {
            tour_id: props.tour_id,
            team_name: teamName,
            members: memberList,
        };

        if (teamData.members[0] != null && teamData.members.length != 0) {
            await console.log(memberList, teamData)
            let res = await axios({
                method: "POST",
                url: "http://localhost:4500/registerTeam",
                data: {teamData},
            });
        }
    }, [memberList]);
    const handleteamChange = (e) => {
        let name = e.target.value;
        setteamName(name);
    };
    const handlenameChange = (i) => (e) => {
        setMemberName({ ...memberName, [i]: e.target.value });
    };

    const handleemailChange = (i) => (e) => {
        setMemberEmail({ ...memberEmail, [i]: e.target.value });
    };
    return (
        <form onSubmit={handleFormSubmit}>
            <label> Team Name</label>
            <input
                type="text"
                name="text"
                value={teamName}
                placeholder="Team Name"
                onChange={handleteamChange}
            />
            <br />
            {[...Array(props.maxplayers)].map((x, i) => {
                return (
                    <div key={i}>
                        <label>
                            Member {i + 1} Name{" "}
                            <input
                                type="text"
                                name="text"
                                value={memberName[i]}
                                placeholder="Name"
                                onChange={handlenameChange(i)}
                            />
                        </label>
                        <label>
                            Member {i + 1} Email{" "}
                            <input
                                type="email"
                                name="email"
                                value={memberEmail[i]}
                                placeholder="Email"
                                onChange={handleemailChange(i)}
                            />
                        </label>
                        <br />
                    </div>
                );
            })}
            <button>Save</button>
        </form>
    );
}

export default Form;