<template>
  <div>
    <router-view />

    <div class="bottomdiv">
      <mu-bottom-nav>
        <mu-bottom-nav-item
          :ripple="false"
          title="video"
          to="/index/videoMainPage"
          icon="movie"
        ></mu-bottom-nav-item>

        <mu-bottom-nav-item
          :ripple="false"
          title="chat"
          icon="message"
          to="/index/chatMainPage"
        ></mu-bottom-nav-item>

        <mu-bottom-nav-item
          title="novel"
          :ripple="false"
          icon="import_contacts"
          to="/index/novelMainPage"
        ></mu-bottom-nav-item>

        <mu-bottom-nav-item
          title="me"
          :ripple="false"
          icon="account_circle"
          to="/index/meMainPage"
        ></mu-bottom-nav-item>
      </mu-bottom-nav>
    </div>
  </div>
</template>

<script>
export default {
  name: "",

  props: {},
  data() {
    return {
      uploader: [],
      extname: "",

      username: "",
      password: ""
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    toPage(path) {
      alert(123456);
      this.$router.replace(path);
    }
  },
  components: {}
};
</script>

<style scoped>
.bottomdiv {
  width: 100%;
  bottom: 0;
  position: fixed;
}
</style>
