import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import LeaveRequestsTable from "../../components/LeaveRequestsTable";
import ManagerNavbar from "../../components/ManagerNavbar";
import ManagerSidebar from "../../components/ManagerSidebar";
import Notification from "../../components/Notification";
import "../../styles/manager.css";

async function fetchDepartmentLeaves(manager, setRequests, setNotification, setIsLoading) {
  setIsLoading(true);

  try {
    const response = await api.get(
      `/manager/leaves?department=${encodeURIComponent(manager.department)}`
    );
    setRequests(response.data);
  } catch (error) {
    setNotification({
      message: error.response?.data?.message || "Unable to load department leave requests.",
      type: "error",
    });
  } finally {
    setIsLoading(false);
  }
}

function ManagerDashboard() {
  const navigate = useNavigate();
  const [manager] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [activePage, setActivePage] = useState("requests");
  const [requests, setRequests] = useState([]);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [activeLeaveId, setActiveLeaveId] = useState(null);

  useEffect(() => {
    // Only a logged-in manager can view department requests.
    if (!manager) {
      navigate("/login", { replace: true });
      return;
    }

    if (manager.role !== "MANAGER") {
      navigate("/", { replace: true });
      return;
    }

    fetchDepartmentLeaves(manager, setRequests, setNotification, setIsLoading);
  }, [manager, navigate]);

  async function updateLeaveStatus(leaveId, action) {
    setActiveLeaveId(leaveId);
    setNotification({ message: "", type: "" });

    try {
      const response = await api.put(
        `/manager/leaves/${leaveId}/${action}?managerId=${manager.id}`
      );
      setNotification({
        message: response.data.message,
        type: "success",
      });
      await fetchDepartmentLeaves(manager, setRequests, setNotification, setIsLoading);
    } catch (error) {
      setNotification({
        message: error.response?.data?.message || "The server could not complete this action.",
        type: "error",
      });
    } finally {
      setActiveLeaveId(null);
    }
  }

  function handleLogout() {
    localStorage.removeItem("user");
  }

  if (!manager) {
    return null;
  }

  return (
    <main className="manager-page">
      <ManagerNavbar managerName={manager.fullName} onLogout={handleLogout} />
      <div className="manager-layout">
        <ManagerSidebar activePage={activePage} onPageChange={setActivePage} />
        <div className="manager-main-content">
          <Notification
            message={notification.message}
            type={notification.type}
            className="manager-notification"
          />

          {activePage === "requests" && (
            <section className="manager-content-section">
              <p className="manager-label">{manager.department} Department</p>
              <h1>Leave Requests</h1>
              <p className="manager-description">
                Review and manage leave requests from your department.
              </p>

              {isLoading ? (
                <p className="manager-status-message">Loading leave requests...</p>
              ) : (
                <LeaveRequestsTable
                  requests={requests}
                  onApprove={(leaveId) => updateLeaveStatus(leaveId, "approve")}
                  onReject={(leaveId) => updateLeaveStatus(leaveId, "reject")}
                  activeLeaveId={activeLeaveId}
                />
              )}
            </section>
          )}
        </div>
      </div>
    </main>
  );
}

export default ManagerDashboard;
