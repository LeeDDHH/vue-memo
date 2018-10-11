import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './components/Home.vue';
import Editor from './components/Editor.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: {
            default: Home,
            editor: Editor
        }
    },
];

const router = new VueRouter({
    routes,
    mode: 'history'
});

export default router;
