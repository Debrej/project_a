import axios from "axios";
import qs from "qs";
import jwt_decode from "jwt-decode";

import config from "../../config";

export const HTTPAUTH = axios.create({
  baseURL: config.hostAuth
});

let refreshToken = function() {
  const refreshToken = localStorage.refreshToken;
  const body = qs.stringify({
    refresh_token: refreshToken,
    client_id: "project_a_web",
    grant_type: "refresh_token"
  });
  return HTTPAUTH.post(
    `/auth/realms/project_a/protocol/openid-connect/token`,
    body
  );
};

let HTTP_tmp = axios.create({
  // For json-server interaction
  // baseURL: `http://localhost:3000/`
  // For back-end interaction
  baseURL: config.host
});

HTTP_tmp.interceptors.request.use(
  config => {
    if (!config.headers.Authorization) {
      const token = localStorage.accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

HTTP_tmp.interceptors.response.use(null, error => {
  let ogRequest = error.config;
  if (error.response.status === 403 && !ogRequest._retry) {
    ogRequest._retry = true;
    const exp = jwt_decode(localStorage.accessToken).exp;
    const ts = Math.round(new Date().getTime() / 1000);
    if (ts > exp) {
      return refreshToken()
        .then(res => {
          const accessToken = res.data.access_token;
          const refreshToken = res.data.refresh_token;
          localStorage.accessToken = accessToken;
          localStorage.refreshToken = refreshToken;
          ogRequest.headers.Authorization = `Bearer ${accessToken}`;
          return HTTP_tmp(ogRequest);
        })
        .catch(() => {
          localStorage.clear();
          window.location = "/login";
        });
    }
  }
  return Promise.reject(error);
});

export const HTTP = HTTP_tmp;
