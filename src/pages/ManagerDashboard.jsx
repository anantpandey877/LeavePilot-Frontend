import { useEffect, useState } from "react";
import LeaveRequests from "../components/manager/LeaveRequests";
import LogoutButton from "../components/common/LogoutButton";
import {
	getDepartmentLeaves,
	updateLeaveStatus,
} from "../services/managerService";

function ManagerDashboard() {
	const [requests, setRequests] = useState([]);
	const [manager, setManager] = useState(null);
	const [message, setMessage] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [isUpdating, setIsUpdating] = useState(false);

	useEffect(() => {
		async function loadRequests() {
			const savedUser = localStorage.getItem("leavePilotUser");

			if (!savedUser) {
				setMessage("Please login to view leave requests.");
				setIsLoading(false);
				return;
			}

			try {
				const user = JSON.parse(savedUser);
				setManager(user);
				const departmentRequests = await getDepartmentLeaves(user.department);
				setRequests(departmentRequests);
			} catch {
				setMessage("Unable to load leave requests.");
			} finally {
				setIsLoading(false);
			}
		}

		loadRequests();
	}, []);

	async function handleAction(leaveId, action) {
		setMessage("");
		setIsUpdating(true);

		try {
			const response = await updateLeaveStatus(leaveId, action, manager.id);
			setRequests((currentRequests) =>
				currentRequests.map((request) =>
					request.leaveId === leaveId
						? {
								...request,
								status: action === "approve" ? "APPROVED" : "REJECTED",
							}
						: request,
				),
			);
			setMessage(response.message);
		} catch (error) {
			setMessage(error.response?.data?.message || "Unable to update leave request.");
		} finally {
			setIsUpdating(false);
		}
	}

	return (
		<main className="dashboard-page manager-dashboard">
			<div className="dashboard-heading">
				<div>
					<h1>Manager Dashboard</h1>
					<p>Review leave requests from your department.</p>
				</div>
				<div className="dashboard-actions">
					<a href="/">Home</a>
					<LogoutButton />
				</div>
			</div>

			{message && <p className="dashboard-message">{message}</p>}

			<section className="dashboard-section dashboard-placeholder">
				<h2>Department Leave Requests</h2>
				{isLoading ? (
					<p>Loading leave requests...</p>
				) : (
					<LeaveRequests
						requests={requests}
						onAction={handleAction}
						isUpdating={isUpdating}
					/>
				)}
			</section>
		</main>
	);
}

export default ManagerDashboard;
