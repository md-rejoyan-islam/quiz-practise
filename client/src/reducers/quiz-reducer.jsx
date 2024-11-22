import {
  ADD_QUESTION,
  ADD_QUIZ,
  COMPLETE_LOADING,
  DELETE_QUESTION,
  GET_ALL_USER_QUIZZES,
  GET_QUIZ_ATTEMPTS,
  QUIZ_ERROR,
  QUIZ_LOADING,
  SET_ALL_QUIZZES,
  UPDATE_QUESTION,
} from "./reducer-types";

export const initialQuizState = {
  adminQuizzes: [],
  userQuizzes: [],
  quizAttempts: null,
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
    case COMPLETE_LOADING:
      return {
        ...state,
        loading: false,
      };
    case SET_ALL_QUIZZES:
      return {
        ...state,
        loading: false,
        error: null,
        adminQuizzes: action.payload.adminQuizzes,
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
        adminQuizzes: [...state.adminQuizzes, action.payload.quiz],
      };
    case ADD_QUESTION:
      return {
        ...state,
        loading: false,
        error: null,
        adminQuizzes: state.adminQuizzes.map((quiz) => {
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
        adminQuizzes: state.adminQuizzes.map((quiz) => {
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
        adminQuizzes: state.adminQuizzes.map((quiz) => {
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
    case GET_ALL_USER_QUIZZES: {
      return {
        ...state,
        loading: false,
        error: null,
        userQuizzes: action.payload.userQuizzes,
      };
    }
    case GET_QUIZ_ATTEMPTS: {
      return {
        ...state,
        loading: false,
        error: null,
        quizAttempts: action.payload.quizAttempts,
      };
    }
    default:
      return state;
  }
};
