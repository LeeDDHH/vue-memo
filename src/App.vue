<template>
  <div id="app">
    <v-app>
      <v-toolbar app class='yellow darken-2'>
        <v-icon v-if='loginCheck' class='fas fa-chevron-left btn' @click='logout'></v-icon><h1>カモメモ</h1>
      </v-toolbar>
      <v-content class='grey lighten-4'>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import firebase from 'firebase';
import store from '@/store';

export default {
  name: 'app',
  computed:{
    //storeからログイン状態を取得（boolean）
    loginCheck(){
        return this.$store.getters.userLogin;
      }
  },
  methods:{
    logout:function(){
      //storeのログイン状態を更新
      this.$store.commit('isLogin', false);
      //強制的にHomeへ移動
      firebase.auth().signOut().then(()=>{
        this.$router.push('/')
      })
    },
  }
}
</script>

<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#app,
#top,
.container,
.editor {
  height: 100%;
}
h1 {
  font-family: "Nico Moji";
  font-size: 31px;
  padding-bottom: 7px;
}
.btn{
    margin-right:10px;
}
</style>
