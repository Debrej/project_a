<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <v-card min-width="300" min-height="150" max-width="370" hover>
        <v-list>
          <v-list-item two-line>
            <v-list-item-avatar>
              <v-img
                :src="$host + profilePicBaseURL + user.profile_pic_url"
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
            <v-chip
              v-for="team in user.teams"
              outlined
              :key="team.id"
              :color="colorIfSupervisor(user, team)"
              @click.stop="addTeamToSelection(team)"
            >
              {{ team.name }}
            </v-chip>
          </v-chip-group>
        </v-card-actions>
        <v-overlay
          absolute
          :value="overlay"
          v-if="!is_in_team"
          :opacity="opacity"
        >
          <v-btn text icon @click.stop="addUserToTeam">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-overlay>
        <v-fade-transition>
          <v-overlay
            v-if="hover && is_in_team"
            absolute
            :value="hover"
            :opacity="opacity"
          >
            <v-btn text icon @click.stop="removeUserFromTeam">
              <v-icon>mdi-minus</v-icon>
            </v-btn>
          </v-overlay>
        </v-fade-transition>
      </v-card>
    </template>
  </v-hover>
</template>

<script>
import { eventBus } from "../../main";

export default {
  name: "UserTeam",
  props: {
    user: Object,
    overlay: {
      type: Boolean,
      defaultValue: () => false
    },
    is_in_team: {
      type: Boolean,
      defaultValue: () => false
    }
  },
  data: () => ({
    profilePicBaseURL: "files/user/profile_picture/",
    opacity: 0.25,
    hover: false
  }),
  methods: {
    colorIfSupervisor: function(user, team) {
      if (user.id === team.supervisor_id) {
        return "error";
      } else {
        return null;
      }
    },
    routerPush: function(url) {
      this.$router.push(url);
    },
    addUserToTeam: function() {
      eventBus.$emit("add-user-to-team", this.user);
      this.hover = false;
    },
    removeUserFromTeam: function() {
      eventBus.$emit("remove-user-from-team", this.user);
      this.hover = false;
    }
  },
  computed: {
    surname: function() {
      if (!this.user.surname) return "";
      else return " " + '"' + this.user.surname + '"';
    }
  }
};
</script>
