<template>
  <v-container class="fill-height" fluid @keydown.enter="validate">
    <v-col align="center" justify="center">
      <v-img
        src="@/assets/logo.png"
        lazy-src="@/assets/lazy/logo.png"
        max-height="350px"
        contain
      >
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
      <v-form ref="login" v-model="valid">
        <v-col cols="12" md="6">
          <v-col cols="12" md="10">
            <v-text-field
              v-model="login.username"
              :label="$t('Username')"
              required
              autofocus
            >
            </v-text-field>
            <v-text-field
              v-model="login.password"
              :label="$t('Password')"
              type="password"
              required
            >
            </v-text-field>
          </v-col>
          <v-row justify="center" class="red--text font-italic">{{
            $t(error)
          }}</v-row>
          <v-row justify="space-between">
            <v-col cols="12" md="4" align="center">
              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="validate"
              >
                {{ $t("Sign in") }}
              </v-btn>
            </v-col>
            <v-col cols="12" md="4" align="center">
              <v-btn color="error" class="mr-4" @click="reset">
                {{ $t("Reset") }}
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-form>
    </v-col>
  </v-container>
</template>

<script>
import jwt_decode from "jwt-decode";

import AuthenticationRequest from "../services/http/authenticationService";
const authenticationRequest = new AuthenticationRequest();

export default {
  name: "LoginForm",
  data: () => ({
    login: {
      username: "",
      password: ""
    },
    error: "",
    valid: false
  }),
  methods: {
    validate: function() {
      authenticationRequest
        .auth(this.login)
        .then(res => {
          localStorage.accessToken = res.data.access_token;
          localStorage.refreshToken = res.data.refresh_token;
          localStorage.userId = jwt_decode(res.data.access_token).sub;
          this.$router.push("/");
        })
        .catch(err => {
          if (
            err.response.status === 401 &&
            err.response.data.error_description === "Invalid user credentials"
          ) {
            console.log("password error");
            this.error = "Wrong password or username";
          }
        });
    },
    reset: function() {
      this.$refs.login.reset();
    }
  }
};
</script>
