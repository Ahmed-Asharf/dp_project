import React, { useState, useEffect } from "react";
import "./LeaderBoard.css";
import axios from 'axios';
const listOfArray = [
  {
    Rank: 1,
    Name: "Fighter",
    Points: 30,
  },
  {
    Rank: 1,
    Name: "Fighter",
    Points: 30,
  },
  {
    Rank: 1,
    Name: "Fighter",
    Points: 30,
  },
  {
    Rank: 1,
    Name: "Fighter",
    Points: 30,
  },
  {
    Rank: 1,
    Name: "Fighter",
    Points: 30,
  },
  {
    Rank: 1,
    Name: "Fighter",
    Points: 30,
  },
  {
    Rank: 1,
    Name: "Fighter",
    Points: 30,
  },
  {
    Rank: 1,
    Name: "Fighter",
    Points: 30,
  },

  {
    Rank: 1,
    Name: "Fighter",
    Points: 30,
  },
  {
    Rank: 1,
    Name: "Fighter",
    Points: 30,
  },
  {
    Rank: 1,
    Name: "Fighter",
    Points: 30,
  },
  {
    Rank: 1,
    Name: "Fighter",
    Points: 30,
  },
  {
    Rank: 1,
    Name: "Fighter",
    Points: 30,
  },

  {
    Rank: 1,
    Name: "Fighter",
    Points: 30,
  },
  {
    Rank: 1,
    Name: "Fighter",
    Points: 30,
  },
  {
    Rank: 1,
    Name: "Fighter",
    Points: 30,
  },
  {
    Rank: 1,
    Name: "Fighter",
    Points: 30,
  },
  {
    Rank: 1,
    Name: "Fighter",
    Points: 30,
  },
  {
    Rank: 10,
    Name: "Fighter",
    Points: 30,
  },
];

const LeaderBoard = (props) => {
  const [teams, setTeams] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [prevdisable, setprevdisable] = useState(true);
  const [nextdisable, setnextdisable] = useState(false);
  const perPage = 10;
  useEffect(() => {
    const api = async () => {
      console.log("event id: ", props.id);
      let res = await axios({
        url: `http://localhost:4500/leaderboard/${props.id}`
      })
      console.log(res.data);
      setTeams(res.data)
      console.log("teams", teams);
    };api();
  }, [])
  const pagesVisited = pageNumber * perPage;
  const displayUsers = teams
    .slice(pagesVisited, pagesVisited + perPage)
    .map((lis, index) => {
      return (
        <tr>
          <td>{index+1}</td>
          <td>{lis.TEAM_NAME}</td>
          <td>{lis.SCORE}</td>
        </tr>
      );
    });
  const pageCount = Math.ceil(teams / perPage);
  const nextBtn = (e) => {
    setprevdisable(false);
    setPageNumber(pageNumber + 1);
    if ((pageNumber + 2) * perPage >= teams.length) setnextdisable(true);
  };
  const prevBtn = (e) => {
    setnextdisable(false);
    setPageNumber(pageNumber - 1);
    if ((pageNumber - 2) * perPage <= teams.length) setprevdisable(true);
  };
  return (
    <div>
      {
        teams.length != 0 ?
        <div>
      <div style={{ borderLeftWidth: 6, borderLeftColor: "#E9072B", marginLeft: "5%", marginTop: 50 }}>
        <text style={{ fontSize: 40, fontFamily: "Roboto", fontWeight: "bold", paddingLeft: 20 }}>Leaderboard</text>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <table className="styled-table" style={{ width: "80%", marginTop: 50 }}>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Team Name</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>{displayUsers}</tbody>
        </table>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 50
        }}
      >
        <button
          onClick={prevBtn}
          style={{
            pointerEvents: `${prevdisable ? "none" : ""}`,
            paddingTop: 10,
            paddingBottom: 10,
            paddingRight: 20,
            paddingLeft: 20,
            backgroundColor: `${prevdisable ? "#E9072B" : "#041e42"}`,
            borderRadius: "0.75rem",
            textAlign: "center",
            color: "white",
            border: "none",
            marginRight: 10,
          }}
        >
          prev
        </button>
        <button
          onClick={nextBtn}
          style={{
            pointerEvents: `${nextdisable ? "none" : ""}`,
            paddingTop: 10,
            paddingBottom: 10,
            paddingRight: 20,
            paddingLeft: 20,
            backgroundColor: `${nextdisable ? "grey" : "#041e42"}`,
            borderRadius: "0.75rem",
            textAlign: "center",
            color: "white",
            border: "none",
          }}
        >
          next
        </button>
      </div>
      </div>
      :<></>
     }
    </div>
  );
};

export default LeaderBoard;
