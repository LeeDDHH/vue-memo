import Vue from 'vue';
import VueRouter from 'vue-router';
import Top from "@/view/Top.vue";
import Read from "@/view/Read.vue";
import HowtoUse from "@/view/HowtoUse.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "top",
    component: Top
  },
  {
    path: "/read",
    name: "read",
    component: Read
  },
  {
    path: "/howtouse",
    name: "howtouse",
    component: HowtoUse
  },
];

const router = new VueRouter({
    routes,
    mode: 'history'
});

export default router;
