import {
  AUTH_ERROR,
  AUTH_LOADING,
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_REGISTER,
  AUTH_SUCCESS,
  SET_ERROR_MESSAGE_EMPTY,
} from "./reducer-types";

export const initialAuthState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  accessToken: null,
  loading: false,
  error: null,
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case AUTH_LOGIN:
      return {
        ...state,
        user: action.payload.user,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case AUTH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
        user: null,
      };

    case AUTH_LOGOUT:
      return {
        ...state,
        user: null,
        accessToken: null,
      };
    case AUTH_REGISTER:
      return {
        ...state,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
      };
    case SET_ERROR_MESSAGE_EMPTY:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
