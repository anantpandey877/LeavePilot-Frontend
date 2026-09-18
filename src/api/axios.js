import axios from "axios";

export default axios.create({
  baseURL: "http://accc505eb12be488583468dea61dfff5-148697153.us-east-1.elb.amazonaws.com/leavepilot/api",
  headers: {
    "Content-Type": "application/json",
  },
});
