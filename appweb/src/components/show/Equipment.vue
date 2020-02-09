<template>
  <v-container fluid>
    <v-col justify="start" align-item="start">
      <v-row>
        <v-col cols="12" md="4">
          <v-row align="center">
            <v-select
              :items="equipment_types"
              v-model="selectedEquipmentTypes"
              :label="$t('Type')"
              item-text="name"
              item-value="id"
              multiple
              chips
              :hint="$t('Selected types')"
              persistent-hint
            ></v-select>
            <v-btn text icon @click="resetEquipmentTypes">
              <v-icon>mdi-close-circle</v-icon>
            </v-btn>
          </v-row>
        </v-col>
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
          v-for="equipment in filteredEquipments()"
          :key="equipment.id"
        >
          <EquipmentCard
            :equipment="equipment"
            :drop_location="returnDropLocationForEquipment(equipment)"
            :pickup_location="returnPickupLocationForEquipment(equipment)"
          ></EquipmentCard>
        </v-col>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
import EquipmentCard from "../card/Equipment";
import Fuse from "fuse.js";
import LocationRequest from "../../services/http/locationService";
import EquipmentRequest from "../../services/http/equipmentService";
import EquipmentTypeRequest from "../../services/http/equipmentTypeService";

const locationRequest = new LocationRequest();
const equipmentRequest = new EquipmentRequest();
const equipmentTypeRequest = new EquipmentTypeRequest();

export default {
  name: "Equipment",
  components: { EquipmentCard },
  data: () => ({
    equipments: [],
    locations: [],
    search: "",
    selectedEquipmentTypes: [],
    equipment_types: []
  }),
  created() {
    equipmentTypeRequest.fetch().then(res => {
      this.equipment_types = res.data.equipment_type;
    });
    equipmentRequest.fetch().then(res => {
      this.equipments = res.data.equipments;
    });
    locationRequest.fetch().then(res => {
      this.locations = res.data.location;
    });
  },
  methods: {
    resetEquipmentTypes: function() {
      this.selectedEquipmentTypes = [];
    },
    filteredEquipments: function() {
      if (
        this.selectedEquipmentTypes.length === 0 &&
        this.search.length === 0
      ) {
        return this.equipments;
      } else {
        const options = {
          shouldSort: true,
          threshold: 0.45,
          location: 0,
          distance: 100,
          maxPatternLength: 32,
          minMatchCharLength: 1,
          keys: ["name", "description"]
        };
        const fuse = new Fuse(this.equipments, options);
        if (this.selectedEquipmentTypes.length === 0) {
          let search = this.search.toLowerCase();
          return fuse.search(search);
        } else if (this.search.length === 0) {
          let filteredArrayEquipmentTypes = [];
          for (let i in this.equipments) {
            let equipment = this.equipments[i];
            if (
              this.selectedEquipmentTypes.includes(equipment.equipment_type.id)
            ) {
              filteredArrayEquipmentTypes.push(equipment);
            }
          }
          return filteredArrayEquipmentTypes;
        } else {
          let search = this.search.toLowerCase();
          let filteredArraySearch = fuse.search(search);
          let filteredArrayEquipmentTypes = [];
          for (let i in filteredArraySearch) {
            let equipment = filteredArraySearch[i];
            if (
              this.selectedEquipmentTypes.includes(equipment.equipment_type.id)
            ) {
              filteredArrayEquipmentTypes.push(equipment);
            }
          }
          return filteredArrayEquipmentTypes;
        }
      }
    },
    returnPickupLocationForEquipment: function(equipment) {
      return this.locations.filter(l => l.id === equipment.pickup_location)[0];
    },
    returnDropLocationForEquipment: function(equipment) {
      return this.locations.filter(l => l.id === equipment.drop_location)[0];
    }
  }
};
</script>
