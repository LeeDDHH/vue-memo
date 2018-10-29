<template>
  <div id="app">
    <v-app>
      <v-toolbar app class='yellow darken-2'>
        <v-icon v-if='loginCheck' class='fas fa-chevron-left btn' @click='logout'></v-icon><h1>{{ $t('app.title') }}</h1>
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
import Firebase from '@/firebase';

export default {
  name: 'app',
  data () {
    return {
      multi:this.$i18n.messages
    }
  },
  computed:{
    //storeからログイン状態を取得（boolean）
    loginCheck(){
      // console.log(this.$i18n.messages);
        return this.$store.getters.userLogin;
      }
  },
  methods:{
    //ログアウト(homeへ移動)
    logout:function(){
      Firebase.logout();
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
a {
    text-decoration: none;
}
.btn{
    margin-right:10px;
}
</style>
