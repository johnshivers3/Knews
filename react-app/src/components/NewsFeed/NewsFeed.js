import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as newsFeedActions from "../../store/newsfeed.js";
import "./NewsFeed.css";

export const NewsFeed = () => {
  const [newsfeed, setNewsFeed] = useState();
  const [errors, setErrors] = useState();
  const dispatch = useDispatch();
  const history = useHistory();
  const topHeadlines = useSelector((state) => state.newsfeed.news?.articles);

  useEffect(() => {
    dispatch(newsFeedActions.getTopHeadlines());
  }, []);

  return (
    <>
      <div className='header-div'>
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
                        <h3>{article.title}</h3>
                        <p>
                          {article.content.substring(
                            0,
                            article.content.indexOf("[")
                          )}
                        </p>
                        <a href={article.url}>External: Source</a>
                        <p>{article.author}</p>
                      </div>
                    </div>
                  </>
                );

              default:
                return (
                  <div className="lower-section" key={i}>
                    <div>
                      <h3>{article.title}</h3>
                      <img src={article.urlToImage} alt={article.title} />
                    </div>
                    {/* <p>
                      {article.content.substring(
                        0,
                        article.content.indexOf("[")
                      )}
                    </p> */}
                    <a href={article.url}>Source</a>
                    <p>{article.author}</p>
                  </div>
                );
            }
          })}
      </div>
    </>
  );
};

export default NewsFeed;
