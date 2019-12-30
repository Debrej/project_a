//region IMPORTING MODULES TO USE IN VUE

import Vue from 'vue';
import App from './App.vue';
import router from './router'

import axios from 'axios';
import moment from 'moment';

//endregion

//region IMPORTING COMPONENTS TO USE IN THE APP

import '@desislavsd/vue-select/dist/vue-select.css'
import VueSelect from '@desislavsd/vue-select'
Vue.use(VueSelect);

import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
Vue.component('vue-ctk-date-time-picker', VueCtkDateTimePicker);

import {LMap, LTileLayer, LMarker} from 'vue2-leaflet'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);

delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

//endregion

//region VUE GLOBAL VARIABLE

Vue.prototype.$host = 'http://localhost:2424';
Vue.prototype.$axios = axios;
Vue.prototype.$moment = moment;

//endregion

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router
}).$mount('#app');
