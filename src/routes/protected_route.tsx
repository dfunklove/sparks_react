import { Navigate } from "react-router-dom";
import { getToken } from "../storage";

const ProtectedRoute = ({ children }) => {
  const token = getToken();
  if (!token) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute