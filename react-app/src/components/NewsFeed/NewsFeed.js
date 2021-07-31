import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
import * as newsFeedActions from "../../store/newsfeed.js";
import "./NewsFeed.css";

export const NewsFeed = () => {
  // const [newsfeed, setNewsFeed] = useState();
  // const [errors, setErrors] = useState();
  const dispatch = useDispatch();
  // const history = useHistory();
  const topHeadlines = useSelector((state) => state.newsfeed.news?.articles);

  useEffect(() => {
    dispatch(newsFeedActions.getTopHeadlines());
  }, [dispatch]);

  return (
    <>
      <div className="header-div">
        <h1>Top Stories</h1>
      </div>
      <div id="main-newsfeed-div">
        {topHeadlines &&
          topHeadlines.map((article, i) => {
            switch (i) {
              case 0:
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
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
                    {/* <p>
                      {article.content.substring(
                        0,
                        article.content.indexOf("[")
                      )}
                    </p> */}
                    {/* <div>
                      <a href={article.url}>Source</a>
                      <p>Author: {article.author}</p>
                    </div> */}
                  </div>
                );
            }
          })}
      </div>
    </>
  );
};

export default NewsFeed;
