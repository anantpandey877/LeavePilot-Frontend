import { useState } from "react";
import { registerUser } from "../services/authService";

function RegisterPage() {
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [role, setRole] = useState("employee");
	const [department, setDepartment] = useState("");
	const [message, setMessage] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	async function handleSubmit(event) {
		event.preventDefault();
		setMessage("");

		if (password !== confirmPassword) {
			setMessage("Passwords do not match.");
			return;
		}

		setIsSubmitting(true);

		try {
			const response = await registerUser({
				fullName,
				email,
				password,
				role,
				department,
			});

			setMessage(response.message || "Registration submitted successfully.");
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
				<h1>Register</h1>
				<p className="auth-intro">Create your LeavePilot account.</p>

				<form className="auth-form" onSubmit={handleSubmit}>
					<label htmlFor="fullName">Full name</label>
					<input
						id="fullName"
						type="text"
						value={fullName}
						onChange={(event) => setFullName(event.target.value)}
						required
					/>

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

					<label htmlFor="confirmPassword">Confirm password</label>
					<input
						id="confirmPassword"
						type="password"
						value={confirmPassword}
						onChange={(event) => setConfirmPassword(event.target.value)}
						required
					/>

					<label htmlFor="role">Role</label>
					<select
						id="role"
						value={role}
						onChange={(event) => setRole(event.target.value)}
					>
						<option value="EMPLOYEE">Employee</option>
						<option value="MANAGER">Manager</option>
					</select>

					<label htmlFor="department">Department</label>
					<select
						id="department"
						value={department}
						onChange={(event) => setDepartment(event.target.value)}
						required
					>
						<option value="">Select department</option>
						<option value="IT">IT</option>
						<option value="HR">HR</option>
						<option value="FINANCE">FINANCE</option>
						<option value="MARKETING">MARKETING</option>
						<option value="OPERATIONS">OPERATIONS</option>
						<option value="SALES">SALES</option>
					</select>

					<button className="auth-submit" type="submit" disabled={isSubmitting}>
						{isSubmitting ? "Registering..." : "Register"}
					</button>
				</form>

				{message && <p className="auth-message">{message}</p>}

				<p className="auth-switch">
					Already have an account? <a href="/login">Login</a>
				</p>

				<a className="auth-home" href="/">Home</a>
			</section>
		</main>
	);
}

export default RegisterPage;
