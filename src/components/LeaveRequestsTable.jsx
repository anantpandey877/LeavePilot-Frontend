function LeaveRequestsTable({ requests, onApprove, onReject, activeLeaveId }) {
  if (requests.length === 0) {
    return <p className="manager-status-message">There are no leave requests for your department.</p>;
  }

  return (
    <div className="manager-table-wrapper">
      <table className="leave-requests-table">
        <thead>
          <tr>
            <th>Leave ID</th>
            <th>Employee Name</th>
            <th>Employee Email</th>
            <th>Department</th>
            <th>Leave Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.leaveId}>
              <td>{request.leaveId}</td>
              <td>{request.fullName}</td>
              <td>{request.email}</td>
              <td>{request.department}</td>
              <td>{request.leaveType}</td>
              <td>{request.startDate}</td>
              <td>{request.endDate}</td>
              <td>{request.reason}</td>
              <td>{request.status}</td>
              <td className="manager-action-buttons">
                {request.status === "PENDING" && (
                  <>
                    <button
                      className="manager-approve-button"
                      onClick={() => onApprove(request.leaveId)}
                      disabled={activeLeaveId === request.leaveId}
                    >
                      Approve
                    </button>
                    <button
                      className="manager-reject-button"
                      onClick={() => onReject(request.leaveId)}
                      disabled={activeLeaveId === request.leaveId}
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeaveRequestsTable;
