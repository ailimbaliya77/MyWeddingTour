import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("access-token");

  if (!token) {
    alert("You must be logged in to continue.");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
