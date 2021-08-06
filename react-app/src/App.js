import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Logo from "./components/images/Logo";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer/Footer";
import NewsFeed from "./components/NewsFeed/NewsFeed";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import Dashboard from "./components/Dashboard/Dashboard";
import Results from "./components/Results/Results";
import Error  from "./components/Error";
import { authenticate } from "./store/session";

function App(store) {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  const banner = (
    <span id="splash-feed" style={{ color: "rgba(36, 22, 129, 0.678)" }}>
      <Logo />
      <h1 id="newsfeed-heading" style={{ color: "rgba(36, 22, 129, 0.978)" }}>
        KNEWS
      </h1>
      <div>
        <h2>Curate your news experience</h2>
        <h3>
          <a
            style={{
              fontWeight: "bold",
              fontSize: "larger",
              marginRight: "10px",
            }}
            href="/signup"
          >
            Sign Up
          </a>
          to view the stories YOU want to see
        </h3>
        <h3>Quickly search for followed topics</h3>
        <h3>Save articles to read later</h3>

        <div id="contact-links-div">
          <h4>Developed by John Shivers</h4>

          <div id="git">
            <Link
              to={{ pathname: "https://github.com/johnshivers3/Knews" }}
              target="_blank"
              rel="noreferrer noopener"
              className="contact-links"
            ></Link>
          </div>
          <div id="linkedin">
            <Link
              to={{
                pathname: "https://www.linkedin.com/in/john-shivers3/",
              }}
              target="_blank"
              rel="noreferrer noopener"
              className="contact-links"
            ></Link>
          </div>
        </div>
      </div>
    </span>
  );

  return (
    <BrowserRouter>
      <NavBar />

      <Switch>
        <Route path="/login" exact={true}>
          <div className="no-theme-wrapper">
            <LoginForm />
            {banner}
          </div>
        </Route>
        <Route path="/sign-up" exact={true}>
          <div className="no-theme-wrapper">
            <SignUpForm />
            {banner}
          </div>
        </Route>
        <Route path="/results" exact={true}>
          <Results />
        </Route>
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/dashboard/:userId" exact={true}>
          <Dashboard />
        </ProtectedRoute>
        <Route path="/" exact={true}>
          <NewsFeed />
        </Route>
        <Route path="/">
          <Error/>
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
