import { HTTP } from "./httpService";

export default class SpecialityRequest {
  fetch(filters = {}) {
    return HTTP.get("specialty", { params: filters });
  }
  get(speciality) {
    return HTTP.get(`specialty/${speciality.id}`);
  }
  post(speciality) {
    return HTTP.post("specialty", speciality);
  }
  put(speciality) {
    return HTTP.put(`specialty/${speciality.id}`, speciality);
  }
}
