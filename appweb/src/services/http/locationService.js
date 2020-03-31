import { HTTP } from "./httpService";

export default class LocationRequest {
  fetch(filters = {}) {
    return HTTP.get("location", { params: filters });
  }
  post(location) {
    return HTTP.post("location", location);
  }
  put(location) {
    return HTTP.put("location", location);
  }
}
