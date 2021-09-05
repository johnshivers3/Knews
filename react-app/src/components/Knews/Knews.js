import Logo from "./../images/Logo";
import { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import Alien from "./../images/Alien.js";
import "./Knews.css";

export const Knews = ({ user, splashTheme, headingStyle }) => {
  const [welcome, setWelcome] = useState(false);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (location.pathname === "/") setWelcome(true);
  }, [location, history]);

  useEffect(() => {
    setTimeout(() => {
      if (welcome) history.push("/feed/light");
    }, 5000);
  }, [welcome, history]);

  return (
    <>
      <span
        id="splash-feed"
        className={welcome ? "welcome" : null}
        style={splashTheme}
      >
        <Logo />
        <div>
          <h1
            id="newsfeed-heading"
            style={headingStyle}
            onClick={() => window.location.reload(false)}
          >
            KNEWS
          </h1>
          <h2 id="tag-line">Your personal news app</h2>
        </div>
        <div>
          {welcome ? (
            <div>
              <h1>
                Welcome to Knews
                <br />
                Thanks for visiting.
                <br />
                Redirecting to feed...
              </h1>
            </div>
          ) : !user ? (
            <>
              <h2>Curate your news experience</h2>
              <h3>
                <a
                  style={{
                    fontWeight: "bold",
                    fontSize: "larger",
                    color: `${
                      headingStyle?.color
                        ? headingStyle?.color
                        : "var(--main-purple)"
                    }`,
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
          ) : (
            <>
              <h2>Curate your news experience</h2>
              <h3>Follow your favorite topics</h3>
              <h3>Save articles to read later</h3>
            </>
          )}
          <div id="contact-links-div">
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
                to={{ pathname: "https://www.linkedin.com/in/john-shivers3/" }}
                target="_blank"
                rel="noreferrer noopener"
                className="contact-links"
              ></Link>
            </div>
            <div>
              <h4>Developed by John Shivers</h4>
              <Link
                to={{ pathname: "https://www.ShiversDevelopment.com/" }}
                target="_blank"
              >
                <h4>ShiversDevelopment.com</h4>
              </Link>
            </div>
          </div>
        </div>
      </span>
      {welcome ? (
        <span id='rolling-alien'>
          <Alien />
        </span>
      ) : null}
    </>
  );
};

export default Knews;
