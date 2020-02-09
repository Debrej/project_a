import { HTTP } from "./httpService";

export default class EquipmentRequest {
  fetch(filters = {}) {
    return HTTP.get("equipment", filters);
  }
  get(equipment) {
    return HTTP.get(`equipment/${equipment.id}`);
  }
  post(equipment) {
    return HTTP.post("equipment", equipment);
  }
  put(equipment) {
    return HTTP.put(`equipment/${equipment.id}`, equipment);
  }
}
