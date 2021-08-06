import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import * as newsFeedActions from "../../store/newsfeed.js";
import * as preferenceActions from "../../store/preferences";
import * as articleActions from "../../store/articles";
import * as followActions from "../../store/follows";
import Logo from "../images/Logo.js";

// import "./Results.css";

export const Results = () => {
  const dispatch = useDispatch();
  const feedArticles = useSelector((state) => state.newsfeed.searchResults?.articles);

  const allFollows = useSelector((state) => state.follows?.allFollows);
  const userPreferences = useSelector((state) => state.preferences.preferences);
  const user = useSelector((state) => state.session.user);

  const [hTheme, setHTheme] = useState("rgba(36, 22, 129, 0.978)");
  const [bgTheme, setBgTheme] = useState("");

  const appTheme = { background: bgTheme };
  const headingStyle = { color: hTheme };
  const splashTheme = { background: "var(--main-purple)" };

  // Collect user preferences
  useEffect(() => {
    dispatch(preferenceActions.getUserPreferences());
    if (userPreferences?.theme === "Dark") {
      setBgTheme("rgba(0, 0, 0, 0.75)");
      setHTheme("whitesmoke");
    } else {
      setBgTheme("rgba(0, 0, 0, 0.15)");
    }

    return;
    // eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {
    if (user) dispatch(followActions.getAllFollows());

    return () => {
      dispatch(followActions.cleanUpFollows());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(newsFeedActions.getSearchResults());

    return () => {
      // dispatch(newsFeedActions.cleanUpFeed());
    };
  }, [dispatch]);

  // Save article to database

  const addArticle = async (article) => {
    const response = await dispatch(articleActions.addArticle(article));
    if (response.message) {
      window.alert(`Article from ${response.message.article.author} saved`);
    }
  };

  return (
    <div className="theme-wrapper" style={appTheme}>
      <span id="splash-feed" style={splashTheme}>
        <Logo />
        <h1 id="newsfeed-heading" style={headingStyle}>
          Results
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
          {feedArticles && (
            <>
              <div className="highlight-section">
                <img
                  src={feedArticles[0].urlToImage}
                  alt={feedArticles[0].title}
                  height="100px"
                  width="100px"
                />
                <div className="highlight-content">
                  <a
                    href={feedArticles[0].url}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <h3>{feedArticles[0].title}</h3>
                  </a>
                  <hr />
                  <p>
                    {feedArticles[0].content.substring(
                      0,
                      feedArticles[0].content.indexOf("[")
                    )}
                  </p>
                  <div className="top link-div">
                    <a
                      href={feedArticles[0].url}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {feedArticles[0].source.name}
                    </a>

                    <button
                      className="save top"
                      onClick={() => addArticle(feedArticles[0])}
                    ></button>
                  </div>
                  <p className="author">Author: {feedArticles[0].author}</p>
                </div>
              </div>
            </>
          )}
        </div>
        <div id="newsfeed-follows">
          {user && (
            <>
              <h1 style={headingStyle}>Followed Topics</h1>
              <hr />
              {allFollows &&
                Object.values(allFollows).reverse().map((topic, i) => (
                  <p key={i} style={headingStyle}>
                    {topic.topicString}
                  </p>
                ))}
            </>
          )}
        </div>
        {feedArticles &&
          feedArticles.slice(1).map((article, i) => {
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

export default Results;
