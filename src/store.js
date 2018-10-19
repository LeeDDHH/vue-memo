import 'babel-polyfill';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        isLogin: false,
        user: {}
    },
    getters: {
        userLogin(state) {
            return state.isLogin;
        }
    },
    mutations: {
        isLogin(state, payload) {
            state.isLogin = payload;
        },
    }
})
export default store
