import { HTTP } from "./httpService";

export default class SpecialityRequest {
  fetch(filters = {}) {
    return HTTP.get("speciality", filters);
  }
  get(speciality) {
    return HTTP.get(`speciality/${speciality.id}`);
  }
  post(speciality) {
    return HTTP.post("speciality", speciality);
  }
  put(speciality) {
    return HTTP.put(`speciality/${speciality.id}`, speciality);
  }
}