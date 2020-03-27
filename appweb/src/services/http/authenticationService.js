import { HTTPAUTH } from "./httpService";
import qs from "qs";
import jwt_decode from "jwt-decode";

export default class AuthenticationRequest {
  auth(login = {}) {
    const body = qs.stringify({
      username: login.username,
      password: login.password,
      grant_type: "password",
      client_id: "project_a_web"
    });
    return HTTPAUTH.post(
      `auth/realms/project_a/protocol/openid-connect/token`,
      body
    );
  }
  refresh() {
    const accessToken = localStorage.accessToken;
    const refreshToken = localStorage.refreshToken;
    const exp = jwt_decode(accessToken).exp;
    const ts = Math.round(new Date().getTime() / 1000);
    if (ts > exp) {
      const body = qs.stringify({
        refresh_token: refreshToken,
        client_id: "project_a_web",
        grant_type: "refresh_token"
      });
      HTTPAUTH.post(
        `auth/realms/project_a/protocol/openid-connect/token`,
        body
      ).then(res => {
        localStorage.accessToken = res.data.access_token;
        localStorage.refreshToken = res.data.refresh_token;
      });
    }
  }
  logout(refresh_token = "") {
    const body = qs.stringify({
      client_id: "project_a_web",
      refresh_token: refresh_token
    });
    return HTTPAUTH.post(
      `auth/realms/project_a/protocol/openid-connect/logout`,
      body
    );
  }
}
