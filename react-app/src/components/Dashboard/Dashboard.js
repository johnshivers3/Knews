import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as followsActions from "../../store/follows";
import * as preferenceActions from "../../store/preferences";
import * as articleActions from "../../store/articles";
import * as newsFeedActions from "../../store/newsfeed.js";
import "./Dashboard.css";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const userFollows = useSelector((state) => state.follows.allFollows);
  const userArticles = useSelector((state) => state.articles.allArticles);
  const selectedFollow = useSelector((state) => state.follows.oneFollow);

  // Collect users followed topics
  useEffect(() => {
    dispatch(followsActions.getAllFollows());
    return () => {
      dispatch(followsActions.cleanUpFollows());
    };
  }, [dispatch]);
  // Execute search for followed topic
  const searchTopic = (e) => {
    e.preventDefault();
    dispatch(newsFeedActions.getSearchResults(e.target.innerText));
  };
  // Collect users followed topics
  useEffect(() => {
    dispatch(articleActions.getAllArticles());
    return () => {
      dispatch(articleActions.cleanUpArticles());
    };
  }, [dispatch]);
  return (
    <>
      <div className="dashboard-header-div">
        <h1>{`${user.username.toUpperCase()}'s Dashboard`}</h1>
      </div>
      <div id="dashboard-main-div">
        <h2>Followed Topics</h2>
        <ul id="topic-list">
          {userFollows &&
            Object.values(userFollows).map((follow) => (
              <li key={follow.id}>
                <h3 onClick={searchTopic}>{follow.topicString}</h3>
              </li>
            ))}
        </ul>
        <h2>Saved Articles</h2>
        <ul id="article-list">
          {userArticles &&
            Object.values(userArticles).map((article) => (
              <li key={article.id}>
                {/* <h3 onClick={searchTopic}>{article.topicString}</h3> */}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default Dashboard;
