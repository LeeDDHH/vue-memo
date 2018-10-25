import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import Vuetify from "vuetify";
import 'vuetify/dist/vuetify.min.css'
import store from '@/store/store.js'
import Firebase from "@/firebase";
import 'modern-normalize';

Vue.use(Vuetify);

Vue.config.productionTip = false

Firebase.init();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
