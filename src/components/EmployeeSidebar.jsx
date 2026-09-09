function EmployeeSidebar({ activePage, onPageChange }) {
  return (
    <aside className="employee-sidebar">
      <p className="sidebar-title">Employee Menu</p>
      <button className={activePage === "home" ? "active" : ""} onClick={() => onPageChange("home")}>
        Dashboard Home
      </button>
      <button className={activePage === "apply" ? "active" : ""} onClick={() => onPageChange("apply")}>
        Apply Leave
      </button>
      <button className={activePage === "leaves" ? "active" : ""} onClick={() => onPageChange("leaves")}>
        My Leaves
      </button>
    </aside>
  );
}

export default EmployeeSidebar;
