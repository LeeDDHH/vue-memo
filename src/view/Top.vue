<template>
    <div id ="top">
        <div v-if="!loading">Loading...</div>
        <Home v-if='!loginCheck && loading'></Home>
        <Editor v-if='loginCheck && loading' :user='userData'></Editor>
    </div>
</template>

<script>
import Editor from '@/components/Editor.vue'
import Home from '@/components/Home.vue'
import firebase from 'firebase';
import store from '@/store';

export default {
  name: 'top',
  //ユーザーのログイン情報を確認
  beforeCreate:function(){
    firebase.auth().onAuthStateChanged(user =>{
      if(user){
        this.$store.commit('isLogin', true);
        this.userData=user;
      } else {
        this.$store.commit('isLogin', false);
        this.userData=null;
      }
      this.loading=true;
    })
  },
  data(){
    return{
      userData:null,
      loading:false,
    }
  },
  components: {
    'Home':Home,
    'Editor':Editor,
  },
  computed:{
    //storeからログイン状態を取得（boolean）
    loginCheck(){
        return this.$store.getters.userLogin;
      }
  }
}
</script>
