<template>
  <v-container class="fill-height" fluid>
    <v-row>
      <v-col align="start" justify="center">
        <v-row justify="center">
          <h1>Create a user</h1>
        </v-row>
        <v-form v-model="valid" ref="create_user">
          <v-divider></v-divider>
          <!-- Name and surname -->
          <v-row justify="center">
            <v-col cols="12" md="3">
              <v-text-field
                v-model="user.first_name"
                :rules="nameRules"
                :counter="255"
                label="First name"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="user.surname"
                :counter="255"
                label="Surname"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="user.last_name"
                :rules="nameRules"
                :counter="255"
                label="Last name"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <!-- Phone and email -->
          <v-row justify="center">
            <v-col cols="12" md="4">
              <v-text-field
                v-model="user.phone_number"
                :rules="phoneRules"
                label="Phone"
                required
              ></v-text-field>
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
                    label="Birthday"
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
          </v-row>
          <v-divider></v-divider>
          <!-- Licence date and file -->
          <v-row justify="center">
            <v-col cols="12" md="3">
              <v-checkbox v-model="user.licence" label="Licence ?"></v-checkbox>
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
                    label="Licence Date"
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
                label="Licence pdf scan file"
                v-model="user.licence_scan"
              ></v-file-input>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <!-- Specialty, t-shirt size and profile pic url -->
          <v-row justify="center">
            <v-col cols="12" md="3">
              <v-select
                :items="specialties"
                v-model="user.specialty_id"
                item-text="specialtyName"
                item-value="id"
                label="Specialty"
              ></v-select>
            </v-col>
            <v-col cols="12" md="3">
              <v-select
                :items="tshirt_sizes"
                v-model="user.tshirt_size"
                label="T-Shirt Size"
              ></v-select>
            </v-col>
            <v-col cols="12" md="3">
              <v-file-input
                accept=".png, .jpg"
                label="Profile picture (png, jpg)"
                v-model="user.profile_pic"
              ></v-file-input>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <!-- Comment, experience and incapacity -->
          <v-row justify="center">
            <v-col cols="12" md="3">
              <v-textarea
                label="Comment"
                v-model="user.comment"
                auto-grow
                :counter="255"
                :rules="textRules"
                hint="Got something to say ?"
              ></v-textarea>
            </v-col>
            <v-col cols="12" md="3">
              <v-textarea
                label="Experience"
                v-model="user.experience"
                auto-grow
                :counter="255"
                :rules="textRules"
                hint="Ever did anything interesting ?"
              ></v-textarea>
            </v-col>
            <v-col cols="12" md="3">
              <v-textarea
                label="Incapacity"
                v-model="user.incapacity"
                auto-grow
                :counter="255"
                :rules="textRules"
                hint="Is there something you cannot do ?"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <!-- Validate and reset form -->
          <v-row justify="center">
            <v-col cols="12" md="4" align="center">
              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="validate"
              >
                Validate
              </v-btn>
            </v-col>
            <v-col cols="12" md="4" align="center">
              <v-btn color="error" class="mr-4" @click="reset">
                Reset Form
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "User",
  data: () => ({
    valid: false,
    menu: false,
    menu2: false,
    user: {
      first_name: null,
      last_name: null,
      surname: null,
      birthday: null,
      phone_number: null,
      email: null,
      licence: false,
      licence_date: null,
      licence_scan: null,
      profile_pic: null,
      tshirt_size: null,
      specialty_id: null,
      comment: null,
      experience: null,
      incapacity: null
    },
    specialties: null,
    tshirt_sizes: ["XS", "S", "M", "L", "XL"],
    nameRules: [
      v => !!v || "Name is required",
      v => v.length <= 255 || "Name must be less than 255 characters"
    ],
    textRules: [
      v => v.length <= 255 || "This is way too long nobody will ever read that"
    ],
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    birthdayRules: [v => !!v || "Birthday is required"],
    phoneRules: [
      v => !!v || "Phone number is required",
      v => v.length === 10 || "Phone number must be 10 digits",
      v => /^\d+$/.test(v) || "Phone number must only contain numbers"
    ]
  }),
  created() {
    this.$axios.get(this.$host + "specialty").then(res => {
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
      this.$axios.post(this.$host + "user", this.user).then(res => {
        //eslint-disable-next-line
        console.log(res.data);
      });
    },
    reset: function() {
      this.$refs.create_user.reset();
    }
  }
};
</script>
