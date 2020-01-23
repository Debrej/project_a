<template>
  <v-navigation-drawer
    v-model="drawer"
    color="primary"
    app
    fixed
    dark
    @transitionend="changeDrawerStatus"
  >
    <v-list flat nav>
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

      <v-expansion-panels accordion v-model="panel">
        <v-expansion-panel v-for="(item, i) in items" :key="i">
          <v-expansion-panel-header
            color="primary"
            :expand-icon="item.icon"
            disable-icon-rotate
          >
            {{ item.title }}
          </v-expansion-panel-header>
          <v-expansion-panel-content color="primary">
            <v-list nav flat>
              <v-list-item
                v-for="(dropdown, i) in item.items"
                :key="i"
                :to="item.url + dropdown.url"
                v-on:click="onPanelClick"
                link
              >
                <v-list-item-title>{{ dropdown.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { eventBus } from "../main";

export default {
  name: "NavigationMenu",
  data: () => ({
    user: null,
    selected: null,
    panel: [],
    drawer: false,
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
          { title: "User", url: "/user" },
          { title: "Team", url: "/team" }
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
          { title: "Equipment", url: "/equipment" },
          { title: "Team", url: "/team" }
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
    eventBus.$on("drawer-status-change-appbar", drawer => {
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
    onPanelClick: function() {
      this.panel = [];
    },
    changeDrawerStatus: function() {
      eventBus.$emit("drawer-status-change-drawer", this.drawer);
    }
  }
};
</script>
