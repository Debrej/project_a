<template>
  <v-app-bar dense app>
    <v-app-bar-nav-icon @click="changeDrawerStatus"></v-app-bar-nav-icon>
    <v-spacer v-if="!searchInput"></v-spacer>
    <v-text-field
      v-model="searchContent"
      v-if="searchInput"
      :autofocus="searchInput"
      :label="$t('Search') + '...'"
      single-line
      hide-details
    ></v-text-field>
    <v-btn icon @click="searchInput = !searchInput">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <v-btn text @click="logout">
      {{ $t("Logout") }}
    </v-btn>
  </v-app-bar>
</template>

<script>
import { eventBus } from "../main";

import AuthenticationRequest from "../services/http/authenticationService";
const authenticationRequest = new AuthenticationRequest();

export default {
  name: "AppBar",
  data: () => ({
    drawer: false,
    searchInput: false,
    searchContent: null
  }),
  created() {
    eventBus.$on("drawer-status-change-drawer", drawer => {
      this.drawer = drawer;
    });
  },
  mounted() {
    switch (this.$vuetify.breakpoint.name) {
      case "xs":
      case "sm":
      case "md":
        this.drawer = false;
        break;
      case "lg":
      case "xl":
        this.drawer = true;
        break;
    }
  },
  methods: {
    changeDrawerStatus() {
      this.drawer = !this.drawer;
      eventBus.$emit("drawer-status-change-appbar", this.drawer);
    },
    logout: function() {
      authenticationRequest.logout(localStorage.refreshToken).then(() => {
        localStorage.clear();
        this.$router.push("/login");
      });
    }
  }
};
</script>
