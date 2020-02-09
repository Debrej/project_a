import { HTTP } from "./httpService";

export default class TeamRequest {
  fetch(filters = {}) {
    return HTTP.get("team", filters);
  }
  get(team) {
    return HTTP.get(`team/${team.id}`);
  }
  post(team) {
    return HTTP.post("team", team);
  }
  put(team) {
    return HTTP.put(`team/${team.id}`, team);
  }

  // FIXME: I should be a post without data to send
  addUserToTeam(user, team) {
    return HTTP.post(`user/${user.id}/team/${team.id}`);
  }
  // FIXME: I should be in user service
  removeUserFromTeam(user, team) {
    return HTTP.delete(`user/${user.id}/team/${team.id}`);
  }
}
