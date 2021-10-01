import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import Knews from "./components/Knews/Knews";
import Error from "./components/Error";
import { authenticate } from "./store/session";
import * as newsFeedActions from "./store/newsfeed.js";
import * as preferenceActions from "./store/preferences";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

function App({ store }) {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const userTheme = useSelector(
    (state) => state.preferences.preferences?.theme
  );

  const country = useSelector(
    (state) => state.preferences.preferences?.country
  );
  const defaultFeed = useSelector(
    (state) => state.preferences.preferences?.defaultFeed
  );

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      await dispatch(preferenceActions.getUserPreferences());
      await dispatch(newsFeedActions.getTopHeadlines( country ?? 'us', defaultFeed ?? 'general'));
      setLoaded(true);
    })();
  }, [dispatch, country, defaultFeed]);

  if (!loaded) {
    return null;
  }

  const banner = (
    <span id="splash-feed" style={{ color: "rgba(36, 22, 129, 0.678)" }}>
      <Logo />
      <div>
        <h1
          id="newsfeed-heading"
          style={{ color: "var(--main-purple)" }}
          onClick={() => window.location.reload(false)}
        >
          KNEWS
        </h1>
        <h2 id="tag-line">Your personal news app</h2>
      </div>
      <div>
        <>
          <h2>Curate your news experience</h2>
          <h3>
            <a
              style={{
                fontWeight: "bold",
                fontSize: "larger",
                color: `var(--main-purple`,
                marginRight: "10px",
              }}
              href="/sign-up"
              id="sign-up-link"
            >
              Sign Up
            </a>
            to view the stories YOU want to see
          </h3>
          <h3>Follow your favorite topics</h3>
          <h3>Save articles to read later</h3>
        </>

        <div id="contact-links-div">
          <div>
            <h4>Developed by John Shivers</h4>
            <Link
              to={{ pathname: "https://www.ShiversDevelopment.com/" }}
              target="_blank"
            >
              <h4>ShiversDevelopment.com</h4>
            </Link>
          </div>

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
  const options = {
    timeout: 2000,
    position: positions.MIDDLE,
  };
  return (
    <Provider template={AlertTemplate} {...options}>
      <BrowserRouter>
        <NavBar />

        <Switch>
          <Route path="/login" exact={true} >
            <div className="no-theme-wrapper">
              <LoginForm />
              {banner}
            </div>
          </Route>
          <Route path="/sign-up" exact={true} >
            <div className="no-theme-wrapper">
              <SignUpForm />
              {banner}
            </div>
          </Route>
          <Route path="/results/:query" exact={true} >
            <Results userTheme={userTheme} />
          </Route>
          <ProtectedRoute path="/users" exact={true} >
            <UsersList />
          </ProtectedRoute>
          <ProtectedRoute path="/dashboard/:userId" exact={true} >
            <Dashboard />
          </ProtectedRoute>
          <Route path="/feed/:pagetheme" exact={true} >
            <NewsFeed userTheme={userTheme}/>
          </Route>
          <Route path="/" exact={true} >
            <Knews />
          </Route>
          <Route>
            <Error />
          </Route>
        </Switch>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
