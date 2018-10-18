<template>
    <div class='editor'>
        <div class='editor__sidebar'>
            <div>{{user.displayName}}さん、いらっしゃい</div>
            <div class='editor__buttonList'>
                <v-btn fab class='pink darken-1' @click='logout'>
                    <v-icon class='fas fa-chevron-left white--text'></v-icon>
                </v-btn>
                <v-btn fab class='btn yellow darken-4' @click='addMemo'>
                    <v-icon class='fas fa-plus-circle white--text'></v-icon>
                </v-btn>
                <v-btn fab class='btn brown darken-4' v-if='memos.length > 1' @click='deleteMemo'>
                    <v-icon class='far fa-trash-alt white--text'></v-icon>
                </v-btn>
            </div>
            <ul class='editor__scroll' >
                <li class='editor__memoList' v-for='(memo, index) in memos' :key='index' @click='selectMemo(index)' :data-selected='index == selectedIndex'>
                    <p class='editor__memotitle'>{{displayTitle(memo.markdown)}}</p>
                </li>
            </ul>
        </div>
        <div class='markdown'>
            <div class='markdown__contents'>
                <textarea class='markdown__textarea' placeholder='最初の行がタイトルになります' v-model='memos[selectedIndex].markdown'></textarea>
                <div class='markdown__preview' v-html='preview()'></div>
            </div>
            <div>
                <v-btn fab class='btn blue lighten-1' @click='saveMemos'><v-icon class='far fa-save white--text'></v-icon></v-btn>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
import marked from 'marked';

export default {
    name:'editor',
    props:['user'],
    created:function(){
    //DBからユーザーのメモを取得
    firebase
      .database()
      .ref('/memos/'+this.user.uid)
      .once('value')
      .then(result => {
        //memosに代入
        if(result.val()){
          this.memos = result.val()
        }
      })
  },
    data(){
        return{
            //デフォルトのデータ
            memos:[{
                markdown:''
            }],
            selectedIndex:0,
        }
    },
    methods:{
        //ログアウト処理 && ログインページに遷移
        logout:function(){
          firebase.auth().signOut().then(()=>{
            this.$router.push('/')
          })
        },
        //プレビューに表示
        preview:function(){
            return marked(this.memos[this.selectedIndex].markdown);
        },
        //新しいメモの追加
        addMemo:function(){
            this.memos.push({
                markdown:'無題のメモ'
            })
        },
        //メモの削除
        deleteMemo:function(){
            this.memos.splice(this.selectedIndex,1)
            if(this.selectedIndex > 0){
                this.selectedIndex--
            }
        },
        //メモの保存(DBに書き足し)
        saveMemos:function(){
            firebase
                .database()
                .ref('/memos/'+this.user.uid)
                .set(this.memos)
        },
        //選択したメモ
        selectMemo:function(index){
            this.selectedIndex = index;
        },
        //メモのタイトルだけ表示
        displayTitle:function(text){
            return text.split(/\n/)[0];
        }
    }
}
</script>

<style lang='scss' scoped>
html {
    height:100%
}
body {
    height: 100%;
    margin: 0;
}
ul{
    padding-left:0px;
}
.editor{
    display: flex;
    height: 100%;
    margin-top: 20px;
    $border: #000;
    $selected: #FBC02D;
    $even-num: #E0E0E0;
    $hover:#FFF176;

    &__sidebar{
        width:19%;
        max-height: 500px;
        flex-basis: 20%;
        padding: 40px 0px;
    }
    &__buttonList{
        display:flex;
        padding: 20px 5px;
    }
    &__buttonList button:first-child{
        margin-right: auto;
    }
    &__buttonList .v-icon{
        display:block;
    }
    &__scroll{
        height: 100%;
        overflow-y:scroll;
        // border:1px solid $border;
    }
    &__scroll::-webkit-scrollbar{
        display:none;
    }
    &__memoList{
        list-style: none;
        padding:10px;
        box-sizing:border-box;
        text-align:left;
        border-bottom:1px solid $border;
        &:hover{
            background-color: $hover;
        }
        // &:nth-child(even){
        //     background-color:$even-num;
        // }
        &[data-selected='true']{
            background-color:$selected;
        }
    }
    &__memotitle{
        height:15px;
        margin:0;
        white-space: nowrap;
        overflow:hidden;
    }
}

.markdown{
        flex-basis: 80%;
        text-align: left;
        background-color:#F5F5F5;

    &__contents{
        padding: 40px 20px;
        display: flex;
        flex-wrap: nowrap;
        height: 90%;
        text-align:left;

         > * {
            border: solid 1px grey;
            height: 100%;
            padding: 30px;
            margin: 0 10px;
            flex-basis: 50%;
        }
    }
}

.btn{
    margin-right:10px;
}
</style>
