import { HTTP } from "./httpService";

export default class TeamRequest {
  fetch(filters = {}) {
    return HTTP.get("team", { params: filters });
  }
  post(team) {
    return HTTP.post("team", team);
  }
  put(team) {
    return HTTP.put("team", team);
  }

  addUserToTeam(user, team) {
    const body = {
      user_id: user.id,
      team_id: team.id
    };
    return HTTP.post("user/team", body);
  }

  removeUserFromTeam(user, team) {
    const body = {
      data: {
        user_id: user.id,
        team_id: team.id
      }
    };
    return HTTP.delete("user/team", body);
  }
}
