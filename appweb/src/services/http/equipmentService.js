import { HTTP } from "./httpService";

export default class EquipmentRequest {
  fetch(filters = {}) {
    return HTTP.get("equipment", { params: filters });
  }
  post(equipment) {
    return HTTP.post("equipment", equipment);
  }
  put(equipment) {
    return HTTP.put("equipment", equipment);
  }
}
