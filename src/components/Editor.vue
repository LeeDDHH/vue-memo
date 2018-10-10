<template>
    <div class='editor'>
        <h1>エディター画面</h1>
        <button @click='Logout'>ログアウト</button>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
    name:'editor',
    data(){
        return{
        }
    },
    methods:{
        Logout:function(){
          firebase.auth().signOut().then(()=>{
              this.$router.push('/')
          })
        }
    }
}
</script>
<style lang='scss'>
</style>
