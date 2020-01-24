<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      {{
        $t("Calendar message", {
          name: user.first_name + " " + user.last_name.toUpperCase()
        })
      }}
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
