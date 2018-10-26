<template>
    <div class='editor'>
        <div class='editor__sidebar'>
            <v-chip>{{user.displayName}}</v-chip>
            <br>
            <router-link to="/read">利用規約</router-link>
            <div class='editor__scroll'>
                <div class='editor__memo' v-for='(memo, index) in memos' :key='index' @click='select(index)' :data-selected='index == selectedIndex'>
                    <div class='editor__memo_one'>
                        <div class='editor__memotitle'>{{displayTitle(memo.markdown)}}</div>
                    </div>
                </div>
                <div class='editor__memo_add' style='text-align:center;' @click='add()'>
                    <v-icon class='fas fa-plus-circle white--text' style='width:23px;height:23px;'></v-icon>
                </div>
            </div>
        </div>
        <div class='markdown'>
            <div class='markdown__contents' @keydown='smartSave()'>
                <textarea class='markdown__textarea' placeholder='最初の行がタイトルになります' v-model='memos[selectedIndex].markdown'></textarea>
                <div class='markdown__preview' v-html='preview()'></div>
            </div>
            <div class='markdown__buttons'>
                <v-btn fab class='btn blue lighten-1' @click='saveMemos()'>
                    <v-icon class='far fa-save white--text'></v-icon>
                </v-btn>
                <v-btn fab class='btn brown darken-4' v-if='memos.length > 1' @click='remove()'>
                    <v-icon class='far fa-trash-alt white--text'></v-icon>
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script>
import Firebase from '@/firebase'
import marked from 'marked';
import { memoAdd,memoDelete,selectedIndexChanged,selectedIndexDecrease } from '@/store/mutationCreators';
import { mapGetters } from 'vuex'

export default {
    name:'editor',
    data(){
        return{
            savetime:0
        }
    },
    created:function(){
        Firebase.getMemos();
    },
    computed:{
        ...mapGetters([
        'user',
        'memos',
        'selectedIndex'
    ])},
    methods:{
        //プレビューに表示
        preview:function(){
            return marked(this.memos[this.selectedIndex].markdown);
        },
        //新しいメモの追加
        add:function(){
            this.$store.commit( memoAdd({markdown:'無題のカモ'}) );
        },
        //メモの削除
        remove:function(){
            let selectedIndex = this.$store.getters.selectedIndex;
            this.$store.commit( memoDelete(selectedIndex) );
            if(selectedIndex > 0){
                this.$store.commit( selectedIndexDecrease() );
            }
        },
        //メモの保存(DBに書き足し)
        saveMemos:function(){
            Firebase.saveMemos();
        },
        //選択したメモ
        select:function(index){
            this.$store.commit( selectedIndexChanged(index) );
        },
        //メモのタイトルだけ表示
        displayTitle:function(text){
            if(!text.split(/\n/)[0]) return "無題のカモ";
            return text.split(/\n/)[0];
        },
        //検知して、保存
        smartSave:function(){
            let This = this;
            //command + sもしくはctrl + cで保存することができるように変更
            if(event.metaKey == true && event.keyCode == 83 || event.ctrlKey == true && event.keyCode == 83){
                event.preventDefault();
                event.stopPropagation();
                this.saveMemos();
            }

            function waitThenSave(){
                This.saveMemos();
                window.clearTimeout(time);
            }
            let time = setTimeout(waitThenSave, 3000);
        },
    },
}
</script>

<style lang='scss' scoped>
@mixin memoListItem {
    list-style: none;
    width:85%;
    padding:10px;
    margin-left:5%;
    transition: .1s ease-in-out;
    position: relative;
    cursor: pointer;
}
@mixin arrow {
    width:30px;
    height:30px;
    content:"";
    position:absolute;
    top:50%;
    right:-15px;
    transform: rotate(45deg);
    margin-top: -15px;
    transition: .1s ease-in-out;
    z-index:-1;
}
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
    $background: #F5F5F5;

    &__sidebar{
        width:19%;
        max-height: 450px;
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
        margin-top: 90px;
    }
    &__scroll::-webkit-scrollbar{
        display:none;
    }
    &__memo{
        @include memoListItem;
        text-align:left;
        z-index:2;

        &:after{
            @include arrow;
        }

        &:hover{
            background-color: $hover;

            &:after{
                background-color: $hover;
            }
        }

        &[data-selected='true']{
            background-color:$selected;
            padding-right:0px;

            &:after{
                @include arrow;
                background-color:$selected;
            }

            &:hover{
                background-color: darken($selected, 10%);

                &:after{
                    background-color: darken($selected, 10%);
                }
            }
        }

        &_add{
            @include memoListItem;
            text-align:center;
            z-index:2;
            background-color:$selected;

            &:after{
                @include arrow;
                background-color:$selected;
            }

            &:hover{
                background-color: darken($selected, 10%);

                &:after{
                    background-color: darken($selected, 10%);
                }
            }
        }
    }
    &__memotitle{
        line-height:24px;
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
            max-width: 50%;
            word-wrap: break-word;
        }
    }
    &__buttons{
        padding: 0px 20px;
    }
}

.btn{
    margin-right:10px;
}
</style>
