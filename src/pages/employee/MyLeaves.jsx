import { useEffect, useState } from "react";
import api from "../../api/axios";

async function fetchLeaves(employeeId, setLeaves, onNotify, setIsLoading) {
  setIsLoading(true);

  try {
    const response = await api.get(`/employee/leaves?userId=${employeeId}`);
    setLeaves(response.data);
  } catch (error) {
    onNotify({
      message: error.response?.data?.message || "Unable to load your leaves.",
      type: "error",
    });
  } finally {
    setIsLoading(false);
  }
}

function MyLeaves({ employeeId, refreshKey, onNotify }) {
  const [leaves, setLeaves] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeLeaveId, setActiveLeaveId] = useState(null);

  useEffect(() => {
    fetchLeaves(employeeId, setLeaves, onNotify, setIsLoading);
  }, [employeeId, refreshKey, onNotify]);

  async function handleCancel(leaveId) {
    setActiveLeaveId(leaveId);

    try {
      const response = await api.put(`/employee/leaves/${leaveId}/cancel`);
      onNotify({
        message: response.data.message || "Leave cancelled successfully.",
        type: "success",
      });
      await fetchLeaves(employeeId, setLeaves, onNotify, setIsLoading);
    } catch (error) {
      onNotify({
        message: error.response?.data?.message || "Unable to cancel leave.",
        type: "error",
      });
    } finally {
      setActiveLeaveId(null);
    }
  }

  return (
    <section className="employee-content-section">
      <p className="employee-label">Leave history</p>
      <h1>My Leaves</h1>
      {isLoading ? (
        <p className="employee-status-message">Loading your leaves...</p>
      ) : leaves.length === 0 ? (
        <p className="employee-status-message">You have not applied for any leave yet.</p>
      ) : (
        <div className="leave-table-wrapper">
          <table className="leave-table">
            <thead>
              <tr>
                <th>Leave Type</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave) => (
                <tr key={leave.id}>
                  <td>{leave.leaveType}</td>
                  <td>{leave.startDate}</td>
                  <td>{leave.endDate}</td>
                  <td>{leave.reason}</td>
                  <td>{leave.status}</td>
                  <td>
                    {leave.status === "PENDING" && (
                      <button
                        className="cancel-button"
                        onClick={() => handleCancel(leave.id)}
                        disabled={activeLeaveId === leave.id}
                      >
                        {activeLeaveId === leave.id ? "Cancelling..." : "Cancel"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default MyLeaves;
