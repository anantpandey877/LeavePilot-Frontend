import { useState } from "react";
import { loginUser } from "../services/authService";

function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	async function handleSubmit(event) {
		event.preventDefault();
		setMessage("");
		setIsSubmitting(true);

		try {
			const user = await loginUser({ email, password });
			localStorage.setItem("leavePilotUser", JSON.stringify(user));
			setMessage(`Welcome, ${user.fullName}. Login successful.`);
		} catch (error) {
			const errorMessage = error.response?.data?.message;
			setMessage(errorMessage || "Unable to connect to the server.");
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<main className="auth-page">
			<section className="auth-card">
				<h1>Login</h1>
				<p className="auth-intro">Sign in to manage your leave requests.</p>

				<form className="auth-form" onSubmit={handleSubmit}>
					<label htmlFor="email">Email</label>
					<input
						id="email"
						type="email"
						value={email}
						onChange={(event) => setEmail(event.target.value)}
						required
					/>

					<label htmlFor="password">Password</label>
					<input
						id="password"
						type="password"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
						required
					/>

					<button className="auth-submit" type="submit" disabled={isSubmitting}>
						{isSubmitting ? "Logging in..." : "Login"}
					</button>
				</form>

				{message && <p className="auth-message">{message}</p>}

				<p className="auth-switch">
					Do not have an account? <a href="/register">Register</a>
				</p>

				<a className="auth-home" href="/">Home</a>
			</section>
		</main>
	);
}

export default LoginPage;
