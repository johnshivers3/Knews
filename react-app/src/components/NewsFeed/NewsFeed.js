import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import * as newsFeedActions from "../../store/newsfeed.js";
import * as preferenceActions from "../../store/preferences";
import * as articleActions from "../../store/articles";
import Logo from "../images/Logo.js";

import "./NewsFeed.css";

export const NewsFeed = () => {
  const dispatch = useDispatch();
  const topHeadlines = useSelector((state) => state.newsfeed.news?.articles);
  const userPreferences = useSelector((state) => state.preferences.preferences);
  const user = useSelector((state) => state.session.user);

  const [hTheme, setHTheme] = useState("rgba(36, 22, 129, 0.678)");

  const [bgTheme, setBgTheme] = useState("rgba(0, 0, 0, 0.15)");

  const appTheme = { background: bgTheme };
  const headingStyle = { color: hTheme };
  const splashTheme = { background: "var(--main-purple)" };

  useEffect(() => {
    dispatch(newsFeedActions.getTopHeadlines());

    return () => dispatch(newsFeedActions.cleanUpFeed());
  }, [dispatch]);

  // Collect user preferences
  useEffect(() => {
    // dispatch(preferenceActions.getUserPreferences());
    if (userPreferences?.theme === "Dark") {
      setBgTheme("rgba(0, 0, 0, 0.75)");
      setHTheme("whitesmoke");
    }
    return () => {
      dispatch(preferenceActions.cleanUpPreferences());
    };
  }, [dispatch]);

  // Save article to database

  const addArticle = (article) => {
    dispatch(articleActions.addArticle(article));
  };

  return (
    <div className="theme-wrapper" style={appTheme}>
      <span id="splash-feed" style={splashTheme}>
        <Logo />
        <h1 id="newsfeed-heading" style={headingStyle}>
          KNEWS
        </h1>
        <div>
          {!user ? (
            <>
              <h2>Curate your news experience</h2>
              <h3>
                <a
                  style={{
                    fontWeight: "bold",
                    fontSize: "larger",
                    color: `${headingStyle.color}`,
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
            </>
          ) : (
            <h2 id="welcome-sign">Welcome to your personal Knews app</h2>
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
            <h4>Developed by John Shivers</h4>

          </div>
        </div>
      </span>
      <div id="main-newsfeed-div">
        <div className="newsfeed-header-div">
          <h1 style={headingStyle}>Top Stories</h1>
        </div>
        <div>
          {topHeadlines && (
            <>
              <div className="highlight-section">
                <img
                  src={topHeadlines[0].urlToImage}
                  alt={topHeadlines[0].title}
                  height="100px"
                  width="100px"
                />
                <div className="highlight-content">
                  <a
                    href={topHeadlines[0].url}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <h3>{topHeadlines[0].title}</h3>
                  </a>
                  <hr />
                  <p>
                    {topHeadlines[0].content.substring(
                      0,
                      topHeadlines[0].content.indexOf("[")
                    )}
                  </p>
                  <div className="top link-div">
                    <a
                      href={topHeadlines[0].url}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {topHeadlines[0].source.name}
                    </a>

                    <button
                      className="save top"
                      onClick={() => addArticle(topHeadlines[0])}
                    ></button>
                  </div>
                  <p className="author">Author: {topHeadlines[0].author}</p>
                </div>
              </div>
            </>
          )}
        </div>
        <div></div>
        {topHeadlines &&
          topHeadlines.slice(1).map((article, i) => {
            switch (i) {
              case 0:
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                return (
                  <div className="upper-section" key={`${i}-${article.url}`}>
                    <img
                      src={article.urlToImage}
                      alt={article.title}
                      height="100px"
                      width="100px"
                    />
                    <div className="upper-content">
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        <h3>{article.title}</h3>
                      </a>
                      <hr />
                      <p>
                        {article.content.substring(
                          0,
                          article.content.indexOf("[")
                        )}
                      </p>
                      <div className="upper link-div">
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          {article.source.name}
                        </a>
                        <button
                          className="save upper"
                          onClick={() => addArticle(article)}
                        ></button>
                      </div>
                      <p className="author">Author: {article.author}</p>
                    </div>
                  </div>
                );
              default:
                return (
                  <div className="lower-section" key={`${i}-${article.url}`}>
                    <div>
                      <img src={article.urlToImage} alt={article.title} />
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        <h4>{article.title}</h4>
                      </a>
                      <hr />
                      <div className="lower link-div">
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          {article.source.name}
                        </a>
                        <button
                          className="save lower"
                          onClick={() => addArticle(article)}
                        ></button>
                      </div>
                    </div>
                  </div>
                );
            }
          })}
      </div>
    </div>
  );
};

export default NewsFeed;
