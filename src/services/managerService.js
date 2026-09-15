import axios from "../api/axios";

export async function getDepartmentLeaves(department) {
	const response = await axios.get(
		`/manager/leaves?department=${encodeURIComponent(department)}`,
	);
	return response.data;
}

export async function updateLeaveStatus(leaveId, action, managerId) {
	const response = await axios.put(
		`/manager/leaves/${leaveId}/${action}?managerId=${managerId}`,
	);
	return response.data;
}
