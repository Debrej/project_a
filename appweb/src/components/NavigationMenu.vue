<template>
  <v-navigation-drawer
    v-model="drawer"
    :color="color"
    :clipped="true"
    app
    expand-on-hover
    absolute
    dark
  >
    <v-list nav flat>
      <v-list-item>
        <v-col class="align-center" absolute>
          <v-img src="@/assets/logo.png" alt="24h logo"></v-img>
        </v-col>
      </v-list-item>

      <v-list-item two-line>
        <v-list-item-avatar>
          <img :src="user.picture.large" alt="user profile pic" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{
            user.name.first + " " + user.name.last.toUpperCase()
          }}</v-list-item-title>
          <v-list-item-subtitle>{{ user.cell }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item v-for="item in items" :key="item.title" link :to="item.url">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "NavigationMenu",
  data: () => ({
    user: null,
    drawer: true,
    color: "primary",
    colors: ["primary", "blue", "success", "red", "teal"],
    items: [
      { title: "Dashboard", icon: "mdi-view-dashboard", url: "/" },
      { title: "Create", icon: "mdi-pencil", url: "/create" },
      { title: "Show", icon: "mdi-eye", url: "/show" },
      { title: "Affect", icon: "mdi-account-multiple", url: "/affect" }
    ]
  }),
  created() {
    this.$axios.get("https://randomuser.me/api").then(res => {
      this.user = res.data.results[0];
    });
  }
};
</script>
