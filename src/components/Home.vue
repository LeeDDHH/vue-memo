<template>
    <div id='home'>
        <h1>
            <img src='../assets/kamo.png' alt='kamo'>
        </h1>
        <h1 v-html="$t('app.message')"></h1>
        <router-link to="/read">{{ $t('term.title') }}</router-link>
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
import Firebase from '@/firebase'

export default {
    name:'home',
    methods:{
        //Googelアカウントでログイン
        googleLogin:function(){
            Firebase.googleLogin();
        },
        twitterLogin:function(){
            Firebase.twitterLogin();
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
