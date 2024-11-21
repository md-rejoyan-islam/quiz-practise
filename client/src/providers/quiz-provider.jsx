import { useEffect, useReducer } from "react";
import { initialQuizState, quizReducer } from "../reducers/quiz-reducer";

const api = import.meta.env.VITE_API_URL;

import PropTypes from "prop-types";
import { toast } from "react-toastify";
import axiosInstance from "../api/axios-instance";
import { QuizContext } from "../context/context";
import {
  ADD_QUIZ,
  QUIZ_ERROR,
  SET_ALL_QUIZZES,
} from "../reducers/reducer-types";

const QuizProvider = ({ children }) => {
  const [quizState, quizDispatch] = useReducer(quizReducer, initialQuizState);

  // set all quizzes
  const getAllQuizzes = async () => {
    try {
      const response = await axiosInstance.get(`${api}/admin/quizzes`);

      const quizzes = response.data;

      quizDispatch({ type: SET_ALL_QUIZZES, payload: { quizzes } });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // add quiz
  const addQuiz = async ({ data, reset }) => {
    try {
      const response = await axiosInstance.post(`${api}/admin/quizzes`, data);
      const quiz = response.data.data;

      // reset form
      reset();

      quizDispatch({ type: ADD_QUIZ, payload: { quiz } });

      // show success message
      toast.success("Quiz added successfully");
    } catch (error) {
      toast.error(error.response.data.message);
      quizDispatch({ type: QUIZ_ERROR, payload: error.response.data });
    }
  };

  useEffect(() => {
    getAllQuizzes();
  }, []);

  return (
    <QuizContext.Provider
      value={{ quizzes: quizState.quizzes, addQuiz, getAllQuizzes }}
    >
      {children}
    </QuizContext.Provider>
  );
};

QuizProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default QuizProvider;
