import Vue from 'vue';
import VueRouter from 'vue-router';
import Top from "@/view/Top.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "top",
    component: Top
  },
];

const router = new VueRouter({
    routes,
    mode: 'history'
});

export default router;
