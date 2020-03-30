<template>
  <v-col align="start" justify="center" class="fill-height">
    <v-row justify="center">
      <h1>{{ $t("Create a user") }}</h1>
    </v-row>
    <v-form v-model="valid" ref="create_user">
      <b-steps v-model="pagination" :has-navigation="false">
        <b-step-item :label="$t('Base info')" clickable class="step-item">
          <!-- Name and surname -->
          <v-row justify="center">
            <v-col cols="12" md="3">
              <v-text-field
                v-model="user.first_name"
                :rules="nameRules"
                :counter="255"
                :label="$t('First name')"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="user.surname"
                :counter="255"
                :label="$t('Surname')"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="user.last_name"
                :rules="nameRules"
                :counter="255"
                :label="$t('Last name')"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <!-- Phone and email -->
          <v-row justify="center">
            <v-col cols="12" md="4">
              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="user.birthday"
                    :label="$t('Birthday')"
                    :rules="birthdayRules"
                    readonly
                    required
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="user.birthday"
                  @input="menu = false"
                  :max="new Date().toISOString()"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="user.email"
                :rules="emailRules"
                label="Email"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <!-- Birthday -->
          <v-row justify="center">
            <v-col cols="12" md="4">
              <vue-phone-number-input
                v-model="user.phone_number"
                :preferred-countries="preferredCountries"
                @update="phoneNumberUpdated"
                :translations="translations"
              ></vue-phone-number-input>
            </v-col>
          </v-row>
        </b-step-item>
        <b-step-item :label="$t('Licence')" clickable class="step-item">
          <!-- Licence date and file -->
          <v-row justify="center">
            <v-col cols="12" md="3">
              <v-checkbox
                v-model="user.licence"
                :label="$t('Licence ?')"
              ></v-checkbox>
            </v-col>
            <v-col cols="12" md="3">
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                :disabled="!user.licence"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="user.licence_date"
                    :label="$t('Licence Date')"
                    :disabled="!user.licence"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="user.licence_date"
                  @input="menu = false"
                  :max="new Date().toISOString()"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="3">
              <v-file-input
                :disabled="!user.licence"
                accept=".pdf"
                :label="$t('Licence pdf scan file')"
                v-model="user.licence_scan"
              ></v-file-input>
            </v-col>
          </v-row>
        </b-step-item>
        <b-step-item :label="$t('Other info')" clickable class="step-item">
          <!-- Specialty, t-shirt size and profile pic url -->
          <v-row justify="center">
            <v-col cols="12" md="3">
              <v-select
                :items="specialties"
                v-model="user.specialty_id"
                item-text="specialtyName"
                item-value="id"
                :label="$t('Specialty')"
              ></v-select>
            </v-col>
            <v-col cols="12" md="3">
              <v-select
                :items="tshirt_sizes"
                v-model="user.tshirt_size"
                :label="$t('T-Shirt Size')"
              ></v-select>
            </v-col>
            <v-col cols="12" md="3">
              <v-file-input
                accept=".png, .jpg, .gif"
                :label="$t('Profile picture') + ' (png, jpg)'"
                v-model="user.profile_pic"
              ></v-file-input>
            </v-col>
          </v-row>
        </b-step-item>
        <b-step-item :label="$t('Comments')" clickable class="step-item">
          <!-- Comment, experience and incapacity -->
          <v-row justify="center">
            <v-col cols="12" md="3">
              <v-textarea
                :label="$t('Comment')"
                v-model="user.comment"
                auto-grow
                :counter="255"
                :rules="textRules"
                :hint="$t('Got something to say ?')"
              ></v-textarea>
            </v-col>
            <v-col cols="12" md="3">
              <v-textarea
                :label="$t('Experience')"
                v-model="user.experience"
                auto-grow
                :counter="255"
                :rules="textRules"
                :hint="$t('Ever did anything interesting ?')"
              ></v-textarea>
            </v-col>
            <v-col cols="12" md="3">
              <v-textarea
                :label="$t('Incapacity')"
                v-model="user.incapacity"
                auto-grow
                :counter="255"
                :rules="textRules"
                :hint="$t('Is there something you cannot do ?')"
              ></v-textarea>
            </v-col>
          </v-row>
        </b-step-item>
      </b-steps>
      <v-divider></v-divider>
      <!-- Validate and reset form -->
      <v-row justify="center">
        <v-col cols="12" md="4" align="center">
          <v-btn
            :disabled="!(valid && phoneValid)"
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
    </v-form>
  </v-col>
</template>

<script>
import UserRequest from "../../services/http/userService";
import SpecialityRequest from "../../services/http/specialityService";
import axios from "axios";

const userRequest = new UserRequest();
const specialityRequest = new SpecialityRequest();

import BSteps from "buefy/src/components/steps/Steps";
import BStepItem from "buefy/src/components/steps/StepItem";
export default {
  name: "User",
  components: { BStepItem, BSteps },
  data: () => ({
    pagination: 0,
    valid: false,
    menu: false,
    menu2: false,
    user: {
      first_name: "",
      last_name: "",
      surname: "",
      birthday: "",
      phone_number: "",
      email: "",
      licence: false,
      licence_date: null,
      licence_scan: null,
      profile_pic: null,
      tshirt_size: null,
      specialty_id: null,
      comment: "",
      experience: "",
      incapacity: ""
    },
    specialties: null,
    tshirt_sizes: ["XS", "S", "M", "L", "XL"],
    preferredCountries: ["FR", "BE", "US", "BR"],
    phoneValid: false
  }),
  created() {
    specialityRequest.fetch().then(res => {
      this.specialties = res.data.specialty;
      for (let i in this.specialties) {
        this.specialties[i].specialtyName =
          this.specialties[i].year + " " + this.specialties[i].name;
      }
    });
  },
  methods: {
    validate: function() {
      if (!this.user.licence) {
        this.user.licence_date = null;
        this.user.licence_scan = null;
      }
      userRequest.post(this.user).then(res => {
        let user = res.data.user;
        let promises = [];
        if (this.user.profile_pic !== null) {
          let formData = new FormData();
          formData.append("file", this.user.profile_pic);
          promises.push(userRequest.uploadFile(user, "photo", formData));
        }
        if (this.user.licence_scan !== null) {
          let formData = new FormData();
          formData.append("file", this.user.licence_scan);
          promises.push(userRequest.uploadFile(user, "licence", formData));
        }
        axios.all(promises).then(() => {
          this.$router.push("/show/user");
        });
      });
    },
    reset: function() {
      this.$refs.create_user.reset();
      this.pagination = 0;
    },
    phoneNumberUpdated: function(e) {
      this.phoneValid = e.isValid;
    }
  },
  computed: {
    nameRules() {
      return [
        v => !!v || this.$t("Name is required"),
        v =>
          v.length <= 255 || this.$t("That name is way too long my friend...")
      ];
    },
    textRules() {
      return [
        v =>
          v.length <= 255 ||
          this.$t("This is way too long nobody will ever read that")
      ];
    },
    emailRules() {
      return [
        v => !!v || this.$t("Email is required"),
        v => /.+@.+\..+/.test(v) || this.$t("Email must be valid")
      ];
    },
    birthdayRules() {
      return [v => !!v || this.$t("Birthday is required")];
    },
    translations() {
      return {
        countrySelectorLabel: this.$t("Country code"),
        countrySelectorError: this.$t("Choose a country"),
        phoneNumberLabel: this.$t("Phone number"),
        example: this.$t("Example") + " :"
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.step-item {
  min-height: 400px;
}
</style>
