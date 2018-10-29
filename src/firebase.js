import firebase from 'firebase'
import store from '@/store/store'
import router from '@/router';

const config = {
    apiKey: "AIzaSyBTjzObk0RME2VJBAMqTHP-T6yt59XChV8",
    authDomain: "vue-markdown-49bde.firebaseapp.com",
    databaseURL: "https://vue-markdown-49bde.firebaseio.com",
    projectId: "vue-markdown-49bde",
    storageBucket: "vue-markdown-49bde.appspot.com",
    messagingSenderId: "451265261175"
};

import { isLogin, isLoading, memosLoad, onAuthStateChanged } from "@/store/mutationCreators";

export default {
    //初期化
    init() {
        firebase.initializeApp(config);
    },
    googleLogin() {
        let provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider);
    },
    twitterLogin() {
        let provider = new firebase.auth.TwitterAuthProvider();
        firebase.auth().signInWithRedirect(provider);
    },
    //ログアウト
    logout() {
        //storeのログイン状態を更新
        store.commit( isLogin(false) );
        //強制的にHomeへ移動
        this.saveMemos();
        firebase.auth().signOut().then(() => {
            router.push('/')
        })
    },
    //ユーザーのログイン情報を確認
    onAuth() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                store.commit( isLogin(true) );
            } else {
                store.commit( isLogin(false) );
            }
            user = user ? user : {};
            store.commit( onAuthStateChanged(user) );
            store.commit( isLoading(true) );
        })
    },
    //DBからユーザーのメモを取得
    getMemos() {
        let user = store.getters.user;
        firebase
        .database()
        .ref('/memos/' + user.uid)
        .once('value')
        .then(result => {
            //memosに代入
            if (result.val()) {
                store.commit(memosLoad(result.val()));
            } else {
                store.commit(memosLoad(store.state.memos));
            }
        })
    },
    //メモの保存(DBに書き足し)
    saveMemos() {
        let user = store.getters.user;
        let memos = store.getters.memos;
        firebase
            .database()
            .ref('/memos/' + user.uid)
            .set(memos)
    },
}
