const GET_TOP = 'newsfeed/GET_TOP'

const getTop = (headlines) => ({
  type: GET_TOP,
  payload: headlines
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

const initialState = { news: null}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_TOP:
      return { news: action.payload}
    default:
      return state;
  }
}
