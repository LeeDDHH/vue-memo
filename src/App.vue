<template>
  <div id="app">
    <Home v-if='!login'></Home>
    <Editor v-if='login'></Editor>
  </div>
</template>

<script>
import Editor from './components/Editor.vue'
import Home from './components/Home.vue'
import firebase from 'firebase';

export default {
  name: 'app',
  data(){
    return{
      login:false
    }
  },
  created:function(){
    firebase.auth().onAuthStateChanged(user =>{
      if(user){
        this.login=true;
      } else {
        this.login=false;
      }
    })
  },
  components: {
    'Home':Home,
    'Editor':Editor,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
