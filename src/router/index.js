import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "HomeView",
    component: HomeView,
  },
  {
    path: "/notes",
    name: "NotesView",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/NotesView.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
