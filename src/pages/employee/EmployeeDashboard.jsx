import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeNavbar from "../../components/EmployeeNavbar";
import EmployeeSidebar from "../../components/EmployeeSidebar";
import Notification from "../../components/Notification";
import ApplyLeave from "./ApplyLeave";
import DashboardHome from "./DashboardHome";
import MyLeaves from "./MyLeaves";
import "../../styles/employee.css";

function EmployeeDashboard() {
  const navigate = useNavigate();
  const [employee] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [activePage, setActivePage] = useState("home");
  const [refreshKey, setRefreshKey] = useState(0);
  const [notification, setNotification] = useState({ message: "", type: "" });

  useEffect(() => {
    if (!employee) {
      navigate("/login", { replace: true });
      return;
    }

    if (employee.role !== "EMPLOYEE") {
      navigate("/", { replace: true });
    }
  }, [employee, navigate]);

  function handleLogout() {
    localStorage.removeItem("user");
  }

  function handleLeaveApplied() {
    setRefreshKey((currentKey) => currentKey + 1);
    setActivePage("leaves");
  }

  if (!employee) {
    return null;
  }

  return (
    <main className="employee-page">
      <EmployeeNavbar employeeName={employee.fullName} onLogout={handleLogout} />
      <div className="employee-layout">
        <EmployeeSidebar activePage={activePage} onPageChange={setActivePage} />
        <div className="employee-main-content">
          <Notification
            message={notification.message}
            type={notification.type}
            className="employee-notification"
          />

          {activePage === "home" && (
            <DashboardHome
              employeeId={employee.id}
              refreshKey={refreshKey}
              onNotify={setNotification}
            />
          )}
          {activePage === "apply" && (
            <ApplyLeave
              employeeId={employee.id}
              onNotify={setNotification}
              onSuccess={handleLeaveApplied}
            />
          )}
          {activePage === "leaves" && (
            <MyLeaves
              employeeId={employee.id}
              refreshKey={refreshKey}
              onNotify={setNotification}
            />
          )}
        </div>
      </div>
    </main>
  );
}

export default EmployeeDashboard;
