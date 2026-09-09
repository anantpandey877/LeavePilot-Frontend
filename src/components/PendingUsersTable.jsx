function PendingUsersTable({ users, onApprove, onReject, activeUserId }) {
  if (users.length === 0) {
    return <p className="empty-message">There are no pending users.</p>;
  }

  return (
    <div className="table-wrapper">
      <table className="pending-users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Department</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.department}</td>
              <td>{user.status}</td>
              <td className="action-buttons">
                <button
                  className="approve-button"
                  onClick={() => onApprove(user.id)}
                  disabled={activeUserId === user.id}
                >
                  Approve
                </button>
                <button
                  className="reject-button"
                  onClick={() => onReject(user.id)}
                  disabled={activeUserId === user.id}
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

export default PendingUsersTable;
