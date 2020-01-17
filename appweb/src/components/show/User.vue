<template>
  <v-container class="fill-height" fluid>
    <v-row align-content="start" justify="start">
      <v-card
        v-for="user in users"
        :key="user.id"
        min-width="300"
        min-height="150"
        max-width="370"
        hover
      >
        <v-list>
          <v-list-item two-line>
            <v-list-item-avatar>
              <v-img
                :src="$host + profile_pic_baseURL + user.profile_pic_url"
                alt="profile_picture"
              ></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{ user.first_name + " " + user.last_name }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ user.surname }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-phone</v-icon>
            </v-list-item-icon>
            <v-item-list-content>
              {{ user.phone_number }}
            </v-item-list-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-email</v-icon>
            </v-list-item-icon>
            <v-item-list-content>
              {{ user.email }}
            </v-item-list-content>
          </v-list-item>
        </v-list>
        <v-card-actions>
          <v-chip-group>
            <v-chip v-for="team in user.teams" :key="team.id">
              {{ team.name }}
            </v-chip>
          </v-chip-group>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "User",
  data: () => ({
    users: Object,
    profile_pic_baseURL: "files/user/profile_picture/",
    teams: [
      { name: "Admin", color: "#d00b08" },
      { name: "Orga", color: "#2826cb" },
      { name: "Hard", color: "#40ec21" },
      { name: "Dev", color: "#e232c4" },
      { name: "Secu", color: "#25cba4" },
      { name: "Log", color: "#cb9941" },
      { name: "Bar", color: "#5fc4cb" }
    ]
  }),
  created() {
    this.$axios.get(this.$host + "user").then(res => {
      this.users = res.data.users;
      for (let i in this.users) {
        this.users[i].teams = this.teams;
      }
    });
  }
};
</script>
