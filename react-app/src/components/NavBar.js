import React, { useState, useEffect } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LogoutButton from "./auth/LogoutButton";
import { Logo } from "./images/Logo";
import { authenticate, login } from "../store/session";
import "./NavBar.css";

const NavBar = () => {
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);


  const loginDemoUser = () => {
    const email = "demo@aa.io";
    const password = "password";
    dispatch(login(email, password));
    // dispatch(authenticate())
  };

  if (user) {
    history.push("/");
  }

  return (
    <nav>
      <div id="logo-nav">
        <Link to="/">
          <Logo />
        </Link>
        <h1>KNEWS</h1>
      </div>
      <div id="middle-nav"></div>
      <div id="links-nav">
        <input type="checkbox" id="hidden-check"></input>
        <label
          htmlFor="hidden-check"
          className={`transition-wrapper`}
        >
          <div className="transition-wrapper">
            <ul>
              <li>
                <NavLink to="/" exact={true} activeClassName="active">
                  Home
                </NavLink>
              </li>
              {!user && (
                <>
                  <li>
                    <NavLink to="/login" exact={true} activeClassName="active">
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/sign-up"
                      exact={true}
                      activeClassName="active"
                    >
                      Sign Up
                    </NavLink>
                  </li>

                  <li>
                    <button onClick={loginDemoUser}>Demo</button>
                  </li>
                </>
              )}
              {user ? (
                <>
                  <li>
                    <NavLink
                      to={`/dashboard/${user.id}`}
                      exact={true}
                      activeClassName="active"
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <LogoutButton />
                  </li>
                </>
              ) : null}

              <li id="ellipsis-li">
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
