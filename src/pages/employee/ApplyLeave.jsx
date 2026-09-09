import { useState } from "react";
import api from "../../api/axios";

function ApplyLeave({ employeeId, onNotify, onSuccess }) {
  const [formData, setFormData] = useState({
    leaveType: "CASUAL",
    startDate: "",
    endDate: "",
    reason: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (formData.endDate < formData.startDate) {
      onNotify({ message: "End date cannot be before start date.", type: "error" });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await api.post("/employee/leaves", {
        userId: employeeId,
        ...formData,
      });
      onNotify({
        message: response.data.message || "Leave applied successfully.",
        type: "success",
      });
      setFormData({ leaveType: "CASUAL", startDate: "", endDate: "", reason: "" });
      onSuccess();
    } catch (error) {
      onNotify({
        message: error.response?.data?.message || "Unable to apply for leave.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="employee-content-section narrow-section">
      <p className="employee-label">Request time off</p>
      <h1>Apply Leave</h1>
      <form className="leave-form" onSubmit={handleSubmit}>
        <label htmlFor="leaveType">Leave Type</label>
        <select id="leaveType" name="leaveType" value={formData.leaveType} onChange={handleChange}>
          <option value="CASUAL">CASUAL</option>
          <option value="SICK">SICK</option>
          <option value="EARNED">EARNED</option>
        </select>

        <div className="date-fields">
          <div>
            <label htmlFor="startDate">Start Date</label>
            <input id="startDate" name="startDate" type="date" value={formData.startDate} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="endDate">End Date</label>
            <input id="endDate" name="endDate" type="date" value={formData.endDate} onChange={handleChange} required />
          </div>
        </div>

        <label htmlFor="reason">Reason</label>
        <textarea id="reason" name="reason" rows="4" value={formData.reason} onChange={handleChange} required />

        <button className="employee-primary-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Apply for Leave"}
        </button>
      </form>
    </section>
  );
}

export default ApplyLeave;
