<template>
  <v-container class="fill-height" fluid>
    <v-col align="center" justify="center">
      <h1>{{ $t("Create a team") }}</h1>
      <v-divider></v-divider>
      <v-form ref="team" v-model="valid">
        <v-row justify="center">
          <v-col cols="12" md="5">
            <v-text-field
              v-model="team.name"
              :label="$t('Team name')"
              :counter="255"
              :rules="nameRules"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="5">
            <v-select
              :items="users"
              v-model="team.supervisor_id"
              :item-text="name"
              item-value="id"
              :label="$t('Supervisor')"
            ></v-select>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row justify="center">
          <v-col cols="12" md="5">
            <v-select
              :items="confidence_levels"
              v-model="team.confidence_level"
              :label="$t('Confidence level')"
            ></v-select>
          </v-col>
          <v-col cols="12" md="5">
            <v-select
              :items="priorities"
              v-model="team.priority"
              :label="$t('Priority')"
            ></v-select>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" md="5">
            <v-color-picker v-model="team.color" hide-inputs></v-color-picker>
          </v-col>
        </v-row>
      </v-form>
      <v-divider></v-divider>
      <v-row justify="center">
        <v-col cols="12" md="4" align="center">
          <v-btn
            :disabled="!valid || !(team.supervisor_id !== null)"
            color="success"
            class="mr-4"
            @click="validate"
          >
            {{ $t("Validate") }}
          </v-btn>
        </v-col>
        <v-col cols="12" md="4" align="center">
          <v-btn color="error" class="mr-4" @click="reset">
            {{ $t("Reset form") }}
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
export default {
  name: "Team",
  data: () => ({
    valid: false,
    team: {
      name: "",
      color: "",
      confidence_level: 0,
      priority: 10,
      supervisor_id: null
    },
    users: [],
    confidence_levels: [0, 100, 200, 500, 1000],
    priorities: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  }),
  created() {
    this.$axios.get(this.$host + "user").then(res => {
      this.users = res.data.users;
    });
  },
  methods: {
    validate: function() {
      this.$axios.post(this.$host + "team", this.team).then(() => {
        this.$router.push("/show/user");
      });
    },
    reset: function() {
      this.$refs.team.reset();
    },
    name: function(item) {
      return item.first_name + " " + item.last_name.toUpperCase();
    }
  },
  computed: {
    nameRules() {
      return [
        v => !!v || this.$t("Name is required"),
        v =>
          v.length <= 255 || this.$t("That name is way too long my friend...")
      ];
    }
  }
};
</script>
