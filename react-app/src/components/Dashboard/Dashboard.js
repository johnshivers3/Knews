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
  const [country, setCountry] = useState(userPreferences?.theme);
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
                  <h2>Theme</h2>
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
                  <h2>Category</h2>
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

            <div className="preference-div">
              <div id="language-select">
                <label htmlFor="language">
                  <h2>Language</h2>
                </label>
                <select
                  name="language"
                  autoComplete="on"
                  placeholder="Set your preferred language"
                  defaultValue={
                    userPreferences.lang === "" ? null : userPreferences.lang
                  }
                  onChange={(e) => {
                    if (e.target.value !== "") setLanguage(e.target.value);
                  }}
                >
                  <option>Select default language</option>
                  <option value="ar">Arabic, العربية</option>
                  <option value="de">German, Deutsch</option>
                  <option value="en">English</option>
                  <option value="es">Spanish, Castilian, Español</option>
                  <option value="he">Hebrew, עברית</option>
                  <option value="it">Italian, Italiano</option>
                  <option value="nl">Dutch, Flemish</option>
                  <option value="no">Norwegian, Norsk</option>
                  <option value="pt">Portuguese, Português</option>
                  <option value="ru">Russian, русский</option>
                  <option value="se">Northern Sami, Davvisámegiella</option>
                  <option value="zh">
                    Chinese, 中文 (Zhōngwén), 汉语, 漢語
                  </option>
                </select>
              </div>
              <div id="country-select">
                <label htmlFor="country">
                  <h2>Country</h2>
                </label>
                <select
                  name="country"
                  autoComplete="on"
                  placeholder="Set preferred country"
                  defaultValue={
                    userPreferences.country === ""
                      ? null
                      : userPreferences.country
                  }
                  onChange={(e) => {
                    if (e.target.value !== "") setCountry(e.target.value);
                  }}
                >
                  <option value="ae">U.A.E.</option>
                  <option value="ar">Argentina </option>
                  <option value="at">Austria </option>
                  <option value="au">Australia </option>
                  <option value="be">Belgium </option>
                  <option value="bg">Bulgaria </option>
                  <option value="br">Brazil </option>
                  <option value="ca">Canada </option>
                  <option value="ch">Switzerland </option>
                  <option value="cn">China </option>
                  <option value="co">Colombia </option>
                  <option value="cu">Cuba </option>
                  <option value="cz">Czechia </option>
                  <option value="de">Germany </option>
                  <option value="eg">Egypt </option>
                  <option value="fr">France </option>
                  <option value="gb"> United Kingdom</option>
                  <option value="gr">Greece </option>
                  <option value="hk"> Hong Kong</option>
                  <option value="hu">Hungary </option>
                  <option value="id">Indonesia </option>
                  <option value="ie">Ireland </option>
                  <option value="il">Israel </option>
                  <option value="in">India </option>
                  <option value="it">Italy </option>
                  <option value="jp">Japan </option>
                  <option value="kr">Korea </option>
                  <option value="lt">Lithuania </option>
                  <option value="lv">Latvia </option>
                  <option value="ma">Morocco </option>
                  <option value="mx">Mexico </option>
                  <option value="my">Malaysia </option>
                  <option value="ng">Nigeria </option>
                  <option value="nl">Netherlands </option>
                  <option value="no">Norway </option>
                  <option value="nz"> New Zealand</option>
                  <option value="ph">Philippines </option>
                  <option value="pl">Poland </option>
                  <option value="pt">Portugal </option>
                  <option value="ro">Romania </option>
                  <option value="rs">Serbia </option>
                  <option value="ru">Russia </option>
                  <option value="sa"> Saudi Arabia</option>
                  <option value="se">Sweden </option>
                  <option value="sg">Singapore </option>
                  <option value="si">Slovenia </option>
                  <option value="sk">Slovakia </option>
                  <option value="th">Thailand </option>
                  <option value="tr">Turkey </option>
                  <option value="tw">Taiwan </option>
                  <option value="ua">Ukraine </option>
                  <option value="us"> United States</option>
                  <option value="ve">Venezuela </option>
                  <option value="za"> South Africa</option>
                </select>
              </div>
            </div>
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
                      className="delete-article-button"
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
