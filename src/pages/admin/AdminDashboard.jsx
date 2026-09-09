import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import AdminNavbar from "../../components/AdminNavbar";
import Notification from "../../components/Notification";
import PendingUsersTable from "../../components/PendingUsersTable";
import "../../styles/admin.css";

async function fetchPendingUsers(setPendingUsers, setNotification, setIsLoading) {
  setIsLoading(true);

  try {
    const response = await api.get("/admin/pending-users");
    setPendingUsers(response.data);
  } catch (error) {
    setNotification({
      message: error.response?.data?.message || "Unable to load pending users.",
      type: "error",
    });
  } finally {
    setIsLoading(false);
  }
}

function AdminDashboard() {
  const navigate = useNavigate();
  const [admin] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [pendingUsers, setPendingUsers] = useState([]);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [activeUserId, setActiveUserId] = useState(null);

  useEffect(() => {
    // Only an approved admin should be able to view this page.
    if (!admin) {
      navigate("/login", { replace: true });
      return;
    }

    if (admin.role !== "ADMIN") {
      navigate("/", { replace: true });
      return;
    }

    fetchPendingUsers(setPendingUsers, setNotification, setIsLoading);
  }, [admin, navigate]);

  async function updateUserStatus(userId, action) {
    // Approve or reject the selected user, then reload the table.
    setActiveUserId(userId);
    setNotification({ message: "", type: "" });

    try {
      const response = await api.put(`/admin/users/${userId}/${action}`);
      showNotification(response.data.message, "success");
      await fetchPendingUsers(setPendingUsers, setNotification, setIsLoading);
    } catch (error) {
      showNotification(
        error.response?.data?.message || "The server could not complete this action.",
        "error"
      );
    } finally {
      setActiveUserId(null);
    }
  }

  function showNotification(message, type) {
    setNotification({ message, type });
  }

  function handleLogout() {
    localStorage.removeItem("user");
  }

  if (!admin) {
    return null;
  }

  return (
    <main className="admin-page">
      <AdminNavbar adminName={admin.fullName} onLogout={handleLogout} />

      <section className="admin-content">
        <div className="admin-heading">
          <div>
            <p className="admin-label">Administration</p>
            <h1>Admin Dashboard</h1>
            <p>Review new user accounts and manage access to LeavePilot.</p>
          </div>
          <div className="pending-count">
            <strong>{pendingUsers.length}</strong>
            <span>Pending users</span>
          </div>
        </div>

        <Notification message={notification.message} type={notification.type} />

        <section className="pending-users-section">
          <h2>Pending Users</h2>
          {isLoading ? (
            <p className="loading-message">Loading pending users...</p>
          ) : (
            <PendingUsersTable
              users={pendingUsers}
              onApprove={(userId) => updateUserStatus(userId, "approve")}
              onReject={(userId) => updateUserStatus(userId, "reject")}
              activeUserId={activeUserId}
            />
          )}
        </section>
      </section>
    </main>
  );
}

export default AdminDashboard;
