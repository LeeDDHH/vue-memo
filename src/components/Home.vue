<template>
    <div id='home'>
        <h1>{{msg}}</h1>
        <button @click='googleLogin'>Googleアカウントでログイン</button>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
    name:'home',
    data(){
        return{
            msg:'Welcome to MyMarkdown'
        }
    },
    methods:{
        //Googelアカウントでログイン
        googleLogin:function(){
            let provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithRedirect(provider);
        }
    }
}
</script>
