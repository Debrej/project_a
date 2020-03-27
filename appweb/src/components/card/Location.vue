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
        <Map :center="center"></Map>
      </v-card>
    </template>

    <v-card>
      <v-card-title class="headline lighten-2" primary-title>
        {{ location.name }}
      </v-card-title>

      <v-divider></v-divider>

      <v-container fluid>
        <v-row>
          <v-col cols="12" md="3">
            <v-row>
              <v-col>
                <strong>{{ $t("Description") }}</strong>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                {{ location.description }}
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="9">
            <Map :center="center"></Map>
          </v-col>
        </v-row>
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
import Map from "./Map";
export default {
  name: "Location",
  components: { Map },
  props: ["location"],
  data: () => ({
    dialog: false,
    url: "https://{s}.tile.osm.org/{z}/{x}/{y}.png"
  }),
  mounted() {
    this.$nextTick(function() {
      this.$refs.location_map.mapObject.center = this.center;
    });
  },
  methods: {
    routerPush: function(url) {
      this.$router.push(url);
    }
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
  width: 100%;
  z-index: 0;
}
</style>
