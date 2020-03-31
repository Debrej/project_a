import { HTTP } from "./httpService";

export default class SpecialityRequest {
  fetch(filters = {}) {
    return HTTP.get("specialty", { params: filters });
  }
  post(speciality) {
    return HTTP.post("specialty", speciality);
  }
  put(speciality) {
    return HTTP.put(`specialty`, speciality);
  }
}
