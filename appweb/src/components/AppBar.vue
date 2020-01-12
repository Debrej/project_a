<template>
  <v-app-bar dense app>
    <v-app-bar-nav-icon @click="changeDrawerStatus"></v-app-bar-nav-icon>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { eventBus } from "../main";

export default {
  name: "AppBar",
  data: () => ({
    drawer: true
  }),
  methods: {
    changeDrawerStatus() {
      this.drawer = !this.drawer;
      eventBus.$emit("drawer-status-change", this.drawer);
    }
  }
};
</script>
