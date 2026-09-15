import { useState } from "react";
import { applyForLeave } from "../../services/emoloyeeService";

function ApplyLeaveForm({ userId, onSuccess }) {
	const [leaveType, setLeaveType] = useState("CASUAL");
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [reason, setReason] = useState("");
	const [message, setMessage] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	async function handleSubmit(event) {
		event.preventDefault();
		setMessage("");

		if (endDate < startDate) {
			setMessage("End date cannot be before start date.");
			return;
		}

		setIsSubmitting(true);

		try {
			const response = await applyForLeave({
				userId,
				leaveType,
				startDate,
				endDate,
				reason,
			});
			setMessage(response.message);
			setStartDate("");
			setEndDate("");
			setReason("");
			onSuccess();
		} catch (error) {
			setMessage(error.response?.data?.message || "Unable to apply for leave.");
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<form className="leave-form" onSubmit={handleSubmit}>
			<label htmlFor="leaveType">Leave type</label>
			<select
				id="leaveType"
				value={leaveType}
				onChange={(event) => setLeaveType(event.target.value)}
			>
				<option value="CASUAL">Casual Leave</option>
				<option value="SICK">Sick Leave</option>
				<option value="EARNED">Earned Leave</option>
			</select>

			<label htmlFor="startDate">Start date</label>
			<input
				id="startDate"
				type="date"
				value={startDate}
				onChange={(event) => setStartDate(event.target.value)}
				required
			/>

			<label htmlFor="endDate">End date</label>
			<input
				id="endDate"
				type="date"
				value={endDate}
				onChange={(event) => setEndDate(event.target.value)}
				required
			/>

			<label htmlFor="reason">Reason</label>
			<textarea
				id="reason"
				value={reason}
				onChange={(event) => setReason(event.target.value)}
				rows="3"
			/>

			<button type="submit" disabled={isSubmitting}>
				{isSubmitting ? "Applying..." : "Apply for Leave"}
			</button>

			{message && <p className="leave-form-message">{message}</p>}
		</form>
	);
}

export default ApplyLeaveForm;
