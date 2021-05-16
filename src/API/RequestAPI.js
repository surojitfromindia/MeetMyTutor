import axios from "axios";

export default function RAPI() {
  return axios.create({
    baseURL: "https://doneback.herokuapp.com/api",
    headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
  });
}
