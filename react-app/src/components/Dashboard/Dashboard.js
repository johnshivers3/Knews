import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Gear from "../images/Gear";
import Gear2 from "../images/Gear2";

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
        <div className="setting-button preferences" title="General Settings">
          <Gear2 />
        </div>
      </div>
      <div id="dashboard-main-div">
        <div id="topics-header">
          <h2>Followed Topics</h2>
          <div className="setting-button topics" title="Edit Topics">
            <Gear2 />
          </div>
        </div>
        <hr />
        <ul className="user-topics dashboard-list">
          {userFollows &&
            Object.values(userFollows).map((follow) => (
              <li key={follow.id}>
                <h3 onClick={searchTopic}>{follow.topicString}</h3>
              </li>
            ))}
        </ul>
        <div id="articles-header">
          <h2>Saved Articles</h2>
          <div className="setting-button articles" title="Edit Articles">
            <Gear2 />
          </div>
        </div>
        <hr />
        <ul className="user-articles dashboard-list">
          {userArticles &&
            Object.values(userArticles).map((article) => (
              <li key={article.id}>
                <img src={article.urlToImage} alt={article.title} />
                <a href={article.url} target="_blank" rel="noreferrer noopener">
                  <h3>{article.title}</h3>
                </a>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default Dashboard;
