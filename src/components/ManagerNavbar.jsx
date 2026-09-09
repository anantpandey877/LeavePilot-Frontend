import { useNavigate } from "react-router-dom";

function ManagerNavbar({ managerName, onLogout }) {
  const navigate = useNavigate();

  function handleLogout() {
    onLogout();
    navigate("/login");
  }

  return (
    <header className="manager-navbar">
      <button className="manager-logo" onClick={() => navigate("/manager")}>
        LeavePilot
      </button>
      <div className="manager-navbar-right">
        <span>{managerName}</span>
        <button className="manager-logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default ManagerNavbar;
