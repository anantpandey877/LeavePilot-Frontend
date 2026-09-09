import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/Auth.css";

function Register() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		password: "",
		role: "EMPLOYEE",
		department: "IT",
	});
	const [message, setMessage] = useState({ text: "", type: "" });
	const [isSubmitting, setIsSubmitting] = useState(false);

	function handleChange(event) {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	}

	async function handleSubmit(event) {
		event.preventDefault();
		setMessage({ text: "", type: "" });
		setIsSubmitting(true);

		try {
			const response = await api.post("/auth/register", formData);
			setMessage({ text: response.data.message, type: "success-message" });
			setTimeout(() => navigate("/login"), 1800);
		} catch (error) {
			setMessage({
				text: error.response?.data?.message || "Unable to register. Please try again.",
				type: "error-message",
			});
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<main className="auth-page">
			<form className="auth-card register-card" onSubmit={handleSubmit}>
				<h1>Create your account</h1>
				<p className="auth-intro">Join LeavePilot to manage your time off.</p>

				{message.text && <p className={`message ${message.type}`}>{message.text}</p>}

				<label htmlFor="fullName">Full Name</label>
				<input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />

				<label htmlFor="email">Email</label>
				<input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />

				<label htmlFor="password">Password</label>
				<input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required />

				<label htmlFor="role">Role</label>
				<select id="role" name="role" value={formData.role} onChange={handleChange}>
					<option value="EMPLOYEE">Employee</option>
					<option value="MANAGER">Manager</option>
				</select>

				<label htmlFor="department">Department</label>
				<select id="department" name="department" value={formData.department} onChange={handleChange}>
					<option value="IT">IT</option>
					<option value="HR">HR</option>
					<option value="FINANCE">Finance</option>
					<option value="MARKETING">Marketing</option>
					<option value="OPERATIONS">Operations</option>
					<option value="SALES">Sales</option>
				</select>

				<button className="form-button" type="submit" disabled={isSubmitting}>
					{isSubmitting ? "Registering..." : "Register"}
				</button>

				<p className="auth-link">Already have an account? <Link to="/login">Login here</Link></p>
				<Link className="back-link" to="/">Back to home</Link>
			</form>
		</main>
	);
}

export default Register;
