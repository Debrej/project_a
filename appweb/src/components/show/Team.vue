<template>
  <v-container fluid>
    <v-col justify="start" align-item="start">
      <v-row>
        <v-col cols="12" md="4">
          <v-row align="center">
            <v-select
              :items="teams"
              v-model="selectedTeams"
              label="Teams"
              item-text="name"
              return-object
              hint="Selected team"
              persistent-hint
            ></v-select>
            <v-btn text icon @click="resetTeams">
              <v-icon>mdi-close-circle</v-icon>
            </v-btn>
          </v-row>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="12" md="4">
          <v-row align="center">
            <v-text-field
              v-model="search"
              label="Enter name, surname, email or phone number"
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
          <UserCard :user="user" :overlay="true" is_in_team></UserCard>
        </v-col>
        <v-col
          cols="12"
          xl="3"
          lg="3"
          md="4"
          sm="6"
          justify="center"
          align-items="center"
          v-for="user in filteredUsersInvert()"
          :key="user.id"
        >
          <UserCard :user="user" :overlay="true"></UserCard>
        </v-col>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
import UserCard from "../card/UserTeam";
import Fuse from "fuse.js";
import { eventBus } from "../../main";

export default {
  name: "Team",
  components: { UserCard },
  data: () => ({
    users: [],
    search: "",
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
  mounted() {
    eventBus.$on("add-user-to-team", user => {
      if (this.selectedTeams !== []) {
        this.$axios
          .post(
            this.$host + "user/" + user.id + "/team/" + this.selectedTeams.id
          )
          .then(res => {
            if (res.data.user_teams) {
              this.users[this.users.indexOf(user)].teams.push(
                this.selectedTeams
              );
            }
          });
      }
    });
    eventBus.$on("remove-user-from-team", user => {
      if (this.selectedTeams !== []) {
        this.$axios
          .delete(
            this.$host + "user/" + user.id + "/team/" + this.selectedTeams.id
          )
          .then(res => {
            if (res.data.result) {
              this.users[this.users.indexOf(user)].teams = this.users[
                this.users.indexOf(user)
              ].teams.filter(t => t.id !== this.selectedTeams.id);
            }
          });
      }
    });
  },
  methods: {
    resetTeams: function() {
      this.selectedTeams = [];
    },
    filteredUsers: function() {
      if (this.selectedTeams === []) {
        return [];
      } else {
        let filteredArrayTeams = [];
        for (let i in this.users) {
          let user = this.users[i];
          if (
            user.teams.some(r => {
              return this.selectedTeams.id === r.id;
            })
          ) {
            filteredArrayTeams.push(user);
          }
        }
        return filteredArrayTeams;
      }
    },
    filteredUsersInvert: function() {
      if (this.search.length === 0) {
        let filteredArrayTeams = [];
        for (let i in this.users) {
          let user = this.users[i];
          if (
            user.teams.some(r => {
              return this.selectedTeams.id === r.id;
            })
          ) {
            filteredArrayTeams.push(user);
          }
        }
        return this.users.filter(function(el) {
          return !filteredArrayTeams.includes(el);
        });
      } else {
        const options = {
          shouldSort: true,
          threshold: 0.45,
          location: 0,
          distance: 100,
          maxPatternLength: 32,
          minMatchCharLength: 1,
          keys: ["first_name", "last_name", "surname", "email", "phone_number"]
        };
        const fuse = new Fuse(this.users, options);
        let search = this.search.toLowerCase();
        let filteredArraySearch = fuse.search(search);
        let filteredArrayTeams = [];
        for (let i in this.users) {
          let user = this.users[i];
          if (
            user.teams.some(r => {
              return this.selectedTeams.id === r.id;
            })
          ) {
            filteredArrayTeams.push(user);
          }
        }
        return filteredArraySearch.filter(function(el) {
          return !filteredArrayTeams.includes(el);
        });
      }
    }
  }
};
</script>
