import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

function ManagerDashboard() {
	const navigate = useNavigate();
	const user = JSON.parse(localStorage.getItem("user") || "{}");

	function handleLogout() {
		localStorage.removeItem("user");
		navigate("/login");
	}

	return (
		<main className="dashboard-page">
			<div className="dashboard-card">
				<h1>Manager Dashboard</h1>
				<p>Welcome {user.fullName || "Manager"}</p>
				<button onClick={handleLogout}>Logout</button>
			</div>
		</main>
	);
}

export default ManagerDashboard;
