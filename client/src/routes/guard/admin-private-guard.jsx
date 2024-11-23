import PropTypes from "prop-types";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/context";

export default function AdminPrivateGuard({ children }) {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (user && user.role === "admin") {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
}

AdminPrivateGuard.propTypes = {
  children: PropTypes.node.isRequired,
};
