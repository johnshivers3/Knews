const GET_FOLLOWS = 'follows/GET_FOLLOWS'
const CLEAN_UP = 'follows/CLEAN_UP'

const getFollows = (follows) => ({
  type: GET_FOLLOWS,
  payload: follows
})

const cleanUp = () => ({
  type: CLEAN_UP
})


export const getAllFollows = () => async(dispatch) => {
  const response = await fetch('/api/follows/')

  if(response.ok) {
    const allFollows = await response.json()
    dispatch(getFollows(allFollows))
    return null
  } else {
    return ['An error occurred. Please try again.']
  }
}

export const cleanUpFollows = () => dispatch => {
  dispatch(cleanUp())
}

const initialState = { allFollows: null}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_FOLLOWS:
      return { allFollows: action.payload}
    default:
      return state;
  }
}
