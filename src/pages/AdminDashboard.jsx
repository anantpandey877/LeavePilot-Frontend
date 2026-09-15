import { useEffect, useState } from "react";
import PendingUsers from "../components/admin/PendingUsers";
import { getPendingUsers, updateUserStatus } from "../services/adminService";

function AdminDashboard() {
	const [users, setUsers] = useState([]);
	const [message, setMessage] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [isUpdating, setIsUpdating] = useState(false);

	useEffect(() => {
		async function loadPendingUsers() {
			try {
				const pendingUsers = await getPendingUsers();
				setUsers(pendingUsers);
			} catch {
				setMessage("Unable to load pending users.");
			} finally {
				setIsLoading(false);
			}
		}

		loadPendingUsers();
	}, []);

	async function handleUserAction(userId, action) {
		setMessage("");
		setIsUpdating(true);

		try {
			const response = await updateUserStatus(userId, action);
			setUsers((currentUsers) =>
				currentUsers.filter((user) => user.id !== userId),
			);
			setMessage(response.message);
		} catch (error) {
			setMessage(error.response?.data?.message || "Unable to update user.");
		} finally {
			setIsUpdating(false);
		}
	}

	return (
		<main className="admin-page">
			<section className="admin-card">
				<div className="admin-header">
					<div>
						<h1>Admin Dashboard</h1>
						<p>Review users waiting for approval.</p>
					</div>
					<a href="/">Home</a>
				</div>

				{message && <p className="admin-message">{message}</p>}

				{isLoading ? (
					<p className="admin-empty">Loading pending users...</p>
				) : (
					<PendingUsers
						users={users}
						onAction={handleUserAction}
						isUpdating={isUpdating}
					/>
				)}
			</section>
		</main>
	);
}

export default AdminDashboard;
