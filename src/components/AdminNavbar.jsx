import { useNavigate } from "react-router-dom";

function AdminNavbar({ adminName, onLogout }) {
  const navigate = useNavigate();

  function handleLogout() {
    onLogout();
    navigate("/login");
  }

  return (
    <nav className="admin-navbar">
      <button className="admin-logo" onClick={() => navigate("/admin")}>
        LeavePilot
      </button>
      <div className="admin-navbar-right">
        <span>Welcome, {adminName}</span>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default AdminNavbar;
