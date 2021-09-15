const GET_PREFS = "preferences/GET_PREFS";
const SET_SETTING = "preferences/SET_SETTING";

const getPreferences = (preferences) => ({
  type: GET_PREFS,
  payload: preferences,
});

const settingAction = (setting) => ({
  type: SET_SETTING,
  payload: setting,
});



export const getUserPreferences = () => async (dispatch) => {
  const response = await fetch("/api/pref/");

  if (response.ok) {
    const preferences = await response.json();
    console.log(preferences);

    dispatch(getPreferences(preferences));
    return preferences;
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const updatePreferences = (preferences) => async (dispatch) => {
  console.log(preferences);
  const response = await fetch(`/api/pref/`, {
    method: "PUT",
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

    dispatch(getUserPreferences());
    return pref;
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const switchSetting = (setting) => (dispatch) => {
  dispatch(settingAction(setting));
};

const initialState = { preferences: null, setting: null };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_PREFS:
      return { ...state, preferences: action.payload };
    case SET_SETTING:
      return { ...state, setting: action.payload };
    default:
      return state;
  }
}
