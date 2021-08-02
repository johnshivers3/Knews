const GET_FOLLOWS = "follows/GET_FOLLOWS";
const GET_FOLLOW_BY_ID = "follows/GET_FOLLOW_BY_ID";
const CLEAN_UP = "follows/CLEAN_UP";

const getFollows = (follows) => ({
  type: GET_FOLLOWS,
  payload: follows,
});
const getFollowById = (follow) => ({
  type: GET_FOLLOW_BY_ID,
  payload: follow,
});

const cleanUp = () => ({
  type: CLEAN_UP,
});

export const getAllFollows = () => async (dispatch) => {
  const response = await fetch("/api/follows/");

  if (response.ok) {
    const allFollows = await response.json();
    dispatch(getFollows(allFollows));
    return null;
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const getOneFollow = (followId) => async (dispatch) => {
  const response = await fetch(`/api/follows/${followId}`);

  if (response.ok) {
    const follow = await response.json();
    dispatch(getFollowById(follow));
    return null;
  } else {
    return ["An error occurred. Please try again."];
  }
};
export const addFollow = (topicString) => async (dispatch) => {
  const response = await fetch(`/api/follows/`, {
    method: "POST",
    headers: { "CONTENT-TYPE": "application/json" },
    body: JSON.stringify({ topicString }),
  });

  if (response.ok) {
    const json = await response.json();
    dispatch(cleanUp());
    dispatch(getAllFollows());
    return json;
  } else {
    return ["An error occurred. Please try again."];
  }
};
export const deleteOneFollow = (followId) => async (dispatch) => {
  const response = await fetch(`/api/follows/${followId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const follow = await response.json();
    dispatch(cleanUp());
    dispatch(getAllFollows());
    return follow;
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const cleanUpFollows = () => (dispatch) => {
  dispatch(cleanUp());
};

const initialState = { allFollows: null, oneFollow: null };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_FOLLOWS:
      return { ...state, allFollows: action.payload };
    case GET_FOLLOW_BY_ID:
      return { ...state, oneFollow: action.payload };
    case CLEAN_UP:
      return initialState;
    default:
      return state;
  }
}
