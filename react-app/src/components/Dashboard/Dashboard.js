import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import * as followsActions from "../../store/follows";
import * as preferenceActions from "../../store/preferences";
import * as articleActions from "../../store/articles";
import * as newsFeedActions from "../../store/newsfeed.js";

import "./Dashboard.css";

export const Dashboard = () => {
  const [language, setLanguage] = useState("");
  const [country, setCountry] = useState("");
  const [feed, setFeed] = useState("");
  const [theme, setTheme] = useState("");
  const [followEdit, setFollowEdit] = useState("");
  const [newFollowEdit, setNewFollowEdit] = useState("");
  const [addFollow, setAddFollow] = useState(false);
  const [addFollowError, setAddFollowError] = useState("");

  const dispatch = useDispatch();
  const [edit, setEdit] = useState("");
  const user = useSelector((state) => state.session.user);
  const userFollows = useSelector((state) => state.follows.allFollows);
  const userArticles = useSelector((state) => state.articles.allArticles);
  // const selectedFollow = useSelector((state) => state.follows.oneFollow);
  const userPreferences = useSelector((state) => state.preferences.preferences);

  const [bgTheme, setBgTheme] = useState("rgba(0, 0, 0, 0.15)");
  const [hTheme, setHTheme] = useState("rgba(36, 22, 129, 0.678)");
  const history = useHistory();
  const appTheme = { background: bgTheme };
  const headingStyle = { color: hTheme };

  useEffect(() => {
    dispatch(preferenceActions.getUserPreferences());
    if (userPreferences?.theme === "Dark") {
      setBgTheme("rgba(0, 0, 0, 0.75)");
      setHTheme("whitesmoke");
    }
    return () => {
      dispatch(preferenceActions.cleanUpPreferences());
    };
  }, [dispatch]);

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

  // Collect user preferences
  useEffect(() => {
    dispatch(preferenceActions.getUserPreferences());
    return () => {
      dispatch(preferenceActions.cleanUpPreferences());
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

    switch (e.target.className) {
      case "done-follow-edit":
        setEdit("");
        break;
      case "save-follow-edit":
        dispatch(followsActions.updateFollow(followEdit, e.target.value));
        break;
      case "add-follow-edit":
        if (newFollowEdit.length > 0) {
          dispatch(followsActions.addFollow(newFollowEdit));
          setNewFollowEdit("");
          setAddFollowError("");
          setAddFollow(false);
        } else {
          setAddFollowError("Please enter a topic");
        }
        break;
      case "save-preference-edit":
        const newPreferences = { ...userPreferences };
        newPreferences["country"] = country;
        newPreferences["defaultFeed"] = feed;
        newPreferences["lang"] = language;
        newPreferences["theme"] = theme;
        dispatch(preferenceActions.updatePreferences(newPreferences));
        setEdit("");
        break;
      case "done-article-edit":
        setEdit("");
        break;
      default:
        break;
    }
  };
  // save and reset edit state
  const handleDelete = (e) => {
    e.preventDefault();
    switch (e.target.className) {
      case "delete-follow-button":
        dispatch(followsActions.deleteOneFollow(e.target.value));
        break;
      case "delete-article-button":
        dispatch(articleActions.deleteOneArticle(e.target.value));
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
              <input
                id="default-theme-search"
                type="search"
                list="theme-list"
                placeholder={
                  userPreferences.theme === ""
                    ? "Set default theme for your feed"
                    : userPreferences.theme
                }
                onChange={(e) => setTheme(e.target.value)}
              ></input>
              <datalist id="theme-list">
                <option>Light</option>
                <option>Dark</option>
              </datalist>
              <input
                id="default-category-search"
                type="search"
                list="category-list"
                placeholder={
                  userPreferences.defaultFeed === ""
                    ? "Set default category for your feed"
                    : userPreferences.defaultFeed
                }
                onChange={(e) => setFeed(e.target.value)}
              ></input>
              <datalist id="category-list">
                <option>Business</option>
                <option>Entertainment</option>
                <option>General</option>
                <option>Health</option>
                <option>Science</option>
                <option>Sports</option>
                <option>Technology</option>
              </datalist>
            </div>

            <div className="preference-div">
              <input
                id="language-search"
                type="search"
                list="language-list"
                placeholder={
                  userPreferences.lang === ""
                    ? "Set preferred news language"
                    : userPreferences.lang
                }
                onChange={(e) => setLanguage(e.target.value)}
              ></input>
              <datalist
                id="language-list"
                style={{ display: "none" }}
                value={language}
              >
                <option selected={userPreferences.lang === ""} value="">
                  Select default language
                </option>
                <option selected={userPreferences.lang === "ar"} value="ar">
                  Arabic, العربية
                </option>
                <option selected={userPreferences.lang === "de"} value="de">
                  German, Deutsch
                </option>
                <option selected={userPreferences.lang === "en"} value="en">
                  English
                </option>
                <option selected={userPreferences.lang === "es"} value="es">
                  Spanish, Castilian, Español
                </option>
                <option selected={userPreferences.lang === "he"} value="he">
                  Hebrew, עברית
                </option>
                <option selected={userPreferences.lang === "it"} value="it">
                  Italian, Italiano
                </option>
                <option selected={userPreferences.lang === "nl"} value="nl">
                  Dutch, Flemish
                </option>
                <option selected={userPreferences.lang === "no"} value="no">
                  Norwegian, Norsk
                </option>
                <option selected={userPreferences.lang === "pt"} value="pt">
                  Portuguese, Português
                </option>
                <option selected={userPreferences.lang === "ru"} value="ru">
                  Russian, русский
                </option>
                <option selected={userPreferences.lang === "se"} value="se">
                  Northern Sami, Davvisámegiella
                </option>
                <option selected={userPreferences.lang === "zh"} value="zh">
                  Chinese, 中文 (Zhōngwén), 汉语, 漢語
                </option>
              </datalist>
              <input
                id="country-search"
                type="search"
                list="country-list"
                autoComplete="on"
                placeholder={
                  userPreferences.country === ""
                    ? "Set preferred country"
                    : userPreferences.country
                }
                onChange={(e) => setCountry(e.target.value)}
              ></input>
              <datalist
                id="country-list"
                // autoComplete="on"
                style={{ display: "none" }}
              >
                <option value="U.A.E">ae</option>
                <option value="Argentina">ar</option>
                <option value="Austria">at</option>
                <option value="Australia">au</option>
                <option value="Belgium">be</option>
                <option value="Bulgaria">bg</option>
                <option value="Brazil">br</option>
                <option value="Canada">ca</option>
                <option value="Switzerland">ch</option>
                <option value="China">cn</option>
                <option value="Colombia">co</option>
                <option value="Cuba">cu</option>
                <option value="Czechia">cz</option>
                <option value="Germany">de</option>
                <option value="Egypt">eg</option>
                <option value="France">fr</option>
                <option value="United Kingdom"> gb</option>
                <option value="Greece">gr</option>
                <option value="Hong Kong"> hk</option>
                <option value="Hungary">hu</option>
                <option value="Indonesia">id</option>
                <option value="Ireland">ie</option>
                <option value="Israel">il</option>
                <option value="India">in</option>
                <option value="Italy">it</option>
                <option value="Japan">jp</option>
                <option value="Korea">kr</option>
                <option value="Lithuania">lt</option>
                <option value="Latvia">lv</option>
                <option value="Morocco">ma</option>
                <option value="Mexico">mx</option>
                <option value="Malaysia">my</option>
                <option value="Nigeria">ng</option>
                <option value="Netherlands">nl</option>
                <option value="Norway">no</option>
                <option value="New Zealand"> nz</option>
                <option value="Philippines">ph</option>
                <option value="Poland">pl</option>
                <option value="Portugal">pt</option>
                <option value="Romania">ro</option>
                <option value="Serbia">rs</option>
                <option value="Russia">ru</option>
                <option value="Saudi Arabia"> sa</option>
                <option value="Sweden">se</option>
                <option value="Singapore">sg</option>
                <option value="Slovenia">si</option>
                <option value="Slovakia">sk</option>
                <option value="Thailand">th</option>
                <option value="Turkey">tr</option>
                <option value="Taiwan">tw</option>
                <option value="Ukraine">ua</option>
                <option value="United States"> us</option>
                <option value="Venezuela">ve</option>
                <option value="South Africa"> za</option>
              </datalist>
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
          {addFollowError.length > 0 ? (
            <h4 id="topic-error">{addFollowError}</h4>
          ) : null}
          {addFollow && edit === "topics" && (
            <div id="add-follow-div">
              <input
                id="add-follow-input"
                onChange={(e) => setNewFollowEdit(e.target.value)}
                required
              ></input>
              <button
                // value={follow.id}
                className="add-follow-edit"
                onClick={handleSave}
              >
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
                        className="delete-follow-button"
                        onClick={handleDelete}
                      ></button>
                      <input
                        placeholder={follow.topicString}
                        className="topic-edit-input"
                        defaultValue={follow.topicString}
                        onChange={(e) => setFollowEdit(e.target.value)}
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
          {userArticles?.length > 0 ? (
            Object.values(userArticles).map((article) => (
              <li key={article.id}>
                {edit === "articles" ? (
                  <button
                    className="delete-article-button"
                    value={article.id}
                    onClick={handleDelete}
                  ></button>
                ) : null}
                <img src={article.urlToImage} alt={article.title} />
                <a href={article.url} target="_blank" rel="noreferrer noopener">
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
