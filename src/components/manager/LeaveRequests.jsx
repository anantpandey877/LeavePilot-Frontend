function LeaveRequests({ requests, onAction, isUpdating }) {
	if (requests.length === 0) {
		return <p>No leave requests found for your department.</p>;
	}

	return (
		<div className="manager-request-list">
			{requests.map((request) => (
				<article className="manager-request" key={request.leaveId}>
					<div>
						<h3>{request.fullName}</h3>
						<p>{request.email}</p>
						<p>
							{request.leaveType} leave: {request.startDate} to {request.endDate}
						</p>
						{request.reason && <p>Reason: {request.reason}</p>}
					</div>

					<div className="manager-request-actions">
						<strong className={`leave-status leave-status-${request.status?.toLowerCase()}`}>
							{request.status}
						</strong>
						{request.status === "PENDING" && (
							<div>
								<button
									type="button"
									onClick={() => onAction(request.leaveId, "approve")}
									disabled={isUpdating}
								>
									Approve
								</button>
								<button
									type="button"
									className="manager-reject-button"
									onClick={() => onAction(request.leaveId, "reject")}
									disabled={isUpdating}
								>
									Reject
								</button>
							</div>
						)}
					</div>
				</article>
			))}
		</div>
	);
}

export default LeaveRequests;
