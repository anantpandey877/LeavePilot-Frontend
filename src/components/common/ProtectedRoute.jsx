import { Navigate } from "react-router-dom";

function ProtectedRoute({ allowedRoles, children }) {
  const savedUser = localStorage.getItem("leavePilotUser");

  if (!savedUser) {
    return <Navigate to="/login" replace />;
  }

  let user;

  try {
    user = JSON.parse(savedUser);
  } catch {
    localStorage.removeItem("leavePilotUser");
    return <Navigate to="/login" replace />;
  }

  if (
    !user.token ||
    user.status !== "APPROVED" ||
    !user.role ||
    !allowedRoles.includes(user.role)
  ) {
    localStorage.removeItem("leavePilotUser");
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
