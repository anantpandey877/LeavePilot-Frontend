import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

function AdminDashboard() {
	const navigate = useNavigate();
	const user = JSON.parse(localStorage.getItem("user") || "{}");

	function handleLogout() {
		localStorage.removeItem("user");
		navigate("/login");
	}

	return (
		<main className="dashboard-page">
			<div className="dashboard-card">
				<h1>Admin Dashboard</h1>
				<p>Welcome {user.fullName || "Admin"}</p>
				<button onClick={handleLogout}>Logout</button>
			</div>
		</main>
	);
}

export default AdminDashboard;
