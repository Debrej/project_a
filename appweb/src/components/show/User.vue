<template>
  <v-container fluid>
    <v-col justify="start" align-item="start">
      <v-row>
        <v-col cols="12" md="4">
          <v-row align-content="center" justify="center">
            <v-select
              :items="teams"
              v-model="selectedTeams"
              label="Teams"
              item-text="name"
              item-value="id"
              multiple
              chips
              hint="Selected teams"
              persistent-hint
            ></v-select>
            <v-btn text icon @click="resetTeams">
              <v-icon>mdi-close-circle</v-icon>
            </v-btn>
          </v-row>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="12" md="4">
          <v-row>
            <v-text-field
              v-model="search"
              label="Search name, surname or email..."
              single-line
              hide-details
            ></v-text-field>
            <v-btn icon>
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
      <v-row align-items="start">
        <v-col
          cols="12"
          xl="3"
          lg="3"
          md="4"
          sm="6"
          justify="center"
          align-items="center"
          v-for="user in filteredUsers()"
          :key="user.id"
        >
          <v-card min-width="300" min-height="150" max-width="370" hover>
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
        </v-col>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
export default {
  name: "User",
  data: () => ({
    users: [],
    profile_pic_baseURL: "files/user/profile_picture/",
    selectedTeams: [],
    teams: []
  }),
  created() {
    this.$axios.get(this.$host + "team").then(res => {
      this.teams = res.data.team;
    });
    this.$axios.get(this.$host + "user").then(res => {
      this.users = res.data.users;
    });
  },
  methods: {
    resetTeams: function() {
      this.selectedTeams = [];
    },
    filteredUsers: function() {
      if (this.selectedTeams.length === 0) {
        return this.users;
      } else {
        let filteredArray = [];
        for (let i in this.users) {
          let user = this.users[i];
          if (user.teams.some(r => this.selectedTeams.indexOf(r.id) >= 0)) {
            filteredArray.push(user);
          }
        }
        return filteredArray;
      }
    }
  }
};
</script>