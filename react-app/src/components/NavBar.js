import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import { Logo } from "./images/Logo";
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav>
      <div id="logo-nav">
        <Logo />
      </div>
      <div id="middle-nav"></div>
      <div id="links-nav">
        <input type="checkbox" id="hidden-check"></input>
        <label htmlFor="hidden-check" className="transition-wrapper">
          <div className="transition-wrapper">
            <ul>
              <li>
                <NavLink to="/" exact={true} activeClassName="active">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/login" exact={true} activeClassName="active">
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/sign-up" exact={true} activeClassName="active">
                  Sign Up
                </NavLink>
              </li>
              <li>
                <NavLink to="/users" exact={true} activeClassName="active">
                  Users
                </NavLink>
              </li>
              <li>
                <LogoutButton />
              </li>
              <li></li>
              <li id='ellipsis-li'>
                <i className="fas fa-ellipsis-h"></i>
              </li>
            </ul>
          </div>
        </label>
      </div>
    </nav>
  );
};

export default NavBar;
