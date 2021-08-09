import business from './../seed_data/business.json'
import entertainment from './../seed_data/entertainment.json'
import general from './../seed_data/general.json'
import health from './../seed_data/health.json'
import science from './../seed_data/science.json'
import sports from './../seed_data/sports.json'
import technology from './../seed_data/technology.json'

const GET_TOP = "newsfeed/GET_TOP";
const GET_RESULTS = "newsfeed/GET_RESULTS";
const CLEAN_UP = "newsfeed/CLEAN_UP";

const getTop = (headlines) => ({
  type: GET_TOP,
  payload: headlines,
});

const getResults = (results) => ({
  type: GET_RESULTS,
  payload: results,
});

const cleanUp = () => ({
  type: CLEAN_UP,
});

export const getTopHeadlines = () => async (dispatch) => {
  const response = await fetch("/api/search/top-headlines");

  if (response.ok) {
    const topHeadlines = await response.json();
    dispatch(getTop(topHeadlines));
    return topHeadlines;
  } else {
    return general
  }
};

export const getSearchResults = (query) => async (dispatch) => {
  const response = await fetch(`/api/search/title/${query}`);

  if (response.ok) {
    const searchResults = await response.json();
    dispatch(getResults(searchResults));
    return searchResults;
  } else {
    switch (query.toLowerCase()) {
      case 'business':
        return business
      case 'entertainment':
        return entertainment
      case 'general':
        return general
      case 'health':
        return health
      case 'science':
        return science
      case 'sports':
        return sports
      case 'techhnology':
        return technology
      default:
        return ["An error has occured"];
    }
  }
};

export const cleanUpFeed = () => (dispatch) => {
  dispatch(cleanUp());
};

const initialState = { news: null, searchResults: null };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_TOP:
      return { ...state, news: action.payload };
    case GET_RESULTS:
      return { ...state, searchResults: action.payload };
    case CLEAN_UP:
      return initialState;
    default:
      return state;
  }
}
