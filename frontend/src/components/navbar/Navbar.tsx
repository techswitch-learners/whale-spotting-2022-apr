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
        <Link to="/report-sighting">Report Sighting</Link>
        <Link to="/ticket-booking">Book Tickets</Link>
        <Link to="/sightings-list">Sightings List</Link>
        {!loginContext.isLoggedIn ? (
          <Link className="button is-primary" to="/login">
            Login
          </Link>
        ) : (
          <>
            <Link to="/pending-sights">Pending Sightings</Link>
            <Link
              onClick={loginContext.logOut}
              className="button is-primary"
              to="/"
            >
              Logout
            </Link>
          </>
        )}
      </span>
      <button className="menu-toggle" onClick={toggleMenu}>
        <FontAwesomeIcon color="#00aeff" icon={faBars} />
      </button>
    </nav>
  );
};
