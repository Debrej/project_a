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
          {{ equipment.name }}
        </v-card-title>
        <v-list>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-hammer-wrench</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              {{ equipment.equipment_type.name }}
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-counter</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              {{ equipment.quantity }}
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </template>

    <v-card>
      <v-card-title class="headline lighten-2" primary-title>
        {{ equipment.name }}
      </v-card-title>

      <v-divider></v-divider>

      <v-container fluid>
        <v-row>
          <v-col cols="12" md="6">
            <v-list>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-hammer-wrench</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  {{ equipment.equipment_type.name }}
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-counter</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  {{ equipment.quantity + " " + equipment.name.toLowerCase() }}
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
          <v-col cols="12" md="6">
            <v-row>
              <v-col>
                <strong>Description</strong>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                {{ equipment.description }}
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-card outlined>
              <v-card-title>{{ pickup_location.name }}</v-card-title>
              <v-card-subtitle>Pickup location</v-card-subtitle>
              <Map :center="centerFromLocation(pickup_location)"></Map>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card outlined>
              <v-card-title>{{ drop_location.name }}</v-card-title>
              <v-card-subtitle>Drop location</v-card-subtitle>
              <Map :center="centerFromLocation(drop_location)"></Map>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn
          color="primary"
          text
          @click="routerPush('/edit/equipment/' + user.id)"
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
  name: "Equipment",
  components: { Map },
  props: ["equipment", "pickup_location", "drop_location"],
  data: () => ({
    dialog: false
  }),
  methods: {
    routerPush: function(url) {
      this.$router.push(url);
    },
    centerFromLocation: function(location) {
      console.log({ lat: location.gps_lat, lng: location.gps_long });
      return { lat: location.gps_lat, lng: location.gps_long };
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
