import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

import * as followsActions from "../../store/follows";
import * as preferenceActions from "../../store/preferences";
import * as articleActions from "../../store/articles";
// import * as newsFeedActions from "../../store/newsfeed.js";

import "./Dashboard.css";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState("");
  const user = useSelector((state) => state.session.user);
  const userFollows = useSelector((state) => state.follows.allFollows);
  const userArticles = useSelector((state) => state.articles.allArticles);
  const userPreferences = useSelector((state) => state.preferences.preferences);
  const [language, setLanguage] = useState(userPreferences?.lang);
  const [country, setCountry] = useState(userPreferences?.country);
  const [feed, setFeed] = useState(userPreferences?.defaultFeed);
  const [theme, setTheme] = useState(userPreferences?.theme);
  const [followEdit, setFollowEdit] = useState("");
  const [newFollowEdit, setNewFollowEdit] = useState("");
  const [addFollow, setAddFollow] = useState(false);
  const [addFollowError, setAddFollowError] = useState("");

  const [bgTheme, setBgTheme] = useState("");
  const [hTheme, setHTheme] = useState("rgba(36, 22, 129, 0.978)");
  const alert = useAlert();

  const appTheme = { background: bgTheme };
  const headingStyle = { color: hTheme };

  useEffect(() => {
    // eslint-disable-next-line
    if (userPreferences?.theme === "Dark") {
      setBgTheme("rgba(0, 0, 0, 0.75)");
      setHTheme("whitesmoke");
    } else {
      setBgTheme("rgba(0, 0, 0, 0.15)");
    }
  }, [dispatch, userPreferences?.theme]);

  // Collect users followed topics
  useEffect(() => {
    dispatch(followsActions.getAllFollows());
  }, [dispatch]);

  // };

  // Collect users followed topics
  useEffect(() => {
    dispatch(articleActions.getAllArticles());
  }, [dispatch]);

  // Collect user preferences
  useEffect(() => {
    dispatch(preferenceActions.getUserPreferences());
  }, [dispatch]);

  // set edit state
  const handleEdit = (e) => {
    e.preventDefault();
    setEdit(e.target.value);
  };

  // save and reset edit state
  const handleSave = async (e) => {
    e.preventDefault();

    switch (e.target.className) {
      case "done-follow-edit":
        setEdit("");
        setAddFollow(false);

        return;
      case "save-follow-edit":
        dispatch(followsActions.updateFollow(followEdit, e.target.value));
        return;
      case "add-follow-edit":
        if (newFollowEdit.length > 0) {
          await dispatch(followsActions.addFollow(newFollowEdit));
          alert.success(`Topic: ${newFollowEdit} added`);

          setNewFollowEdit("");
          setAddFollowError("");
          setAddFollow(false);
        } else {
          setAddFollowError("Please enter a topic");
        }
        return;
      case "save-preference-edit":
        const newPreferences = { ...userPreferences };
        newPreferences["country"] = country;
        newPreferences["lang"] = language;
        newPreferences["defaultFeed"] = feed;
        newPreferences["theme"] = theme;
        dispatch(preferenceActions.updatePreferences(newPreferences));
        setEdit("");
        return;
      case "done-article-edit":
        setEdit("");
        return;
      default:
        return;
    }
  };
  // save and reset edit state
  const handleDelete = async (e) => {
    e.preventDefault();

    switch (e.target.className) {
      case "delete-follow-button":
        await dispatch(followsActions.deleteOneFollow(e.target.value));

        alert.success(`Topic: ${e.target.id} deleted`);

        break;
      case "delete-article-button":
        await dispatch(articleActions.deleteOneArticle(e.target.value));

        alert.success(`Article from ${e.target.id.slice(0, 10)} deleted`);

        break;
      default:
        break;
    }
  };

  // add topic to database
  const handleAddFollow = (e) => {
    e.preventDefault();
    setAddFollow(true);
  };
  const splashTheme = { background: "var(--main-purple)" };

  return (
    <div className="theme-wrapper" style={appTheme}>
      <span id="splash-dash" style={splashTheme}>
        <div className="dashboard-header-div">
          <h1
            id="dashboard-heading"
            style={headingStyle}
          >{`${user.username.toUpperCase()}'s Dashboard`}</h1>
          <button
            className="setting-button preferences"
            title="General Settings"
            value="preferences"
            onClick={handleEdit}
          ></button>
        </div>
      </span>
      <div id="dashboard-main-div">
        {/* PREFERENCES */}
        {edit === "preferences" && userPreferences ? (
          <div id="main-preference-div">
            <div id="preferences-header-div">
              <h2>Preferences</h2>
              <button className="save-preference-edit" onClick={handleSave}>
                Save
              </button>
            </div>
            <hr />
            <div className="preference-div">
              <div id="default-theme-select">
                <label htmlFor="theme">
                  <h2>Light/Dark Theme</h2>
                </label>
                <select
                  autoComplete="on"
                  name="theme"
                  placeholder="Set default theme for your feed"
                  defaultValue={
                    userPreferences.theme === "" ? null : userPreferences.theme
                  }
                  onChange={(e) => {
                    if (e.target.value !== userPreferences.theme)
                      setTheme(e.target.value);
                  }}
                >
                  <option>Light</option>
                  <option>Dark</option>
                </select>
              </div>

              <div id="default-category-select">
                <label htmlFor="category">
                  <h2>Headlines Category</h2>
                </label>
                <select
                  autoComplete="on"
                  name="category"
                  placeholder="Set default category for your feed"
                  defaultValue={
                    userPreferences.defaultFeed === ""
                      ? null
                      : userPreferences.defaultFeed
                  }
                  onChange={(e) => {
                    if (e.target.value !== userPreferences.defaultFeed)
                      setFeed(e.target.value);
                  }}
                >
                  <option>Business</option>
                  <option>Entertainment</option>
                  <option>General</option>
                  <option>Health</option>
                  <option>Science</option>
                  <option>Sports</option>
                  <option>Technology</option>
                </select>
              </div>
            </div>

            <div className="preference-div"></div>
            <hr />
          </div>
        ) : null}
        {/* FOLLOWED TOPICS */}
        <div id="topics-header">
          <h2>Followed Topics</h2>
          <div className="heading-edit-buttons">
            {edit === "topics" ? (
              <>
                <button className="done-follow-edit" onClick={handleAddFollow}>
                  Add
                </button>
                <button className="done-follow-edit" onClick={handleSave}>
                  Done
                </button>
              </>
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
          {addFollowError.length > 0 && edit === "topics" ? (
            <h4 id="topic-error">{addFollowError}</h4>
          ) : null}
          {addFollow && edit === "topics" && (
            <div id="add-follow-div">
              <input
                id="add-follow-input"
                placeholder="Add a new topic here"
                onChange={(e) => setNewFollowEdit(e.target.value)}
                required
              ></input>
              <button className="add-follow-edit" onClick={handleSave}>
                Save
              </button>
            </div>
          )}
          {userFollows &&
            Object.values(userFollows)
              .reverse()
              .map((follow) => (
                <li key={follow.id}>
                  {edit === "topics" ? (
                    <>
                      <button
                        title="Delete Topic`"
                        value={follow.id}
                        id={follow.topicString}
                        className="delete-follow-button"
                        onClick={handleDelete}
                      ></button>
                      <input
                        placeholder={follow.topicString}
                        className="topic-edit-input"
                        defaultValue={follow.topicString}
                        onChange={(e) => setFollowEdit(e.target.defaultValue)}
                      />
                      <button
                        value={follow.id}
                        className="save-follow-edit"
                        onClick={handleSave}
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <>
                      <h3>{follow.topicString}</h3>
                    </>
                  )}
                </li>
              ))}
        </ul>
        {/* SAVED ARTICLES */}
        <div id="articles-header">
          <h2>Saved Articles</h2>
          <div className="heading-edit-buttons">
            {edit === "articles" ? (
              <button className="done-article-edit" onClick={handleSave}>
                Done
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
          {userArticles ? (
            Object.values(userArticles)
              .reverse()
              .map((article) => (
                <li key={article.id}>
                  {edit === "articles" ? (
                    <button
                      className="setting-button delete-article-button"
                      title="Delete Article"
                      value={article.id}
                      id={article.source}
                      onClick={handleDelete}
                    ></button>
                  ) : null}
                  <img src={article.urlToImage} alt={article.title} />
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <h3>{article.title}</h3>
                  </a>
                </li>
              ))
          ) : (
            <h3>You have saved an article yet.</h3>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
