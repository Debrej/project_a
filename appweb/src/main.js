import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";

import axios from "axios";

Vue.config.productionTip = false;

Vue.prototype.$axios = axios;
Vue.prototype.$host = "http://localhost:2424/";

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
