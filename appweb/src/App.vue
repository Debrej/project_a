<template>
  <v-app>
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
export default {
  name: "App",
  components: { Footer, NavigationMenu }
};
</script>
