function MyLeaves({ leaves }) {
	if (leaves.length === 0) {
		return <p>No leave requests yet.</p>;
	}

	return (
		<div className="leave-list">
			{leaves.map((leave) => (
				<article className="leave-request" key={leave.id}>
					<div>
						<h3>{leave.leaveType} Leave</h3>
						<p>{leave.startDate} to {leave.endDate}</p>
						{leave.reason && <p>{leave.reason}</p>}
					</div>
					<strong className={`leave-status leave-status-${leave.status?.toLowerCase()}`}>
						{leave.status}
					</strong>
				</article>
			))}
		</div>
	);
}

export default MyLeaves;
