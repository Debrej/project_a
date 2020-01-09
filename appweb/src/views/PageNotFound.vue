<template>
  <v-container class="fill-height" fluid>
    <v-row justify="center" align="center">
      <v-col justify="center" align="center">
        <v-img
          src="@/assets/logo.png"
          lazy-src="@/assets/lazy/logo.png"
          max-height="350px"
          contain
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
        <h1>Oops, seems that what you're looking for doesn't exist (yet)...</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "PageNotFound"
};
</script>
