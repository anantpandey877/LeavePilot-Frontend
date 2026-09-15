import { Navigate } from "react-router-dom";

function ProtectedRoute({ allowedRoles, children }) {
  const savedUser = localStorage.getItem("leavePilotUser");

  if (!savedUser) {
    return <Navigate to="/login" replace />;
  }

  try {
    const user = JSON.parse(savedUser);

    if (!user.role || !allowedRoles.includes(user.role)) {
      return <Navigate to="/" replace />;
    }
  } catch {
    localStorage.removeItem("leavePilotUser");
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
