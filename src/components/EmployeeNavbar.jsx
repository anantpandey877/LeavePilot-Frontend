import { useNavigate } from "react-router-dom";
function EmployeeNavbar({ employeeName, onLogout }) {
  const navigate = useNavigate();

  function handleLogout() {
    onLogout();
    navigate("/login");
  }

  return (
    <header className="employee-navbar">
      <button className="employee-logo" onClick={() => navigate("/employee")}>
        LeavePilot
      </button>
      <div className="employee-navbar-right">
        <span>{employeeName}</span>
        <button className="employee-logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default EmployeeNavbar;
