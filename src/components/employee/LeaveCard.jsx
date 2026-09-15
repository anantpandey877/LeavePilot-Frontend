function LeaveCard({ title, days }) {
	return (
		<article className="leave-card">
			<h2>{title}</h2>
			<p>{days} days available</p>
		</article>
	);
}

export default LeaveCard;
