import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../login/LoginManager";
import "./Navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export const Navbar: React.FunctionComponent = () => {
  const loginContext = useContext(LoginContext);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{ backgroundColor: "#7fbeeb" }}
    >
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
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item border rounded m-1 p-1">
              <Link
                className="nav-link text-center text-dark fs-5"
                to="/sightings"
              >
                Sightings
              </Link>
            </li>
            <li className="nav-item border rounded m-1 p-1">
              <Link className="nav-link text-center text-dark fs-5" to="#">
                Species
              </Link>
            </li>
            <li className="d-flex border rounded justify-content-center m-1 p-1">
              {!loginContext.isLoggedIn ? (
                <Link
                  className="nav-link text-center text-dark fs-5"
                  to="/admin/login"
                >
                  Login
                </Link>
              ) : (
                <span
                  onClick={loginContext.logOut}
                  className="nav-link text-center text-dark fs-5"
                >
                  Log Out
                </span>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
