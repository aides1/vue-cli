import Vue from "vue";
import Router from "vue-router";
import Page from "@/page/page";
import play from "@/page/play";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/Page",
      name: "Page",
      component: Page
    },
    {
      path: "/play",
      name: "play",
      component: play
    }
  ]
});
