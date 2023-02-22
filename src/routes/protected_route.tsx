import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children, token }: { children: any, token: any }) => {
  if (!token) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children ? children : <Outlet/>;
};

export default ProtectedRoute