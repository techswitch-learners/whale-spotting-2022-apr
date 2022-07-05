import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../login/LoginManager";
import "./Navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export const Navbar: React.FunctionComponent = () => {
  const loginContext = useContext(LoginContext);
  const [menuCollapsed, setmenuCollapsed] = useState(true);

  const toggleMenu = () => {
    setmenuCollapsed(!menuCollapsed);
  };

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <Link to="/">
        <img
          className="navbar__logo"
          src="/logo.png"
          alt="Whale Spotting logo"
        />
      </Link>
      <span className={`menu-items ${menuCollapsed && "menu-collapsed"}`}>
        {!loginContext.isLoggedIn ? (
          <Link className="menu-link" to="/login">
            Login
          </Link>
        ) : (
          <>
            <button onClick={loginContext.logOut} className="menu-link">
              Logout
            </button>
          </>
        )}
        <Link to="/sightings/create">Report a Sighting</Link>
      </span>
      <button className="menu-toggle" onClick={toggleMenu}>
        <FontAwesomeIcon color="#00aeff" icon={faBars} />
      </button>
    </nav>
  );
};
