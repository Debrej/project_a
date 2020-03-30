<template>
  <v-content class="fill-height" fluid>
    <AppBar></AppBar>
    <NavigationMenu></NavigationMenu>
    <v-container fluid class="fill-height">
      <router-view></router-view>
    </v-container>
    <Footer></Footer>
  </v-content>
</template>

<script>
import NavigationMenu from "../components/NavigationMenu";
import Footer from "../components/Footer";
import AppBar from "../components/AppBar";
export default {
  name: "Interface",
  components: { AppBar, Footer, NavigationMenu },
  beforeCreate() {
    if (!localStorage.accessToken) {
      this.$router.push("/login");
    }
  }
};
</script>
