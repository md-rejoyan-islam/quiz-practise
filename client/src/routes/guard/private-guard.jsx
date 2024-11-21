import { useContext } from "react";
import { AuthContext } from "../../context/context";

import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

export default function PrivateGuard({ children }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

PrivateGuard.propTypes = {
  children: PropTypes.node.isRequired,
};
