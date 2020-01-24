import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";

import config from "./config";

import axios from "axios";

Vue.config.productionTip = false;

Vue.prototype.$axios = axios;
Vue.prototype.$host = config.host;
Vue.prototype.$momentLocale = config.locale || "en";

export const eventBus = new Vue();

import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

Vue.component("l-map", LMap);
Vue.component("l-tile-layer", LTileLayer);
Vue.component("l-marker", LMarker);

delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

import VuePhoneNumberInput from "vue-phone-number-input/dist/vue-phone-number-input.common";
import "vue-phone-number-input/dist/vue-phone-number-input.css";

Vue.component("vue-phone-number-input", VuePhoneNumberInput);

import { i18n } from "./utils/i18n";

new Vue({
  router,
  vuetify,
  render: h => h(App),
  i18n
}).$mount("#app");
