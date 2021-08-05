const GET_ARTICLES = "articles/GET_ARTICLES";
const GET_ARTICLE_BY_ID = "articles/GET_ARTICLE_BY_ID";
const CLEAN_UP = "articles/CLEAN_UP";

const getArticles = (articles) => ({
  type: GET_ARTICLES,
  payload: articles,
});
const getArticleById = (article) => ({
  type: GET_ARTICLE_BY_ID,
  payload: article,
});

const cleanUp = () => ({
  type: CLEAN_UP,
});

export const getAllArticles = () => async (dispatch) => {
  const response = await fetch("/api/saved/");

  if (response.ok) {
    const allArticles = await response.json();
    dispatch(getArticles(allArticles));
    return null;
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const getOneArticle = (articleId) => async (dispatch) => {
  const response = await fetch(`/api/saved/${articleId}`);

  if (response.ok) {
    const follow = await response.json();
    dispatch(getArticleById(follow));
    return follow;
  } else {
    return ["An error occurred. Please try again."];
  }
};
export const addArticle = (article) => async (dispatch) => {
  const response = await fetch(`/api/saved/`, {
    method: "POST",
    headers: { "CONTENT-TYPE": "application/json" },
    body: JSON.stringify({ article }),
  });

  if (response.ok) {
    const json = await response.json();
    dispatch(cleanUpArticles());
    dispatch(getAllArticles());
    return json;
  } else {
    return ["An error occurred. Please try again."];
  }
};
export const deleteOneArticle = (articleId) => async (dispatch) => {
  const response = await fetch(`/api/saved/${articleId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const article = await response.json();
    dispatch(cleanUpArticles());
    dispatch(getAllArticles());
    return article;
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const cleanUpArticles = () => (dispatch) => {
  dispatch(cleanUp());
};

const initialState = { allArticles: null, selectedArticle: null };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ARTICLES:
      return { ...state, allArticles: action.payload };
    case GET_ARTICLE_BY_ID:
      return { ...state, selectedArticle: action.payload };
    case CLEAN_UP:
      return initialState;
    default:
      return state;
  }
}
