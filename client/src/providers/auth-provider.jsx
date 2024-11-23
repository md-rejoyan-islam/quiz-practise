import { useReducer } from "react";
import { AuthContext } from "../context/context";

import axios from "axios";
import Cookies from "js-cookie";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { authReducer, initialAuthState } from "../reducers/auth-reducer";
import { AUTH_ERROR, AUTH_LOGIN, AUTH_LOGOUT } from "../reducers/reducer-types";

const api = import.meta.env.VITE_API_URL;

const AuthProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, initialAuthState);

  // user login
  const authLogin = async ({ data, reset, navigate, from }) => {
    try {
      // authDispatch({ type: AUTH_LOADING, payload: null });
      const response = await axios.post(`${api}/auth/login`, {
        email: data.email,
        password: data.password,
        role: data.role,
      });
      const { user, tokens } = response.data.data;

      // reset form
      reset();
      // navigate
      navigate(from, { replace: true });

      // set token
      // localStorage.setItem("accessToken", tokens.accessToken);
      // localStorage.setItem("refreshToken", tokens.refreshToken);
      Cookies.set("accessToken", tokens.accessToken, {
        sameSite: "strict",
        secure: true,
      });
      Cookies.set("refreshToken", tokens.refreshToken, {
        sameSite: "strict",
        secure: true,
      });

      localStorage.setItem("user", JSON.stringify(user));
      authDispatch({ type: AUTH_LOGIN, payload: { user } });

      // show success message
      toast.success("Login successful");
    } catch (error) {
      toast.error(error.response.data.message);
      authDispatch({ type: AUTH_ERROR, payload: error.response.data });
    }
  };

  // user register
  const authRegister = async ({ data, reset, navigate }) => {
    try {
      await axios.post(`${api}/auth/register`, data);

      // reset form
      reset();
      // navigate to login page
      navigate("/login");

      // show success message
      toast.success("Registration successful");
    } catch (error) {
      toast.error(error.response.data.message);
      authDispatch({ type: AUTH_ERROR, payload: error.response.data });
    }
  };

  // logout
  const authLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    authDispatch({
      type: AUTH_LOGOUT,
    });
    localStorage.clear();
  };

  // auth user clear
  const authError = () => {
    authDispatch({
      type: AUTH_ERROR,
      payload: null,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user: authState.user,
        loading: authState.loading,
        error: authState.error,
        authLogin,
        authRegister,
        authLogout,
        authError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
