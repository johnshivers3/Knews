import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
import * as newsFeedActions from "../../store/newsfeed.js";
import "./NewsFeed.css";

export const NewsFeed = () => {
  // const [newsfeed, setNewsFeed] = useState();
  // const [errors, setErrors] = useState();
  // const history = useHistory();
  const dispatch = useDispatch();
  const topHeadlines = useSelector((state) => state.newsfeed.news?.articles);

  useEffect(() => {
    dispatch(newsFeedActions.getTopHeadlines());
    return () => dispatch(newsFeedActions.cleanUpFeed());
  }, [dispatch]);

  return (
    <>
      <div id="main-newsfeed-div">
        <div className="header-div">
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
                  <a href={topHeadlines[0].url}>
                    <h3>{topHeadlines[0].title}</h3>
                  </a>
                  <p>
                    {topHeadlines[0].content.substring(
                      0,
                      topHeadlines[0].content.indexOf("[")
                    )}
                  </p>
                  <a href={topHeadlines[0].url}>Source</a>
                  <p>Author:{topHeadlines[0].author}</p>
                </div>
              </div>
            </>
          )}
        </div>
        <div></div>
        {topHeadlines &&
          topHeadlines.map((article, i) => {
            switch (i) {
              case 0:
                return null;
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
              case 6:
                return (
                  <>
                    <div className="upper-section" key={i}>
                      <img
                        src={article.urlToImage}
                        alt={article.title}
                        height="100px"
                        width="100px"
                      />
                      <div className="upper-content">
                        <a href={article.url}>
                          <h3>{article.title}</h3>
                        </a>
                        <p>
                          {article.content.substring(
                            0,
                            article.content.indexOf("[")
                          )}
                        </p>
                        <a href={article.url}>Source</a>
                        <p>Author:{article.author}</p>
                      </div>
                    </div>
                  </>
                );

              default:
                return (
                  <div className="lower-section" key={i}>
                    <div>
                      <img src={article.urlToImage} alt={article.title} />
                      <a href={article.url}>
                        <h4>{article.title}</h4>
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
