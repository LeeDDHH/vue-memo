import 'babel-polyfill';
import Vue from 'vue';
import Vuex from 'vuex';
import * as mutationTypes from '@/store/mutationTypes';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isLogin: false,
    loading: false,
    user: {},
    memos: [
      {
        markdown: ""
      }
    ],
    selectedIndex: 0
  },
  getters: {
    user(state) {
      return state.user;
    },
    userLogin(state) {
      return state.isLogin;
    },
    loading(state) {
      return state.loading;
    },
    memos(state) {
      return state.memos;
    },
    selectedIndex(state) {
      return state.selectedIndex;
    }
  },
  mutations: {
    //storeのログイン状態を更新
    [mutationTypes.IS_LOGIN](state, payload) {
      state.isLogin = payload.boolean;
    },
    //storeのローディング状態を更新
    [mutationTypes.IS_LOADING](state, payload) {
      state.loading = payload.boolean;
    },
    //storeに選択されているメモのインデックスを更新
    [mutationTypes.SELECT](state, payload) {
      state.selectedIndex = payload.index;
    },
    //メモが削除された時、storeのselectedIndexを一つ減らす
    [mutationTypes.INDEX_DECREMENT](state) {
      state.selectedIndex--;
    },
    //ログイン状態でstoreのuser状態を更新
    [mutationTypes.AUTH_CHANGED](state, payload) {
      state.user = payload.user;
    },
    //storeにfirebaseのメモをマウント
    [mutationTypes.LOAD](state, payload) {
      state.memos = payload.memos;
    },
    //storeにメモを追加する
    [mutationTypes.ADD](state, payload) {
      state.memos.push(payload.memo);
    },
    //指定されたインデックスからstoreのメモを削除
    [mutationTypes.REMOVE](state, payload) {
      state.memos.splice(payload.selectedIndex, 1);
    }
  }
});
export default store
