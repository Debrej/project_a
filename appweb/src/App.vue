<template>
  <v-app>
    <AppBar></AppBar>
    <NavigationMenu></NavigationMenu>
    <v-content>
      <router-view></router-view>
    </v-content>
    <Footer></Footer>
  </v-app>
</template>

<script>
import NavigationMenu from "./components/NavigationMenu";
import Footer from "./components/Footer";
import AppBar from "./components/AppBar";
export default {
  name: "App",
  components: { AppBar, Footer, NavigationMenu }
};
</script>
