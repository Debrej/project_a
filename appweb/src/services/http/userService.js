import { HTTP } from "./httpService";

export default class UserRequest {
  fetch(filters = {}) {
    return HTTP.get("user", { params: filters });
  }
  post(user) {
    return HTTP.post("user", user);
  }
  put(user) {
    return HTTP.put("user", user);
  }

  uploadFile(user, fileName, data) {
    return HTTP.put(`user/${fileName}/${user.id}`, data);
  }
}
