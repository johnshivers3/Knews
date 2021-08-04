import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
import * as newsFeedActions from "../../store/newsfeed.js";
import * as preferenceActions from "../../store/preferences";

import "./NewsFeed.css";

export const NewsFeed = () => {
  // const history = useHistory();
  const dispatch = useDispatch();
  const topHeadlines = useSelector((state) => state.newsfeed.news?.articles);
  const userPreferences = useSelector((state) => state.preferences.preferences);

  useEffect(() => {
    dispatch(newsFeedActions.getTopHeadlines());

    return () => dispatch(newsFeedActions.cleanUpFeed());
  }, [dispatch]);

  // Collect user preferences
  useEffect(() => {
    dispatch(preferenceActions.getUserPreferences());
    return () => {
      dispatch(preferenceActions.cleanUpPreferences());
    };
  }, [dispatch]);

  return (
    <>
      <div id="main-newsfeed-div">
        <div className="newsfeed-header-div">
          <h1>Top Stories</h1>
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
                  <a
                    href={topHeadlines[0].url}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {topHeadlines[0].source.name}
                  </a>
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
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {article.source.name}
                      </a>
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
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {article.source.name}
                      </a>
                    </div>
                  </div>
                );
            }
          })}
      </div>
    </>
  );
};

export default NewsFeed;
