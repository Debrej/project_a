import { HTTP } from "./httpService";

export default class UserRequest {
  fetch(filters = {}) {
    return HTTP.get("user", filters);
  }
  get(user) {
    return HTTP.get(`user/${user.id}`);
  }
  post(user) {
    return HTTP.post("user", user);
  }
  put(user) {
    return HTTP.put(`user/${user.id}`, user);
  }

  uploadFile(user, fileName, data) {
    return HTTP.put(`user/${fileName}/${user.id}`, data);
  }
}
