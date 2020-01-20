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
        <v-card-title>
          {{ location.name }}
        </v-card-title>
        <l-map class="map" ref="location_map_card" :center="center" :zoom="16">
          <l-tile-layer :url="url"></l-tile-layer>
          <l-marker :lat-lng="center"></l-marker>
        </l-map>
      </v-card>
    </template>

    <v-card>
      <v-card-title class="headline lighten-2" primary-title>
        {{ location.name }}
      </v-card-title>

      <v-divider></v-divider>

      <v-container fluid>
        <v-col cols="12" md="3">
          {{ location.description }}
        </v-col>
        <v-col cols="12" md="9">
          <l-map class="map" ref="location_map" :center="center" :zoom="15">
            <l-tile-layer :url="url"></l-tile-layer>
            <l-marker :lat-lng="center"></l-marker>
          </l-map>
        </v-col>
      </v-container>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn
          color="primary"
          text
          @click="routerPush('/edit/location/' + user.id)"
        >
          Edit
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
export default {
  name: "Location",
  props: ["location"],
  data: () => ({
    dialog: false,
    url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
  }),
  mounted() {
    this.$nextTick(() => {
      this.$refs.location_map.mapObject.center = this.center;
      this.$refs.location_map_card.mapObject.center = this.center;
    });
  },
  computed: {
    center: function() {
      return {
        lat: parseFloat(this.location.gps_lat),
        lng: parseFloat(this.location.gps_long)
      };
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
