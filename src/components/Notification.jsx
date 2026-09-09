function Notification({ message, type, className = "admin-notification" }) {
  if (!message) {
    return null;
  }

  return <p className={`${className} ${type}`}>{message}</p>;
}

export default Notification;
