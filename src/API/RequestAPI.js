import axios from "axios";

export default function RAPI() {
  return axios.create({
    baseURL: "http://192.168.0.5:5000/api",
    headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
  });
}
