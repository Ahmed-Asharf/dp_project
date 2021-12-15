import React from "react";
import { Link, BrowserRouter, useHistory } from 'react-router-dom';

import "./NavBar.css";

const NavBar = (props) => {
  const history = useHistory();
  const navigate = (e) => {
    e.preventDefault();
    history.push(`/dashboard?name=${props.name}`);
  }
  return (
    <nav className="navBar">
      <ul className="navBarLink">
        <Link to="/"><li>Home</li></Link>
        <li>Events </li>
        {
          props.logged ? <li onClick={navigate}>Dashboard</li>:<></>
        }
      </ul>
    </nav>
  );
};

export default NavBar;
