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
  const [language, setLanguage] = useState();
  const dispatch = useDispatch();
  const history = useHistory();
  const [edit, setEdit] = useState("");
  const user = useSelector((state) => state.session.user);
  const userFollows = useSelector((state) => state.follows.allFollows);
  const userArticles = useSelector((state) => state.articles.allArticles);
  const selectedFollow = useSelector((state) => state.follows.oneFollow);
  const userPreferences = useSelector((state) => state.preferences.preferences);

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
        dispatch(followsActions.addFollow());
        break;
      default:
        break;
    }
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
        {edit === "preferences" && userPreferences ? (
          <>
            <div id="preference-div">
              <h2>Preferences</h2>
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
              <button className="save-preference-edit" onClick={handleSave}>
                Save
              </button>
            </div>
            <hr />
          </>
        ) : null}
        {/* FOLLOWED TOPICS */}
        <div id="topics-header">
          <h2>Followed Topics</h2>
          <div className="heading-edit-buttons">
            {edit === "topics" ? (
              <button className="done-follow-edit" onClick={handleSave}>
                Done
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
                  <>
                    <button className="delete-follow-button"></button>
                    <input
                      placeholder={follow.topicString}
                      className="topic-edit-input"
                    />
                    <button className="save-follow-edit" onClick={handleSave}>
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <h3>{follow.topicString}</h3>
                    <button className="search-follow-button">Search</button>
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
              <button className="done-follow-edit" onClick={handleSave}>
                Done
              </button>
            ) : null}
            {userArticles?.length > 0 && (
              <button
                className="setting-button articles"
                title="Edit Articles"
                value="articles"
                onClick={handleEdit}
              ></button>
            )}
          </div>
        </div>
        <hr />
        <ul className="user-articles dashboard-list">
          {userArticles ?
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
            )) : <li>'You have saved an article yet.'</li>}
        </ul>
      </div>
    </>
  );
};

export default Dashboard;
