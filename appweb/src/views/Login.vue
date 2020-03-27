<template>
  <v-content class="fill-height" fluid>
    <LoginForm></LoginForm>
  </v-content>
</template>

<script>
import LoginForm from "../components/Login";
export default {
  name: "Login",
  components: { LoginForm }
};
</script>
