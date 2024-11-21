import PropTypes from "prop-types";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/context";

export default function PublicGuard({ children }) {
  const { user } = useContext(AuthContext);

  if (user) {
    return (
      <Navigate to={user?.role === "admin" ? "/dashboard" : "/leaderboard"} />
    );
  }

  return children;
}

PublicGuard.propTypes = {
  children: PropTypes.node.isRequired,
};
