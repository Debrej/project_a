<template>
  <v-container fluid>
    <v-col justify="start" align-item="start">
      <v-row>
        <v-spacer></v-spacer>
        <v-col cols="12" md="4">
          <v-row align="center">
            <v-text-field
              v-model="search"
              :label="$t('Enter name')"
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
          v-for="location in filteredLocations()"
          :key="location.id"
        >
          <LocationCard :location="location"></LocationCard>
        </v-col>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
import Fuse from "fuse.js";
import LocationCard from "../card/Location";
import LocationRequest from "../../services/http/locationService";

const locationRequest = new LocationRequest();

export default {
  name: "Location",
  components: { LocationCard },
  data: () => ({
    locations: [],
    search: ""
  }),
  created() {
    locationRequest.fetch().then(res => {
      this.locations = res.data.location;
    });
  },
  methods: {
    filteredLocations: function() {
      if (this.search.length !== 0) {
        const options = {
          shouldSort: true,
          threshold: 0.45,
          location: 0,
          distance: 100,
          maxPatternLength: 32,
          minMatchCharLength: 1,
          keys: ["name"]
        };
        const fuse = new Fuse(this.locations, options);
        return fuse.search(this.search.toLowerCase());
      } else return this.locations;
    }
  }
};
</script>

<style scoped></style>
