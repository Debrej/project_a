<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      Calendar of {{ user.first_name + " " + user.last_name }} not yet available
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Calendar",
  props: ["user"]
};
</script>

<style scoped></style>
