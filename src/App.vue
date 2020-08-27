<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import $ from "jquery";
import WebUploader from "webuploader";

// (function(doc, win) {
//   var docEl = doc.documentElement,
//     resizeEvt = "orientationchange" in window ? "orientationchange" : "resize",
//     recalc = function() {
//       var clientWidth = docEl.clientWidth;
//       if (!clientWidth) return;
//       if (clientWidth >= 640) {
//         docEl.style.fontSize = "100px";
//       } else {
//         docEl.style.fontSize = 100 * (clientWidth / 640) + "px";
//       }
//     };
//   if (!doc.addEventListener) return;
//   win.addEventListener(resizeEvt, recalc, false);
//   doc.addEventListener("DOMContentLoaded", recalc, false);
// })(document, window);

export default {
  name: "App"
};
</script>

<style>
@import "//fonts.useso.com/css?family=Roboto:300,400,500,700,400italic";
@import "http://cdn.bootcss.com/material-design-icons/3.0.1/iconfont/material-icons.css";
#app {
}
</style>
