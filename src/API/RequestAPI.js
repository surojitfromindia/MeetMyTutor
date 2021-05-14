import axios from "axios";

export default function RAPI() {
  return axios.create({
    baseURL: "http://localhost:5000/api",
    headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
  });
}
