<template>
    <div id ="read">
        <div v-html="$t('term.message')"></div>
        <v-btn @click='goBack'>{{ $t('back') }}</v-btn>
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
