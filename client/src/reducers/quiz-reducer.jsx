import {
  ADD_QUIZ,
  QUIZ_ERROR,
  QUIZ_LOADING,
  SET_ALL_QUIZZES,
} from "./reducer-types";

export const initialQuizState = {
  quizzes: [],
  loading: false,
  error: null,
};

export const quizReducer = (state, action) => {
  switch (action.type) {
    case QUIZ_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SET_ALL_QUIZZES:
      return {
        ...state,
        loading: false,
        error: null,
        quizzes: action.payload.quizzes,
      };
    case QUIZ_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case ADD_QUIZ:
      return {
        ...state,
        loading: false,
        error: null,
        quizzes: [...state.quizzes, action.payload.quiz],
      };
    default:
      return state;
  }
};
