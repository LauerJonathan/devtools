import React, { useState } from "react";
import "./index.css";

/********** import media here ***********/
import logoDevtools from "../../assets/media/logodevtools.png";

import { Link } from "react-router-dom";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav className={open ? "open" : ""}>
      <div className="nav">
        <img className="logo" src={logoDevtools} alt="logo devtools" />
        <div className="navContent">
          <ul>
            <li className="active">
              <Link to="/">Accueil</Link>
            </li>
            <li>
              <Link to="/loader">StyleSheet framework</Link>
            </li>
          </ul>
        </div>
      </div>
      <button onClick={() => setOpen(!open)}>{!open ? "𓃑" : "X"}</button>
    </nav>
  );
};

export default NavBar;
