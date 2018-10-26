<template>
    <div id ="read">
        <p>
            特に制限はありません。<br>
            <a href="https://twitter.com/camomile_cafe" target='_blank'>製作者</a>のfirebaseに制限がかからない限り、ご自由に使用してください。
        </p>
        <p>
            なお、本サービスは予告なしに終了する場合がございます。<br>
            予め、ご了承お願いいたします
        </p>
        <v-btn @click='goBack'>戻る</v-btn>
    </div>
</template>

<script>
import router from '@/router';

export default {
    name: 'read',
    methods:{
        goBack(){
            router.go(-1);
        }
    }
}
</script>
<style lang="scss" scoped>
</style>
