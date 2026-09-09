function ManagerSidebar({ activePage, onPageChange }) {
  return (
    <aside className="manager-sidebar">
      <p className="manager-sidebar-title">Manager Menu</p>
      <button
        className={activePage === "requests" ? "active" : ""}
        onClick={() => onPageChange("requests")}
      >
        Department Requests
      </button>
    </aside>
  );
}

export default ManagerSidebar;
