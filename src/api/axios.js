import axios from "axios";

const api = axios.create({
  baseURL: "https://leavepilot-tm.trafficmanager.net/leavepilot/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const savedUser = localStorage.getItem("leavePilotUser");

  if (savedUser) {
    try {
      const user = JSON.parse(savedUser);

      if (user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    } catch {
      localStorage.removeItem("leavePilotUser");
    }
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("leavePilotUser");

      if (window.location.pathname !== "/login") {
        window.location.assign("/login");
      }
    }

    return Promise.reject(error);
  },
);

export default api;
