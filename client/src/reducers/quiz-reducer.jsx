import {
  ADD_QUESTION,
  ADD_QUIZ,
  DELETE_QUESTION,
  QUIZ_ERROR,
  QUIZ_LOADING,
  SET_ALL_QUIZZES,
  UPDATE_QUESTION,
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
    case ADD_QUESTION:
      return {
        ...state,
        loading: false,
        error: null,
        quizzes: state.quizzes.map((quiz) => {
          if (quiz.id === action.payload.id) {
            return {
              ...quiz,
              Questions: [...quiz.Questions, action.payload.question],
            };
          }
          return quiz;
        }),
      };
    case DELETE_QUESTION:
      return {
        ...state,
        loading: false,
        error: null,
        quizzes: state.quizzes.map((quiz) => {
          if (quiz.id === action.payload.quizId) {
            return {
              ...quiz,
              Questions: quiz.Questions.filter(
                (question) => question.id !== action.payload.questionId
              ),
            };
          }
          return quiz;
        }),
      };
    case UPDATE_QUESTION:
      return {
        ...state,
        loading: false,
        error: null,
        quizzes: state.quizzes.map((quiz) => {
          if (quiz.id === action.payload.question.quizId) {
            return {
              ...quiz,
              Questions: quiz.Questions.map((question) => {
                if (question.id === action.payload.question.id) {
                  return action.payload.question;
                }
                return question;
              }),
            };
          }
          return quiz;
        }),
      };
    default:
      return state;
  }
};
