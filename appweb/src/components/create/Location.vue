<template>
  <v-container class="fill-height" fluid>
    <v-col align="center" justify="center">
      <h1>{{ $t("Create a location") }}</h1>
      <v-divider></v-divider>
      <v-form ref="location" v-model="valid">
        <v-row justify="center">
          <v-col cols="12" md="5">
            <v-text-field
              v-model="location.name"
              :label="$t('Location name')"
              :counter="255"
              :rules="nameRules"
              required
            ></v-text-field>
            <v-textarea
              v-model="location.description"
              :counter="1000"
              :rules="descriptionRules"
              :label="$t('Description')"
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
              :center="mapCenter"
              :zoom="zoom"
              @update:center="mapCenterUpdated"
            >
              <l-tile-layer :url="url"></l-tile-layer>
              <l-marker
                :lat-lng="location.center"
                :draggable="true"
                @update:latLng="centerUpdated"
              ></l-marker>
            </l-map>
          </v-col>
        </v-row>
      </v-form>
      <v-divider></v-divider>
      <v-row justify="center">
        <v-col cols="12" md="4" align="center">
          <v-btn color="error" class="mr-4" @click="resetCenter">
            {{ $t("Reset map location") }}
          </v-btn>
        </v-col>
        <v-col cols="12" md="4" align="center">
          <v-btn
            :disabled="!valid"
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
  name: "Location",
  data: () => ({
    valid: false,
    mapCenter: { lat: 45.78025361202239, lng: 4.87398136395485 },
    location: {
      name: "",
      description: "",
      center: { lat: 45.78025361202239, lng: 4.87398136395485 }
    },
    url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
    zoom: 15
  }),
  mounted() {
    this.$nextTick(() => {
      this.$refs.location_map.mapObject.center = this.mapCenter;
      this.$refs.location_map.mapObject.on("click", e => {
        this.centerUpdated(e.latlng);
      });
    });
  },
  methods: {
    centerUpdated(e) {
      this.location.center = e;
    },
    mapCenterUpdated: function(center) {
      this.mapCenter = center;
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
      this.mapCenter = { lat: 45.78025361202239, lng: 4.87398136395485 };
      this.location.center = { lat: 45.78025361202239, lng: 4.87398136395485 };
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
    descriptionRules() {
      return [
        v => !!v || this.$t("Description is required"),
        v =>
          v.length <= 1000 ||
          this.$t("That description is way too long, nobody will read it")
      ];
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
