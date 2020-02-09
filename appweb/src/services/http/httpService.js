import axios from "axios";

export const HTTP = axios.create({
  // For json-server interaction
  // baseURL: `http://localhost:3000/`
  // For back-end interaction
  baseURL: `http://localhost:2424/`
});
