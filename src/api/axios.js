import axios from "axios";

export default axios.create({
  baseURL: "http://af12002e62d5c46da958ef6000e62bdd-1696852969.us-east-1.elb.amazonaws.com/leavepilot/api",
  headers: {
    "Content-Type": "application/json",
  },
});
