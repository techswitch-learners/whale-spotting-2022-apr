import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../login/LoginManager";
import "./Navbar.scss";

export const Navbar: React.FunctionComponent = () => {
  const loginContext = useContext(LoginContext);

  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-secondary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            className="navbar__logo"
            src="/logo.png"
            alt="Whale Spotting logo"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarToggler"
          aria-controls="navbarToggler"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarToggler">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link fs-5 text-light" to="/sightings">
                Sightings
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fs-5 text-light" to="#">
                Species
              </Link>
            </li>
          </ul>
          <div className="navbar-nav mt-n1">
            <span className="nav-item ps-0">
              {!loginContext.isLoggedIn ? (
                <Link
                  className="nav-link fs-5 ps-0 text-light"
                  to="/admin/login"
                >
                  Log In
                </Link>
              ) : (
                <span
                  role="button"
                  onClick={loginContext.logOut}
                  className="navbar__right-component--logout nav-link fs-5 ps-0 text-light"
                >
                  Log Out
                </span>
              )}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};
