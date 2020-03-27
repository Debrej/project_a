<template>
  <div>
    <AppBar></AppBar>
    <NavigationMenu></NavigationMenu>
    <v-content>
      <router-view></router-view>
    </v-content>
    <Footer></Footer>
  </div>
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
