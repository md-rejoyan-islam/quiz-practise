import PropTypes from "prop-types";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext, QuizContext } from "../../context/context";

export default function PublicGuard({ children }) {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const { loading } = useContext(QuizContext);

  if (user && !loading) {
    return (
      <Navigate
        to={
          user?.role === "admin"
            ? "/dashboard"
            : location.state?.from?.pathname || "/leaderboard"
        }
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
}

PublicGuard.propTypes = {
  children: PropTypes.node.isRequired,
};
