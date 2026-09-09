import { useEffect, useState } from "react";
import api from "../../api/axios";
import BalanceCard from "../../components/BalanceCard";

function DashboardHome({ employeeId, refreshKey, onNotify }) {
  const [balance, setBalance] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadBalance() {
      setIsLoading(true);

      try {
        const response = await api.get(`/employee/balance?userId=${employeeId}`);
        setBalance(response.data);
      } catch (error) {
        onNotify({
          message: error.response?.data?.message || "Unable to load leave balance.",
          type: "error",
        });
      } finally {
        setIsLoading(false);
      }
    }

    loadBalance();
  }, [employeeId, refreshKey, onNotify]);

  return (
    <section className="employee-content-section">
      <p className="employee-label">Overview</p>
      <h1>Dashboard Home</h1>
      <p className="section-description">Here is your current leave balance.</p>

      {isLoading ? (
        <p className="employee-status-message">Loading leave balance...</p>
      ) : (
        <div className="balance-card-list">
          <BalanceCard title="Casual Leave Balance" value={balance?.casualLeave} />
          <BalanceCard title="Sick Leave Balance" value={balance?.sickLeave} />
          <BalanceCard title="Earned Leave Balance" value={balance?.earnedLeave} />
        </div>
      )}
    </section>
  );
}

export default DashboardHome;
