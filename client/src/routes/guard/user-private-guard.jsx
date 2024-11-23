import PropTypes from "prop-types";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/context";

export default function UserPrivateGuard({ children }) {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (user && user.role === "user") {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
}

UserPrivateGuard.propTypes = {
  children: PropTypes.node.isRequired,
};
