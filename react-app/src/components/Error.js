import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Logo from "./images/Logo";

export const Error = () => {
  const [countdown, setCountdown] = useState(5);
  const history = useHistory();
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

  useEffect(() => {
    if (countdown <= 0) history.push('/feed/light')
    const interval = setInterval(() => setCountdown((prev) => prev - 1), 1000);

    return () => {
      clearInterval(interval);
    };

  }, [countdown, history]);
  return (
    <div id="div-404">
      <div id="alien"></div>
      <h1>Something went wrong...</h1>
      <h2>Redirecting to the main page... {countdown}</h2>
      {banner}
    </div>
  );
};

export default Error;
