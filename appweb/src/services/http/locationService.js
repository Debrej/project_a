import { HTTP } from "./httpService";

export default class LocationRequest {
  fetch(filters = {}) {
    return HTTP.get("location", { params: filters });
  }
  get(location) {
    return HTTP.get(`location/${location.id}`);
  }
  post(location) {
    return HTTP.post("location", location);
  }
  put(location) {
    return HTTP.put(`location/${location.id}`, location);
  }
}
