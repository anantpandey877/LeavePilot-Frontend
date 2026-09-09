function BalanceCard({ title, value }) {
  return (
    <article className="balance-card">
      <p>{title}</p>
      <strong>{value ?? 0}</strong>
      <span>Days available</span>
    </article>
  );
}

export default BalanceCard;
