<template>
    <div class='editor'>
        <h1>エディター画面</h1>
        <span>{{user.displayName}}</span>
        <button @click='logout'>ログアウト</button>
        <div>
            <div class='memoListWrapper'>
                <div class='memoList' v-for='(memo, index) in memos' :key='index' @click='selectMemo(index)' :data-selected='index == selectedIndex'>
                    <p class='memotitle'>{{displayTitle(memo.markdown)}}</p>
                </div>
                <button class='addMemoButton' @click='addMemo'>メモの追加</button>
                <button class='deleteMemoButton' v-if='memos.length > 1' @click='deleteMemo'>選択中のメモの削除</button>
                <button class='saveMemosButton' @click='saveMemos'>メモを保存</button>
            </div>
        </div>
        <div class='editorWrapper'>
            <textarea class='markdown' v-model='memos[selectedIndex].markdown'></textarea>
            <div class='preview' v-html='preview()'></div>
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
.memoListWrapper{
    width:19%;
    float:left;
    border-top:1px solid #000;
}
.memoList{
    padding:10px;
    box-sizing:border-box;
    text-align:left;
    border-bottom:1px solid #000;
    &:nth-child(even){
        background-color:#ccc;
    }
    &[data-selected='true']{
        background-color:#ccf;
    }
}
.memotitle{
    height:15px;
    margin:0;
    white-space: nowrap;
    overflow:hidden;
}
.addMemoButton{
    margin-top:20px;
}
.deleteMemoButton{
    margin:10px;
}
.editorWrapper{
    display:flex;
}
.markdown{
    float:left;
    width:40%;
    height:500px;
}
.preview{
    float:left;
    width:40%;
    text-align:left;
}
</style>
