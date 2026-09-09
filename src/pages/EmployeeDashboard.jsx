import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

function EmployeeDashboard() {
	const navigate = useNavigate();
	const user = JSON.parse(localStorage.getItem("user") || "{}");

	function handleLogout() {
		localStorage.removeItem("user");
		navigate("/login");
	}

	return (
		<main className="dashboard-page">
			<div className="dashboard-card">
				<h1>Employee Dashboard</h1>
				<p>Welcome {user.fullName || "Employee"}</p>
				<button onClick={handleLogout}>Logout</button>
			</div>
		</main>
	);
}

export default EmployeeDashboard;
