import { useEffect, useState } from "react";
import ApplyLeaveForm from "../components/employee/ApplyLeaveForm";
import LeaveCard from "../components/employee/LeaveCard";
import MyLeaves from "../components/employee/MyLeaves";
import LogoutButton from "../components/common/LogoutButton";
import { getLeaveBalance, getMyLeaves } from "../services/emoloyeeService";

function EmployeeDashboard() {
	const [balance, setBalance] = useState(null);
	const [leaves, setLeaves] = useState([]);
	const [message, setMessage] = useState("");
	const [userId, setUserId] = useState(null);

	useEffect(() => {
		async function loadBalance() {
			const savedUser = localStorage.getItem("leavePilotUser");

			if (!savedUser) {
				setMessage("Please login to view your leave balance.");
				return;
			}

			try {
				const user = JSON.parse(savedUser);
				setUserId(user.id);
				const [leaveBalance, myLeaves] = await Promise.all([
					getLeaveBalance(user.id),
					getMyLeaves(user.id),
				]);
				setBalance(leaveBalance);
				setLeaves(myLeaves);
			} catch {
				setMessage("Unable to load your leave balance.");
			}
		}

		loadBalance();
	}, []);

	return (
		<main className="dashboard-page">
			<div className="dashboard-heading">
				<div>
					<h1>Employee Dashboard</h1>
					<p>Welcome to your LeavePilot dashboard.</p>
				</div>
				<div className="dashboard-actions">
					<a href="/">Home</a>
					<LogoutButton />
				</div>
			</div>

			<section className="dashboard-section">
				<h2>Leave Balance</h2>
				{message && <p className="dashboard-message">{message}</p>}
				<div className="leave-card-grid">
					<LeaveCard title="Casual Leave" days={balance?.casualLeave ?? "--"} />
					<LeaveCard title="Sick Leave" days={balance?.sickLeave ?? "--"} />
					<LeaveCard title="Earned Leave" days={balance?.earnedLeave ?? "--"} />
				</div>
			</section>

			<section className="dashboard-section dashboard-placeholder">
				<h2>Apply for Leave</h2>
				{userId ? (
					<ApplyLeaveForm
						userId={userId}
						onSuccess={async () => {
							setMessage("Leave request submitted.");
							setLeaves(await getMyLeaves(userId));
						}}
					/>
				) : (
					<p>Please login to apply for leave.</p>
				)}
			</section>

			<section className="dashboard-section dashboard-placeholder">
				<h2>My Leave Requests</h2>
				<MyLeaves leaves={leaves} />
			</section>
		</main>
	);
}

export default EmployeeDashboard;
