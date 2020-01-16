<template>
  <v-container fluid>
    <v-list>
      <v-list-item v-for="user in users" :key="user.id">
        <v-list-item-avatar>
          <v-img
            :src="$host + profile_pic_baseURL + user.profile_pic_url"
            :alt="$host + profile_pic_baseURL + user.profile_pic_url"
          ></v-img>
        </v-list-item-avatar>
        <v-card min-width="300px" outlined hover>
          <v-card-title>{{
            user.first_name + " " + user.last_name.toUpperCase()
          }}</v-card-title>
          <v-card-subtitle>{{ user.surname }}</v-card-subtitle>
        </v-card>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
export default {
  name: "User",
  data: () => ({
    users: Object,
    profile_pic_baseURL: "files/user/profile_picture/"
  }),
  created() {
    this.$axios.get(this.$host + "user").then(res => {
      this.users = res.data.users;
    });
  }
};
</script>
