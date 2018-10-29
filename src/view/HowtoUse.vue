<template>
    <div id ="howtouse">
        <div class='heading' v-html="$t('howtouse.message1')"></div>
        <div v-html="$t('howtouse.message2')"></div>
        <div v-html="$t('howtouse.message3')"></div>
        <div v-html="$t('howtouse.message4')"></div>
        <div class='section_end' v-html="$t('howtouse.message5')"></div>
        <div class='heading' v-html="$t('howtouse.message6')"></div>

        <div class='explain section_end'>
            <div class='explain_button'>
                <div>
                    <div class='memo_selected'>無題のカモ</div>
                    <div v-html="$t('howtouse.message7')"></div>
                </div>

                <div>
                    <div class='memo'>無題のカモ</div>
                    <div v-html="$t('howtouse.message8')"></div>
                </div>

                <div>
                    <div class='memo_add'>
                        <v-icon class='fas fa-plus-circle white--text circle'></v-icon>
                    </div>
                    <div v-html="$t('howtouse.message9')"></div>
                </div>
            </div>

            <div class='explain_button'>
                <div>
                    <v-btn fab class='blue lighten-1'>
                        <v-icon class='far fa-save white--text'></v-icon>
                    </v-btn>
                    <div v-html="$t('howtouse.message10')"></div>
                </div>

                <div>
                    <v-btn fab class='brown darken-4'>
                        <v-icon class='far fa-trash-alt white--text'></v-icon>
                    </v-btn>
                    <div v-html="$t('howtouse.message11')"></div>
                </div>

                <div>
                    <v-icon class='fas fa-chevron-left btn' @click='logout'></v-icon>
                    <div v-html="$t('howtouse.message12')"></div>
                </div>
            </div>
        </div>
        <div v-html="$t('howtouse.message13')"></div>
        <v-btn class='back' @click='goBack'>{{ $t('back') }}</v-btn>
    </div>
</template>

<script>
import router from '@/router';

export default {
    name: 'howtouse',
    methods:{
        goBack(){
            router.go(-1);
        }
    }
}
</script>
<style lang="scss" scoped>
@mixin memoListItem {
    width:240px;
    padding:10px;
    margin:0 auto;
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
@mixin buttonexplain {
    display:grid;
    height:100%;
    flex-basis: 20%;
    align-content: space-between;
}
@mixin hoverd ($color: $selected, $darkness: 10%) {
    background-color: darken($selected, $darkness);
}

.heading {
    margin-bottom: 20px;
}
.section_end {
    margin-bottom: 40px;
}

$selected: #FBC02D;
$hover:#FFF176;
.memo{
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

        &_selected{
            @include memoListItem;
            text-align:left;
            z-index:2;
            background-color:$selected;
            padding-right:0px;

            &:after{
                @include arrow;
                background-color:$selected;
            }

            &:hover{
                @include hoverd();

                &:after{
                    @include hoverd();
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
                @include hoverd();

                &:after{
                    @include hoverd();
                }
            }
        }
    }
.back{
    margin-top:20px;
}
.btn{
    background-color:$selected;
    width:30px;
    height:50px;
    cursor: pointer;
}
.circle{
    width:23px;
    height:23px;
}
.explain{
    height:260px;
    display: flex;
    justify-content: center;
    $height: 100%;
    $display: grid;

    &_button{
        @include buttonexplain
    }
}
</style>
