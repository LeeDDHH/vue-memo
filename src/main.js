import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase';
import router from '@/router'
import Vuetify from "vuetify";
import 'vuetify/dist/vuetify.min.css'
import store from '@/store'

Vue.use(Vuetify);

Vue.config.productionTip = false

const config = {
    apiKey: 'AIzaSyBTjzObk0RME2VJBAMqTHP-T6yt59XChV8',
    authDomain: 'vue-markdown-49bde.firebaseapp.com',
    databaseURL: 'https://vue-markdown-49bde.firebaseio.com',
    projectId: 'vue-markdown-49bde',
    storageBucket: 'vue-markdown-49bde.appspot.com',
    messagingSenderId: '451265261175',
}
firebase.initializeApp(config);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
