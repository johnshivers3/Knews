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
    <div id="main-newsfeed-div">
      {/* {errors } */}
      {topHeadlines &&
        topHeadlines.map((article, i) => {
          switch (i) {
            case 0:
            case 1:
            case 2:
            case 3:
              return (
                <>
                  <div className="upper-section" key={i}>
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    height="100px"
                    width="100px"
                  />
                    <div className='upper-content'>
                    <h3>{article.title}</h3>
                    <p>
                      {article.content.substring(
                        0,
                        article.content.indexOf("[")
                      )}
                    </p>
                    <a href={article.url}>Source</a>
                    <p>{article.author}</p>
                    </div>
                  </div>
                </>
              );

            default:
              return (
                <span className="lower-section" key={i}>
                  <h3>{article.title}</h3>
                  <img src={article.urlToImage} alt={article.title} />
                  <p>
                    {article.content.substring(0, article.content.indexOf("["))}
                  </p>
                  <a href={article.url}>Source</a>
                  <p>{article.author}</p>
                </span>
              );
          }
        })}
    </div>
  );
};

export default NewsFeed;
