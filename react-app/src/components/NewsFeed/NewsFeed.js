import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import * as newsFeedActions from "../../store/newsfeed.js";
import * as articleActions from "../../store/articles";
import * as followActions from "../../store/follows";
import * as preferenceActions from "../../store/preferences";
import { useAlert } from "react-alert";
import ScrollToTop from "../ScrollToTop/ScrollToTop.js";
import "./NewsFeed.css";
import Knews from "../Knews/Knews.js";

export const NewsFeed = () => {
  const { pagetheme } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  const feedHeadlines = useSelector((state) => state.newsfeed.news);
  const categoryFeed = useSelector((state) => state.newsfeed.searchResults);
  const allFollows = useSelector((state) => state.follows?.allFollows);
  const userPreferences = useSelector((state) => state.preferences.preferences);
  const user = useSelector((state) => state.session.user);

  const [hTheme, setHTheme] = useState("rgba(36, 22, 129, 0.978)");
  const [bgTheme, setBgTheme] = useState("");
  const [activeTopic, setActiveTopic] = useState("");

  const [feedArticles, setFeedArticles] = useState();

  const placeHolder =
    "https://dummyimage.com/400x300/dedede/241681.jpg&text=Image+Not+Found";
  const appTheme = { background: bgTheme };
  const headingStyle = { color: hTheme };
  const splashTheme = { background: "var(--main-purple)" };

  // Collect user preferences
  useEffect(() => {
    dispatch(preferenceActions.getUserPreferences());
    if (pagetheme.toLowerCase() === "dark") {
      setBgTheme("rgba(0, 0, 0, 0.75)");
      setHTheme("whitesmoke");
    } else {
      setBgTheme("rgba(0, 0, 0, 0.15)");
    }
  }, [dispatch, user, pagetheme]);

  useEffect(() => {
    if (user) dispatch(followActions.getAllFollows());

    dispatch(
      newsFeedActions.getSearchResults(
        userPreferences?.defaultFeed ?? "General",
        userPreferences?.language ?? "en"
      )
    );

    return;
  }, [dispatch, user, userPreferences?.defaultFeed, userPreferences?.language]);

  useEffect(() => {
    if (userPreferences?.defaultFeed) {
      setFeedArticles(categoryFeed?.articles);
    } else {
      setFeedArticles(feedHeadlines?.articles);
    }
    return;
  }, [dispatch, categoryFeed, feedHeadlines, userPreferences?.defaultFeed]);

  useEffect(() => {
    //re-render
  }, [activeTopic]);
  // Save article to database

  const addArticle = async (article) => {
    if (!user) alert.info(`Sign Up or Log In \n to save articles.`);
    else {
      const response = await dispatch(articleActions.addArticle(article));
      if (response.message) {
        alert.success(
          `Article from ${response.message.article.source.name} saved`
        );
      }
    }
  };

  return (
    <div className="theme-wrapper" style={appTheme}>
      <Knews
        user={user}
        headingStyle={headingStyle}
        splashTheme={splashTheme}
      />
      <div className="newsfeed-header-div">
        <h1 style={headingStyle}>Top Stories</h1>
      </div>
      <div id="main-newsfeed-div">
        {/* <div></div> */}
        <div id="newsfeed-follows">
          {user && (
            <>
              <h1 >Followed Topics</h1>
              <hr />
              {allFollows &&
                Object.values(allFollows)
                  .reverse()
                  .map((topic, i) => (
                    <Link
                      to={`/results/${topic.topicString}`}
                      key={i}
                      id={
                        activeTopic === topic.topicString
                          ? "active-topic"
                          : null
                      }
                      onClick={() => setActiveTopic(topic.topicString)}
                    >
                      <h2>{topic.topicString}</h2>
                    </Link>
                  ))}
            </>
          )}
        </div>
        {feedArticles?.length > 0 && (
          <>
            <div className="highlight-section">
              <img
                src={
                  feedArticles[0].urlToImage
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
                  {/* {!user && (
                    <>
                      <p>Sign Up or Login</p>
                      <p>to save articles</p>
                    </>
                  )} */}
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
                        {article.content?.substring(
                          0,
                          article.content?.indexOf("[")
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
                    <div className="lower-section-div">
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
      <ScrollToTop />
    </div>
  );
};

export default NewsFeed;
