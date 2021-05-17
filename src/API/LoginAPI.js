import axios from "axios";

export default axios.create({
  baseURL: "http://192.168.0.5:5000/api/login",
});
