import axios from "../api/axios";

export async function loginUser(credentials) {
  const response = await axios.post(
    "/auth/login",
    credentials,
  );

  return response.data;
}

export async function registerUser(userDetails) {
  const response = await axios.post(
    "/auth/register",
    userDetails,
  );

  return response.data;
}
