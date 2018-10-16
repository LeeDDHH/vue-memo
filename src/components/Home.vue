<template>
    <div id='home'>
        <h1>
            <img src='../assets/kamo.png' alt='カモ'>
        </h1>
        <h1>カモをのぞくとき、<br>カモもまたあなたをのぞくカモ</h1>
            <v-layout justify-center>
                <div @click='googleLogin' class='card'>
                    <v-card hover>
                        <v-icon class="fab fa-google"></v-icon>
                    </v-card>
                </div>
                <div @click='twitterLogin' class='card'>
                    <v-card hover>
                        <v-icon class="fab fa-twitter"></v-icon>
                    </v-card>
                </div>
            </v-layout>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
    name:'home',
    methods:{
        //Googelアカウントでログイン
        googleLogin:function(){
            let provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithRedirect(provider);
        },
        twitterLogin:function(){
            let provider = new firebase.auth.TwitterAuthProvider();
            firebase.auth().signInWithRedirect(provider);
        }
    }
}
</script>

<style lang="scss" scoped>
#home {
    text-align:center;
}

h1 {
  font-family: "Nico Moji";
  font-size: 31px;
  padding-bottom: 7px;
}

.v-card {
    padding:30px;
    background-color: transparent !important;

        &:hover {
            background-color: #edf9ff !important;

            .fa-google{
                color:#F57F17;
            }
            .fa-twitter{
                color:#29B6F6;
            }
        }

}

.v-icon{
        font-size:200px;
}

.card + .card {
    margin-left:40px;
}
</style>
