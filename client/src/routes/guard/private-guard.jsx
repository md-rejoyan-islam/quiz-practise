import { useContext } from "react";
import { AuthContext, QuizContext } from "../../context/context";

import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";

export default function PrivateGuard({ children }) {
  const { user } = useContext(AuthContext);
  const { loading } = useContext(QuizContext);
  const location = useLocation();

  if (!user && !loading) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

PrivateGuard.propTypes = {
  children: PropTypes.node.isRequired,
};
