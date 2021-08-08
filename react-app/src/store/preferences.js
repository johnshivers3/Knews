const GET_PREFS = "preferences/GET_PREFS";
const CLEAN_UP = "preferences/CLEAN_UP";
const SET_SETTING = "preferences/SET_SETTING";

const getPreferences = (preferences) => ({
  type: GET_PREFS,
  payload: preferences,
});

const settingAction = (setting) => ({
  type: SET_SETTING,
  payload: setting,
});

const cleanUp = () => ({
  type: CLEAN_UP,
});

export const getUserPreferences = () => async (dispatch) => {
  const response = await fetch("/api/pref/");

  if (response.ok) {
    const preferences = await response.json();
    dispatch(getPreferences(preferences));
    return preferences;
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const updatePreferences = (preferences) => async (dispatch) => {
  const response = await fetch(`/api/pref/`, {
    method: "PATCH",
    headers: { "CONTENT-TYPE": "application/json" },
    body: JSON.stringify({ preferences }),
  });

  if (response.ok) {
    const update = await response.json();

    dispatch(getUserPreferences());
    return update;
  } else {
    return ["An error occurred. Please try again."];
  }
};
export const deletePreferences = (prefId) => async (dispatch) => {
  const response = await fetch(`/api/pref/${prefId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const pref = await response.json();
    dispatch(cleanUpPreferences());
    dispatch(getUserPreferences());
    return pref;
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const switchSetting = (setting) => (dispatch) => {
  dispatch(settingAction(setting));
};

export const cleanUpPreferences = () => (dispatch) => {
  dispatch(cleanUp());
};

const initialState = { preferences: null, setting: null };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_PREFS:
      return { ...state, preferences: action.payload };
    case SET_SETTING:
      return { ...state, setting: action.payload };
    case CLEAN_UP:
      return initialState;
    default:
      return state;
  }
}
