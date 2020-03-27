<template>
  <v-container fluid>
    <v-col justify="start" align-item="start">
      <v-row>
        <v-col cols="12" md="4">
          <v-row align="center">
            <v-select
              :items="teams"
              v-model="selectedTeams"
              :label="$t('Teams')"
              item-text="name"
              item-value="id"
              multiple
              chips
              :hint="$t('Selected teams')"
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
              :label="$t('Enter name, surname, email or phone number')"
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
          <UserCard :user="user"></UserCard>
        </v-col>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
import UserCard from "../card/User";
import Fuse from "fuse.js";
import { eventBus } from "../../main";
import TeamRequest from "../../services/http/teamService";
import UserRequest from "../../services/http/userService";
import AuthenticationRequest from "../../services/http/authenticationService";

const teamRequest = new TeamRequest();
const userRequest = new UserRequest();
const authenticationRequest = new AuthenticationRequest();

export default {
  name: "User",
  components: { UserCard },
  data: () => ({
    users: [],
    search: "",
    selectedTeams: [],
    teams: []
  }),
  beforeCreate() {
    authenticationRequest.refresh();
  },
  created() {
    teamRequest.fetch().then(res => {
      this.teams = res.data.team;
      for (let i in this.users) {
        this.dialog[this.users[i]] = false;
      }
    });
    userRequest.fetch().then(res => {
      this.users = res.data.users;
    });
  },
  mounted() {
    eventBus.$on("add-team-to-selection", team =>
      this.addTeamToSelection(team)
    );
  },
  methods: {
    resetTeams: function() {
      this.selectedTeams = [];
    },
    addTeamToSelection: function(team) {
      if (!this.selectedTeams.includes(team.id)) {
        this.selectedTeams.push(team.id);
      }
    },
    filteredUsers: function() {
      if (this.selectedTeams.length === 0 && this.search.length === 0) {
        return this.users;
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
        if (this.selectedTeams.length === 0) {
          let search = this.search.toLowerCase();
          return fuse.search(search);
        } else if (this.search.length === 0) {
          let filteredArrayTeams = [];
          for (let i in this.users) {
            let user = this.users[i];
            if (user.teams.some(r => this.selectedTeams.indexOf(r.id) >= 0)) {
              filteredArrayTeams.push(user);
            }
          }
          return filteredArrayTeams;
        } else {
          let search = this.search.toLowerCase();
          let filteredArraySearch = fuse.search(search);
          let filteredArrayTeams = [];
          for (let i in filteredArraySearch) {
            let user = filteredArraySearch[i];
            if (user.teams.some(r => this.selectedTeams.indexOf(r.id) >= 0)) {
              filteredArrayTeams.push(user);
            }
          }
          return filteredArrayTeams;
        }
      }
    }
  }
};
</script>
