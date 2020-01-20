<template>
  <v-dialog v-model="dialog" width="800" min-height="500">
    <template v-slot:activator="{ on }">
      <v-card
        min-width="300"
        min-height="150"
        max-width="370"
        hover
        @click.stop="dialog = true"
      >
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
      </v-card>
    </template>

    <v-card>
      <v-card-title class="headline lighten-2" primary-title>
        {{ user.first_name + surname + " " + user.last_name.toUpperCase() }}
      </v-card-title>

      <v-divider></v-divider>

      <v-container fluid>
        <v-row align="center" justify="start">
          <v-col cols="12" md="5" align="start">
            <!-- phone and email -->
            <v-list>
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
          </v-col>
          <v-col cols="12" md="5">
            <!-- birthday and shirt size -->
            <v-list>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-calendar</v-icon>
                </v-list-item-icon>
                <v-item-list-content>
                  {{ dateToLocaleFR(user.birthday) }}
                </v-item-list-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-tshirt-crew</v-icon>
                </v-list-item-icon>
                <v-item-list-content>
                  {{ user.tshirt_size }}
                </v-item-list-content>
              </v-list-item>
            </v-list>
          </v-col>
          <v-col cols="12" md="2">
            <!-- profile picture -->
            <v-avatar>
              <img
                :src="$host + profilePicBaseURL + user.profile_pic_url"
                alt="Profile picture"
              />
            </v-avatar>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row align="center" justify="center">
          <v-col cols="12" md="5">
            <v-row align="center" justify="center" v-if="user.licence_date">
              <v-col cols="12" md="12">
                <!-- licence -->
                <v-list>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon>
                        mdi-account-card-details
                      </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      {{ dateToLocaleFR(user.licence_date) }} -
                      {{ dateFromNow(user.licence_date) }}
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon>
                        mdi-file
                      </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <a
                        :href="
                          $host + licenceScanBaseURL + user.licence_scan_url
                        "
                      >
                        Licence scan
                      </a>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
            <v-divider v-if="user.licence_date"></v-divider>
            <v-row align="center" justify="center">
              <v-col cols="12" md="12">
                <!-- teams -->
                <v-list>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon>mdi-account-group</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-chip v-if="user.teams.length === 0">No teams</v-chip>
                      <v-chip-group v-if="user.teams.length > 0">
                        <v-chip
                          v-for="team in user.teams"
                          outlined
                          :key="team.id"
                          :color="colorIfSupervisor(user, team)"
                        >
                          {{ team.name }}
                        </v-chip>
                      </v-chip-group>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row align="center" justify="center">
              <v-col>
                <!-- comments -->
                <v-select
                  :items="selectComments"
                  v-model="selectedComment"
                  label="Comment"
                >
                </v-select>
                <div v-if="selectedComment === 'Comment'">
                  {{ user.comment }}
                </div>
                <div v-if="selectedComment === 'Experience'">
                  {{ user.experience }}
                </div>
                <div v-if="selectedComment === 'Incapacity'">
                  {{ user.incapacity }}
                </div>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="7">
            <!-- calendar component -->
            <Calendar :user="user"></Calendar>
          </v-col>
        </v-row>
      </v-container>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn
          color="primary"
          text
          @click="routerPush('/edit/user/' + user.id)"
        >
          Edit
        </v-btn>
        <v-btn
          color="primary"
          text
          @click="routerPush('/affect/by_user/' + user.id)"
        >
          Affect
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="dialog = false">
          Done
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from "moment";
import Calendar from "./Calendar";

import { eventBus } from "../../main";

export default {
  name: "User",
  components: { Calendar },
  props: ["user"],
  data: () => ({
    dialog: false,
    profilePicBaseURL: "files/user/profile_picture/",
    licenceScanBaseURL: "files/user/licence/",
    selectComments: ["Comment", "Experience", "Incapacity"],
    selectedComment: "Comment"
  }),
  methods: {
    colorIfSupervisor: function(user, team) {
      if (user.id === team.supervisor_id) {
        return "error";
      } else {
        return null;
      }
    },
    dateToLocaleFR: function(date) {
      return moment(date)
        .locale(this.$momentLocale)
        .format("LL");
    },
    dateFromNow: function(date) {
      return moment(date)
        .locale(this.$momentLocale)
        .fromNow();
    },
    routerPush: function(url) {
      this.$router.push(this.$host + url);
    },
    addTeamToSelection: function(team) {
      eventBus.$emit("add-team-to-selection", team);
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

<style scoped></style>
