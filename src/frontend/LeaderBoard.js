import React, { useState } from "react";
import "./LeaderBoard.css";

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

const LeaderBoard = () => {
  const [users, setUsers] = useState(listOfArray);
  const [pageNumber, setPageNumber] = useState(0);
  const [prevdisable, setprevdisable] = useState(true);
  const [nextdisable, setnextdisable] = useState(false);
  const perPage = 10;
  const pagesVisited = pageNumber * perPage;
  const displayUsers = users
    .slice(pagesVisited, pagesVisited + perPage)
    .map((lis) => {
      return (
        <tr>
          <td>{lis.Rank}</td>
          <td>Fighter</td>
          <td>25</td>
        </tr>
      );
    });
  const pageCount = Math.ceil(listOfArray / perPage);
  const nextBtn = (e) => {
    setprevdisable(false);
    setPageNumber(pageNumber + 1);
    if ((pageNumber + 2) * perPage >= listOfArray.length) setnextdisable(true);
  };
  const prevBtn = (e) => {
    setnextdisable(false);
    setPageNumber(pageNumber - 1);
    if ((pageNumber - 2) * perPage <= listOfArray.length) setprevdisable(true);
  };
  return (
    <>
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
    </>
  );
};

export default LeaderBoard;
