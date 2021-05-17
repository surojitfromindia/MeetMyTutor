import axios from "axios";

export default axios.create({
  baseURL: "https://doneback.herokuapp.com/api/login",
});
