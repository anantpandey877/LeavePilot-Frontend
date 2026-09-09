import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/Auth.css";

function Login() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({ email: "", password: "" });
	const [errorMessage, setErrorMessage] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	function handleChange(event) {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	}

	async function handleSubmit(event) {
		event.preventDefault();
		setErrorMessage("");
		setIsSubmitting(true);

		try {
			const response = await api.post("/auth/login", formData);
			const user = response.data;

			if (user.success === false) {
				setErrorMessage(user.message || "Unable to log in.");
				return;
			}

			localStorage.setItem("user", JSON.stringify(user));

			const routesByRole = {
				ADMIN: "/admin",
				MANAGER: "/manager",
				EMPLOYEE: "/employee",
			};

			navigate(routesByRole[user.role] || "/");
		} catch (error) {
			setErrorMessage(
				error.response?.data?.message ||
					"Unable to log in. Please check your details and try again."
			);
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<main className="auth-page">
			<form className="auth-card" onSubmit={handleSubmit}>
				<h1>Login to LeavePilot</h1>
				<p className="auth-intro">Access your leave management account.</p>

				{errorMessage && <p className="message error-message">{errorMessage}</p>}

				<label htmlFor="email">Email</label>
				<input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />

				<label htmlFor="password">Password</label>
				<input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required />

				<button className="form-button" type="submit" disabled={isSubmitting}>
					{isSubmitting ? "Logging in..." : "Login"}
				</button>

				<p className="auth-link">Do not have an account? <Link to="/register">Register here</Link></p>
				<Link className="back-link" to="/">Back to home</Link>
			</form>
		</main>
	);
}

export default Login;
