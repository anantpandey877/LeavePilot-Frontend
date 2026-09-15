function PendingUsers({ users, onAction, isUpdating }) {
	if (users.length === 0) {
		return <p className="admin-empty">There are no pending users.</p>;
	}

	return (
		<div className="admin-table-wrapper">
			<table className="admin-table">
				<thead>
					<tr>
						<th>Name</th>
						<th>Email</th>
						<th>Role</th>
						<th>Department</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<tr key={user.id}>
							<td>{user.fullName}</td>
							<td>{user.email}</td>
							<td>{user.role}</td>
							<td>{user.department}</td>
							<td className="admin-actions">
								<button
									type="button"
									onClick={() => onAction(user.id, "approve")}
									disabled={isUpdating}
								>
									Approve
								</button>
								<button
									type="button"
									className="admin-reject"
									onClick={() => onAction(user.id, "reject")}
									disabled={isUpdating}
								>
									Reject
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default PendingUsers;
