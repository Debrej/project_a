<template>
  <v-container class="fill-height" fluid>
    <v-col align="center" justify="center">
      <h1>Create a location</h1>
      <v-divider></v-divider>
      <v-form ref="location" v-model="valid">
        <v-row justify="center">
          <v-col cols="12" md="5">
            <v-text-field
              v-model="location.name"
              label="Location name"
              :counter="255"
              :rules="nameRules"
              required
            ></v-text-field>
            <v-textarea
              v-model="location.description"
              :counter="1000"
              :rules="descriptionRules"
              label="Description"
              auto-grow
              required
            ></v-textarea>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row justify="center">
          <v-col cols="12" md="5">
            <l-map
              class="map"
              ref="location_map"
              :center="location.center"
              :zoom="zoom"
              @update:zoom="zoomUpdated"
              @update:center="centerUpdated"
            >
              <l-tile-layer :url="url"></l-tile-layer>
              <l-marker :lat-lng="location.center"></l-marker>
            </l-map>
          </v-col>
        </v-row>
      </v-form>
      <v-divider></v-divider>
      <v-row justify="center">
        <v-col cols="12" md="4" align="center">
          <v-btn color="error" class="mr-4" @click="resetCenter">
            Reset map location
          </v-btn>
        </v-col>
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
    </v-col>
  </v-container>
</template>

<script>
export default {
  name: "Location",
  data: () => ({
    valid: false,
    location: {
      name: "",
      description: "",
      center: { lat: 45.78025361202239, lng: 4.87398136395485 }
    },
    url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
    zoom: 15,
    nameRules: [
      v => !!v || "Name is required",
      v => v.length <= 255 || "That name is way too long my friend..."
    ],
    descriptionRules: [
      v => !!v || "Description is required",
      v =>
        v.length <= 1000 ||
        "That description is way too long, nobody will read it"
    ]
  }),
  mounted() {
    this.$nextTick(() => {
      this.$refs.location_map.mapObject.center = this.center;
    });
  },
  methods: {
    zoomUpdated(zoom) {
      this.zoom = zoom;
    },
    centerUpdated(center) {
      this.location.center = center;
    },
    validate: function() {
      this.location.gps_long = this.location.center.lng;
      this.location.gps_lat = this.location.center.lat;
      this.$axios.post(this.$host + "location", this.location).then(() => {
        this.$router.push("/show/location");
      });
    },
    reset: function() {
      this.$refs.location.reset();
      this.resetCenter();
    },
    resetCenter: function() {
      this.location.center = { lat: 45.78025361202239, lng: 4.87398136395485 };
    }
  }
};
</script>

<style scoped lang="scss">
.map {
  min-height: 300px;
  z-index: 0;
}
</style>
