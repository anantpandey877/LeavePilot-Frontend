import axios from "../api/axios";

export async function getLeaveBalance(userId) {
	const response = await axios.get(`/employee/balance?userId=${userId}`);
	return response.data;
}

export async function applyForLeave(leaveDetails) {
	const response = await axios.post("/employee/leaves", leaveDetails);
	return response.data;
}

export async function getMyLeaves(userId) {
	const response = await axios.get(`/employee/leaves?userId=${userId}`);
	return response.data;
}
