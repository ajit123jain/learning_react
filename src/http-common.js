import axios from "axios";

export default axios.create({
  baseURL: "http://demo.localhost:3000/api/v1/",
  headers: {
    "Content-type": "application/json"
  },
  withCredentials: true,
  crossDomain: true, 
});