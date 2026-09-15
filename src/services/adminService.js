import axios from "../api/axios";

export async function getPendingUsers() {
	const response = await axios.get("/admin/pending-users");
	return response.data;
}

export async function updateUserStatus(userId, action) {
	const response = await axios.put(
		`/admin/users/${userId}/${action}`,
	);

	return response.data;
}
