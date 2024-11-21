import { useEffect, useReducer } from "react";
import { initialQuizState, quizReducer } from "../reducers/quiz-reducer";

const api = import.meta.env.VITE_API_URL;

import PropTypes from "prop-types";
import { toast } from "react-toastify";
import axiosInstance from "../api/axios-instance";
import { QuizContext } from "../context/context";
import {
  ADD_QUESTION,
  ADD_QUIZ,
  DELETE_QUESTION,
  QUIZ_ERROR,
  SET_ALL_QUIZZES,
  UPDATE_QUESTION,
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

      return { status: true, id: quiz.id };
    } catch (error) {
      toast.error(error.response.data.message);
      quizDispatch({ type: QUIZ_ERROR, payload: error.response.data });
      return { status: false, id: null };
    }
  };

  // add question to quiz
  const addQuestion = async ({ data, reset, id, setCorrectAnswer }) => {
    try {
      const response = await axiosInstance.post(
        `${api}/admin/quizzes/${id}/questions`,
        data
      );
      const question = response.data.data;

      // reset form
      reset();
      setCorrectAnswer();

      quizDispatch({ type: ADD_QUESTION, payload: { question, id } });

      // show success message
      toast.success("Question added successfully");
    } catch (error) {
      toast.error(error.response.data.message);
      quizDispatch({ type: QUIZ_ERROR, payload: error.response.data });
    }
  };

  // delete question from quiz
  const deleteQuestion = async ({ quizId, questionId }) => {
    try {
      const response = await axiosInstance.delete(
        `${api}/admin/questions/${questionId}`
      );

      if (response.data.data) {
        quizDispatch({
          type: DELETE_QUESTION,
          payload: { quizId, questionId },
        });

        return { status: true };
      } else {
        return { status: false, error: "Data not found." };
      }
    } catch (error) {
      toast.error(error.response.data.message);
      quizDispatch({ type: QUIZ_ERROR, payload: error.response.data });
      return { status: false, error: error.response.data.message };
    }
  };

  // update question in quiz
  const updateQuestion = async ({ data, id, setIsOpenModal }) => {
    try {
      const response = await axiosInstance.patch(
        `${api}/admin/questions/${id}`,
        data
      );

      setIsOpenModal(false);
      const question = response.data.data;
      quizDispatch({ type: UPDATE_QUESTION, payload: { question } });
      toast.success("Question updated successfully");
    } catch (error) {
      toast.error(error.response.data.message);
      quizDispatch({ type: QUIZ_ERROR, payload: error.response.data });
      return { status: false, error: error.response.data.message };
    }
  };

  useEffect(() => {
    getAllQuizzes();
  }, []);

  return (
    <QuizContext.Provider
      value={{
        quizzes: quizState.quizzes,
        addQuiz,
        getAllQuizzes,
        addQuestion,
        deleteQuestion,
        updateQuestion,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

QuizProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default QuizProvider;
