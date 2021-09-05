import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import * as newsFeedActions from "../../store/newsfeed.js";
import * as articleActions from "../../store/articles";
import * as followActions from "../../store/follows";
import * as preferenceActions from "../../store/preferences";
import Logo from "../images/Logo.js";

import "./Results.css";

export const Results = () => {
  const dispatch = useDispatch();
  const { query } = useParams();
  const feedHeadlines = useSelector((state) => state.newsfeed.news);
  const categoryFeed = useSelector((state) => state.newsfeed.searchResults);
  const allFollows = useSelector((state) => state.follows?.allFollows);
  const userPreferences = useSelector((state) => state.preferences.preferences);
  const user = useSelector((state) => state.session.user);

  const [hTheme, setHTheme] = useState("rgba(36, 22, 129, 0.978)");
  const [bgTheme, setBgTheme] = useState("");

  const [feedArticles, setFeedArticles] = useState();

  const placeHolder =
    "http://placehold.jp/32/d3d3d3/241681/150x150.png?text=Image%20Not%20Found";

  // Collect user preferences
  useEffect(() => {
    dispatch(preferenceActions.getUserPreferences());

    if (userPreferences?.theme === "Dark") {
      setBgTheme("rgba(0, 0, 0, 0.75)");
      // setBgTheme("rgba(0, 0, 0, 0.15)");

      setHTheme("whitesmoke");
    } else {
      setBgTheme("rgba(0, 0, 0, 0.15)");
    }

    return;
    // eslint-disable-next-line
  }, [dispatch, categoryFeed, feedHeadlines, user]);

  const appTheme = { background: bgTheme };
  const headingStyle = { color: hTheme };
  const splashTheme = { background: "var(--main-purple)" };

  useEffect(() => {
    if (user) dispatch(followActions.getAllFollows());

    const language = userPreferences?.language || "en";

    dispatch(newsFeedActions.getSearchResults(query, language));
  }, [dispatch, user, query, userPreferences?.language]);

  useEffect(() => {
    if (user) {
      setFeedArticles(categoryFeed?.articles);
    } else {
      setFeedArticles(feedHeadlines?.articles);
    }
    return;
    // eslint-disable-next-line
  }, [dispatch, categoryFeed, feedHeadlines]);

  // Save article to database

  const addArticle = async (article) => {
    if (!user) window.alert(`Sign Up or Log In \n to save articles.`);

    const response = await dispatch(articleActions.addArticle(article));
    if (response.message) {
      window.alert(
        `Article from ${response.message.article.source.name} saved`
      );
    }
  };

  return (
    <div className="theme-wrapper" style={appTheme}>
      <span id="splash-feed" style={splashTheme}>
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
      <div id="main-newsfeed-div">
        <div className="newsfeed-header-div">
          <h1 style={headingStyle}>Top Stories</h1>
          <h4 style={headingStyle}>{query.toUpperCase()}</h4>
        </div>
        <div>
          {feedArticles?.length > 0 && (
            <>
              <div className="highlight-section">
                <img
                  src={
                    feedArticles[0].urlToImage &&
                    feedArticles[0].urlToImage !== null
                      ? feedArticles[0].urlToImage
                      : placeHolder
                  }
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = placeHolder;
                  }}
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
                    {!user && (
                      <>
                        <p>Sign Up or Login</p>
                        <p>to save articles</p>
                      </>
                    )}
                    <button
                      title="Add Article"
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
                Object.values(allFollows)
                  .reverse()
                  .map((topic, i) => (
                    <Link
                      to={`/results/${topic.topicString}`}
                      key={i}
                      style={headingStyle}
                    >
                      <h2>{topic.topicString}</h2>
                    </Link>
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
                      src={
                        article.urlToImage && article.urlToImage !== null
                          ? article.urlToImage
                          : placeHolder
                      }
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = placeHolder;
                      }}
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
                          title="Add Article"
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
                      <img
                        src={
                          article.urlToImage && article.urlToImage !== null
                            ? article.urlToImage
                            : placeHolder
                        }
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = placeHolder;
                        }}
                        alt={article.title}
                      />
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
                          title="Add Article"
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
