<template>
    <div class='editor'>
        <h1>エディター画面</h1>
        <span>{{user.displayName}}</span>
        <button @click='logout'>ログアウト</button>
    </div>
</template>

<script>
import firebase from 'firebase'
import marked from 'marked';

export default {
    name:'editor',
    props:['user'],
    data(){
        return{
        }
    },
    methods:{
        logout:function(){
          firebase.auth().signOut().then(()=>{
              this.$router.push('/')
          })
        }
    }
}
</script>
<style lang='scss'>
</style>
