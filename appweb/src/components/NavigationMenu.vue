<template>
  <v-navigation-drawer
    v-model="drawer"
    :color="color"
    :clipped="true"
    app
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

      <v-list-item link :to="dashboard.url">
        <v-list-item-icon>
          <v-icon>{{ dashboard.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ dashboard.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-menu v-for="item in items" :key="item.title">
        <template v-slot:activator="{ on }">
          <v-list-item v-on="on" link>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>

        <v-list nav flat>
          <v-list-item
            v-for="dropdown in item.items"
            :key="dropdown"
            :to="item.url + dropdown.url"
            link
          >
            <v-list-item-title>{{ dropdown.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
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
    dashboard: { title: "Dashboard", icon: "mdi-view-dashboard", url: "/" },
    items: [
      {
        title: "Create",
        icon: "mdi-pencil",
        url: "/create",
        items: [
          { title: "Task", url: "/task" },
          { title: "Activity", url: "/activity" },
          { title: "Location", url: "/location" },
          { title: "User", url: "/user" }
        ]
      },
      {
        title: "Show",
        icon: "mdi-eye",
        url: "/show",
        items: [
          { title: "Task", url: "/task" },
          { title: "Activity", url: "/activity" },
          { title: "Location", url: "/location" },
          { title: "User", url: "/user" },
          { title: "Equipment", url: "/equipment" }
        ]
      },
      {
        title: "Affect",
        icon: "mdi-account-multiple",
        url: "/affect",
        items: [
          { title: "By user", url: "/user" },
          { title: "By task", url: "/task" }
        ]
      }
    ]
  }),
  created() {
    this.$axios.get("https://randomuser.me/api").then(res => {
      this.user = res.data.results[0];
    });
  }
};
</script>
