import { useContext, useEffect, useReducer } from "react";
import { initialQuizState, quizReducer } from "../reducers/quiz-reducer";

const api = import.meta.env.VITE_API_URL;

import axios from "axios";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import axiosInstance from "../api/axios-instance";
import { AuthContext, QuizContext } from "../context/context";
import {
  ADD_QUESTION,
  ADD_QUIZ,
  COMPLETE_LOADING,
  DELETE_QUESTION,
  GET_ALL_USER_QUIZZES,
  QUIZ_ERROR,
  QUIZ_LOADING,
  SET_ALL_QUIZZES,
  UPDATE_QUESTION,
} from "../reducers/reducer-types";

const QuizProvider = ({ children }) => {
  const [quizState, quizDispatch] = useReducer(quizReducer, initialQuizState);

  const { user, authLogout } = useContext(AuthContext);

  // set all admin quizzes
  const getAllAdminQuizzes = async () => {
    try {
      quizDispatch({ type: QUIZ_LOADING });
      const response = await axiosInstance.get(`${api}/admin/quizzes`);

      const quizzes = response.data;

      quizDispatch({
        type: SET_ALL_QUIZZES,
        payload: { adminQuizzes: quizzes },
      });
    } catch (error) {
      if (error?.response?.status === 401) {
        authLogout();
      }
    } finally {
      quizDispatch({ type: COMPLETE_LOADING });
    }
  };

  // get users quizzes
  const getUserQuizzes = async () => {
    try {
      quizDispatch({ type: QUIZ_LOADING });
      const response = await axios.get(`${api}/quizzes`);

      const quizzes = response.data.data;

      // after getting all quizzes, all get quiz attempts for each quiz
      if (quizzes.length > 0 && user?.id) {
        const quizzesWithAttempts = await Promise.all(
          quizzes.map(async (quiz) => {
            const response = await axiosInstance.get(
              `${api}/quizzes/${quiz.id}/attempts`
            );
            // Add attempts to the quiz object
            quiz.attempts = response.data.data;
            return quiz;
          })
        );
        return quizDispatch({
          type: GET_ALL_USER_QUIZZES,
          payload: { userQuizzes: quizzesWithAttempts },
        });
      }
      quizDispatch({
        type: GET_ALL_USER_QUIZZES,
        payload: { userQuizzes: quizzes },
      });
    } catch (error) {
      quizDispatch({ type: QUIZ_ERROR, payload: error?.response?.data });
    } finally {
      quizDispatch({ type: COMPLETE_LOADING });
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
      if (error.response.status === 401) {
        authLogout();
      }
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
      if (error.response.status === 401) {
        authLogout();
      }
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
      if (error.response.status === 401) {
        authLogout();
      }
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
      if (error.response.status === 401) {
        authLogout();
      }
      toast.error(error.response.data.message);
      quizDispatch({ type: QUIZ_ERROR, payload: error.response.data });
      return { status: false, error: error.response.data.message };
    }
  };
  // delete quiz
  const deleteQuiz = async ({ id }) => {
    try {
      const response = await axiosInstance.delete(`${api}/admin/quizzes/${id}`);

      if (response.data.data) {
        getAllAdminQuizzes();
        return { status: true };
      } else {
        return { status: false, error: "Data not found." };
      }
    } catch (error) {
      if (error.response.status === 401) {
        authLogout();
      }
      quizDispatch({ type: QUIZ_ERROR, payload: error.response.data });
      return { status: false, error: error.response.data.message };
    }
  };
  // edit quiz
  const editQuiz = async ({ data, id }) => {
    try {
      await axiosInstance.patch(`${api}/admin/quizzes/${id}`, data);
      getAllAdminQuizzes();
      toast.success("Quiz updated successfully");
      return { status: true };
    } catch (error) {
      if (error.response.status === 401) {
        authLogout();
      }
      quizDispatch({ type: QUIZ_ERROR, payload: error.response.data });

      return { status: false };
    }
  };

  // get quiz by id
  const getQuizById = async (id) => {
    try {
      quizDispatch({ type: QUIZ_LOADING });
      const response = await axiosInstance.get(`${api}/quizzes/${id}`);
      const quiz = response.data.data;

      return { status: true, quiz };
    } catch (error) {
      if (error.response.status === 401) {
        authLogout();
      }
      quizDispatch({ type: QUIZ_ERROR, payload: error.response.data });
      return { status: false, error: error.response.data.message };
    } finally {
      quizDispatch({ type: COMPLETE_LOADING });
    }
  };

  /// quiz attempt
  const attemptQuiz = async ({ data, id, navigate }) => {
    try {
      const response = await axiosInstance.post(
        `${api}/quizzes/${id}/attempt`,
        data
      );
      console.log(response);

      toast.success("Quiz attempted successfully");
      navigate(`/result/` + response.data.data.quiz.id);
    } catch (error) {
      if (error.response.status === 401) {
        authLogout();
      }
      toast.error(error.response.data.message);
      quizDispatch({ type: QUIZ_ERROR, payload: error.response.data });
      return { status: false, error: error.response.data.message };
    }
  };

  // get quiz attempts by quiz id
  const getQuizAttemptsByQuizId = async (id) => {
    try {
      const response = await axiosInstance.get(`${api}/quizzes/${id}/attempts`);

      const attempts = response.data.data;

      return { status: true, attempts };
    } catch (error) {
      if (error.response.status === 401) {
        authLogout();
      }

      quizDispatch({ type: QUIZ_ERROR, payload: error.response.data });
      return { status: false, error: error.response.data.message };
    }
  };

  useEffect(() => {
    getUserQuizzes();
    if (user && user?.role === "admin") {
      getAllAdminQuizzes();
    }
    // getQuizAttempts();
  }, [user]);

  // useEffect(() => {
  //   if (!localStorage.getItem("user")) {
  //     authLogout();
  //   }
  // }, []);

  return (
    <QuizContext.Provider
      value={{
        adminQuizzes: quizState.adminQuizzes,
        userQuizzes: quizState.userQuizzes,
        addQuiz,
        getAllAdminQuizzes,
        addQuestion,
        deleteQuestion,
        updateQuestion,
        deleteQuiz,
        editQuiz,
        getQuizById,
        loading: quizState.loading,
        attemptQuiz,
        quizAttempts: quizState.quizAttempts,
        getUserQuizzes,
        getQuizAttemptsByQuizId,
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
