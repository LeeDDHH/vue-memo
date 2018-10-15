<template>
    <div id ="top">
        <div v-if="!loading">Loading...</div>
        <Home v-if='!isLogin && loading'></Home>
        <Editor v-if='isLogin && loading' :user='userData'></Editor>
    </div>
</template>

<script>
import Editor from '@/components/Editor.vue'
import Home from '@/components/Home.vue'
import firebase from 'firebase';

export default {
  name: 'top',
  //ユーザーのログイン情報を確認
  beforeCreate:function(){
    firebase.auth().onAuthStateChanged(user =>{
      if(user){
        this.isLogin=true;
        this.userData=user;
      } else {
        this.isLogin=false;
        this.userData=null;
      }
      this.loading=true;
    })
  },
  data(){
    return{
      isLogin:false,
      userData:null,
      loading:false,
    }
  },
  components: {
    'Home':Home,
    'Editor':Editor,
  }
}
</script>
