import Vue from "vue";
import Router from "vue-router";
import Page from "@/page/page";
import play from "@/page/play";
import login from "@/page/user/login";
import index from "@/page/index";

import videoMainPage from "@/page/video/videoMainPage";
import chatMainPage from "@/page/chat/chatMainPage";
import novelMainPage from "@/page/novel/novelMainPage";
import meMainPage from "@/page/me/meMainPage";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "login",
      component: login,
      meta: { title: "登入", noCache: true }
    },
    {
      path: "/index",
      name: "index",
      component: index,
      meta: { title: "首页", noCache: true },
      children: [
        {
          path: "videoMainPage", //以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;在生成路由时，主路由上的path会被自动添加到子路由之前，所以子路由上的path不用在重新声明主路由上的path了。
          name: "videoMainPage",
          component: videoMainPage,
          meta: { title: "视频", noCache: true }
        },
        {
          path: "chatMainPage", //以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;在生成路由时，主路由上的path会被自动添加到子路由之前，所以子路由上的path不用在重新声明主路由上的path了。
          name: "chatMainPage",
          component: chatMainPage,
          meta: { title: "聊天", noCache: true }
        },
        {
          path: "novelMainPage", //以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;在生成路由时，主路由上的path会被自动添加到子路由之前，所以子路由上的path不用在重新声明主路由上的path了。
          name: "novelMainPage",
          component: novelMainPage,
          meta: { title: "小说", noCache: true }
        },
        {
          path: "meMainPage", //以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;在生成路由时，主路由上的path会被自动添加到子路由之前，所以子路由上的path不用在重新声明主路由上的path了。
          name: "meMainPage",
          component: meMainPage,
          meta: { title: "我的信息", noCache: true }
        }
      ]
    },
    {
      path: "/Page",
      name: "Page",
      component: Page,
      meta: { title: "上传文件", noCache: true }
    },
    {
      path: "/play",
      name: "play",
      component: play,
      meta: { title: "播放视频", noCache: true }
    }
  ]
});
