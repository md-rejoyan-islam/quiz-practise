import { useEffect, useReducer, useRef } from "react";
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
  const authLogin = async ({ data, reset }) => {
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

      // set cookies
      Cookies.set("accessToken", tokens.accessToken, {
        sameSite: "strict",
        secure: true,
      });
      Cookies.set("refreshToken", tokens.refreshToken, {
        sameSite: "strict",
        secure: true,
      });
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

  // get new access token
  const getNewAccessToken = async () => {
    try {
      const response = await axios.post(`${api}/auth/refresh-token`, {
        refreshToken: Cookies.get("refreshToken"),
      });
      const { accessToken } = response.data.data;
      console.log(accessToken);

      Cookies.set("accessToken", accessToken, {
        sameSite: "strict",
        secure: true,
      });
    } catch (error) {
      toast.error(error.response.data.message);
      authDispatch({ type: AUTH_ERROR, payload: error.response.data });
      // remove all cookies
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
    }
  };

  // logout
  const authLogout = () => {
    // remove all cookies
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    authDispatch({
      type: AUTH_LOGOUT,
    });
  };

  // call getNewAccessToken on component mount only once
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      getNewAccessToken();
      hasFetched.current = true;
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: authState.user,
        loading: authState.loading,
        error: authState.error,
        authLogin,
        authRegister,
        authLogout,
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
