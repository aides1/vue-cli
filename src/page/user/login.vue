<template>
  <div>
    <div class="logodiv"><img src="@/assets/logo.png" class="logo" /></div>

    <mu-container class="inputdiv">
      <mu-text-field
        v-model="username"
        class="inputitem"
        label="UserName"
        label-float
        help-text="用户名为6-12长度的字符"
        icon="account_circle"
      ></mu-text-field
      ><br />
      <mu-text-field
        class="inputitem"
        v-model="password"
        label="Password"
        label-float
        error-text="请输入密码"
        icon="locked"
      ></mu-text-field
      ><br />
    </mu-container>

    <div class="btndiv">
      <mu-container class="button-wrapper" style="width: 90%">
        <mu-flex justify-content="center" align-items="center" class="loginbtn">
          <mu-button full-width color="primary">登入</mu-button>
        </mu-flex>

        <mu-flex justify-content="center" align-items="center" class="loginbtn">
          <mu-button full-width color="primary">注册</mu-button>
        </mu-flex>
      </mu-container>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import WebUploader from "webuploader";

export default {
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
  methods: {},
  components: {}
};
</script>

<style scoped>
.logo {
  width: 30%;
}
.logodiv {
  width: 100%;
  text-align: center;
  margin-top: 25%;
}

.inputdiv {
  width: 100%;
  text-align: center;
  margin-top: 0.267rem;
}
.inputitem {
  width: 90%;
}

.btndiv {
  margin-top: 0.667rem;
  width: 100%;
  text-align: center;
}

.loginbtn {
  margin-top: 0.267rem;
}
</style>
