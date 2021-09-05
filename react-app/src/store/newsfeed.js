import * as business from './../seed_data/business.json'
import * as entertainment from './../seed_data/entertainment.json'
import * as general from './../seed_data/general.json'
import * as health from './../seed_data/health.json'
import * as science from './../seed_data/science.json'
import * as sports from './../seed_data/sports.json'
import * as technology from './../seed_data/technology.json'

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

export const getTopHeadlines = (country, category) => async (dispatch) => {
  const response = await fetch(`/api/search/top-headlines/${country}/${category}`);

  if (response.ok) {
    const topHeadlines = await response.json();
    dispatch(getTop(topHeadlines));
    return topHeadlines;
  } else {
    return general['articles']
  }
};

export const getSearchResults = (query, language) => async (dispatch) => {
  const response = await fetch(`/api/search/title/${query}/${language}`);

  if (response.ok) {
    const searchResults = await response.json();
    dispatch(getResults(searchResults));
    return searchResults;
  } else {
    switch (query.toLowerCase()) {
      case 'business':
        return business['articles']
      case 'entertainment':
        return entertainment['articles']
      case 'general':
        return general['articles']
      case 'health':
        return health['articles']
      case 'science':
        return science['articles']
      case 'sports':
        return sports['articles']
      case 'technology':
        return technology['articles']
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
