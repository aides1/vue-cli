// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";

// vant   官网挂了
// import Vant from "vant";
// import "vant/lib/index.css";

//使用 muse-ui
import MuseUI from "muse-ui";
import "muse-ui/dist/muse-ui.css";

Vue.use(MuseUI);

//自适应
import "lib-flexible/flexible.js";

// 视频播放插件
import VideoPlayer from "vue-video-player";
require("video.js/dist/video-js.css");
require("vue-video-player/src/custom-theme.css");
Vue.use(VideoPlayer);
// 支持m3u8
import "videojs-contrib-hls";

const hls = require("videojs-contrib-hls");
Vue.use(hls);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
