<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import $ from "jquery";
import WebUploader from "webuploader";

export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
