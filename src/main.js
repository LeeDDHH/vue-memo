import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import Vuetify from "vuetify";
import 'vuetify/dist/vuetify.min.css'
import store from '@/store/store.js'
import Firebase from "@/firebase";
import 'modern-normalize';
import Vuei18n from 'vue-i18n';

Vue.use(Vuetify);
Vue.use(Vuei18n);

const i18n = new Vuei18n({
  locale: navigator.language,
  fallbackLocale: "en",
  messages: {
    en: require("./i18n/en.json"),
    ja: require("./i18n/ja.json"),
    ko: require('./i18n/ko.json')
  }
});

Vue.config.productionTip = false

Firebase.init();

new Vue({
  router,
  store,
  i18n:i18n,
  render: h => h(App)
}).$mount("#app");
