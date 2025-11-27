export default function ProtectedRoute({ children, openLogin }) {
  const token = localStorage.getItem("token");

  if (!token) {
    openLogin(true);
    return <Navigate to="/" replace />;
  }

  return children;
}
