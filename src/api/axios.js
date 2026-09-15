import axios from "axios";

export default axios.create({
  baseURL: "http://54.209.148.200:8080/leavepilot/api",
  headers: {
    "Content-Type": "application/json",
  },
});
