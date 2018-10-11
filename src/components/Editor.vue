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
    data(){
        return{
            memos:[{
                markdown:''
            }],
            selectedIndex:0,
        }
    },
    methods:{
        logout:function(){
          firebase.auth().signOut().then(()=>{
            this.$router.push('/')
          })
        },
        preview:function(){
            return marked(this.memos[this.selectedIndex].markdown);
        },
        addMemo:function(){
            this.memos.push({
                markdown:'無題のメモ'
            })
        },
        selectMemo:function(index){
            this.selectedIndex = index;
        },
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
