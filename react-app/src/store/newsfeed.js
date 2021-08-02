const GET_TOP = 'newsfeed/GET_TOP'
const GET_RESULTS = 'newsfeed/GET_RESULTS'
const CLEAN_UP = 'newsfeed/CLEAN_UP'

const getTop = (headlines) => ({
  type: GET_TOP,
  payload: headlines
})

const getResults = (results) => ({
  type: GET_RESULTS,
  payload: results
})

const cleanUp = () => ({
  type: CLEAN_UP
})

export const getTopHeadlines = () => async(dispatch) => {
  const response = await fetch('/api/search/top-headlines')

  if(response.ok) {
    const topHeadlines = await response.json()
    dispatch(getTop(topHeadlines))
    return null
  } else {
    return ['An error occurred. Please try again.']
  }
}

export const getSearchResults = (query) => async(dispatch) => {
  const response = await fetch('/api/search/')

  if(response.ok) {
    const searchResults = await response.json()
    dispatch(getResults(searchResults))
    return
  } else {
    return ['An error occurred. Please try again.']
  }
}

export const cleanUpFeed = () => dispatch => {
  dispatch(cleanUp())
}

const initialState = { news: null}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_TOP:
      return { news: action.payload}
    case CLEAN_UP:
      return { news: null}
    default:
      return state;
  }
}
