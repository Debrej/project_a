import Vue from "vue";
import VueI18n from "vue-i18n";
import config from "../config";

import messages from "../i18n/index";

Vue.use(VueI18n);

export const i18n = new VueI18n({
  locale: config.locale,
  fallbackLocale: "en",
  messages
});
