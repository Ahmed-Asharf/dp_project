import React from "react";
import { Link, BrowserRouter as Router } from 'react-router-dom';

import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className="navBar">
      <ul className="navBarLink">
        <Link to="/"><li>Home</li></Link>
        <li>Events </li>
      </ul>
    </nav>
  );
};

export default NavBar;
