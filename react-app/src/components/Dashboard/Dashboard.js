import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Gear from "../images/Gear";
import Gear2 from "../images/Gear2";
import Gear3 from "../images/Gear3";

import * as followsActions from "../../store/follows";
import * as preferenceActions from "../../store/preferences";
import * as articleActions from "../../store/articles";
import * as newsFeedActions from "../../store/newsfeed.js";

import "./Dashboard.css";

export const Dashboard = () => {
  const [language, setLanguage] = useState()
  const dispatch = useDispatch();
  const history = useHistory();
  const [edit, setEdit] = useState("");
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

  // set edit state
  const handleEdit = (e) => {
    e.preventDefault();
    setEdit(e.target.value);
  };
  // save and reset edit state
  const handleSave = (e) => {
    e.preventDefault();
    setEdit("");
  };

  return (
    <>
      <div className="dashboard-header-div">
        <h1>{`${user.username.toUpperCase()}'s Dashboard`}</h1>
        <button
          className="setting-button preferences"
          title="General Settings"
          value="preferences"
          onClick={handleEdit}
        ></button>
      </div>
      <div id="dashboard-main-div">
        {edit === "preferences" ? (
          <>
            <div id='preference-div'>
              <select value={language} onChange={(e)=>setLanguage(e.target.value)}>
                <option value=''>Select default language</option>
                <option value='ar'>Arabic, العربية</option>
                <option value='de'>German, Deutsch</option>
                <option value='en'>English</option>
                <option value='es'>Spanish, Castilian, Español</option>
                <option value='he'>Hebrew, עברית</option>
                <option value='it'>Italian, Italiano</option>
                <option value='nl'>Dutch, Flemish</option>
                <option value='no'>Norwegian, Norsk</option>
                <option value='pt'>Portuguese, Português</option>
                <option value='ru'>Russian, русский</option>
                <option value='se'>Northern Sami, Davvisámegiella</option>
                <option value='zh'>	Chinese, 中文 (Zhōngwén), 汉语, 漢語</option>
              </select>
              <button className="save-preference-edit" onClick={handleSave}>
                Save
              </button>
            </div>
            <hr />
          </>
        ) : null}
        <div id="topics-header">
          <h2>Followed Topics</h2>
          <div className="heading-edit-buttons">
            {edit === "topics" ? (
              <button className="save-follow-edit" onClick={handleSave}>
                Save
              </button>
            ) : null}
            <button
              className="setting-button topics"
              title="Edit Topics"
              value="topics"
              onClick={handleEdit}
            ></button>
          </div>
        </div>
        <hr />
        <ul className="user-topics dashboard-list">
          {userFollows &&
            Object.values(userFollows).map((follow) => (
              <li key={follow.id}>
                {edit === "topics" ? (
                  <button className="delete-follow-button"></button>
                ) : null}
                <h3 onClick={searchTopic}>{follow.topicString}</h3>
              </li>
            ))}
        </ul>
        <div id="articles-header">
          <h2>Saved Articles</h2>
          <div className="heading-edit-buttons">
            {edit === "articles" ? (
              <button className="save-article-edit" onClick={handleSave}>
                Save
              </button>
            ) : null}
            <button
              className="setting-button articles"
              title="Edit Articles"
              value="articles"
              onClick={handleEdit}
            ></button>
          </div>
        </div>
        <hr />
        <ul className="user-articles dashboard-list">
          {userArticles &&
            Object.values(userArticles).map((article) => (
              <li key={article.id}>
                {edit === "articles" ? (
                  <button className="delete-article-button"></button>
                ) : null}
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
