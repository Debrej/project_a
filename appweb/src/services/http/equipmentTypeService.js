import { HTTP } from "./httpService";

export default class EquipmentTypeRequest {
  fetch(filters = {}) {
    return HTTP.get("equipment_type", filters);
  }
  get(equipment_type) {
    return HTTP.get(`equipment_type/${equipment_type.id}`);
  }
  post(equipment_type) {
    return HTTP.post("equipment_type", equipment_type);
  }
  put(equipment_type) {
    return HTTP.put(`equipment_type/${equipment_type.id}`, equipment_type);
  }
}
