<template>
  <div id="app">
    <div id="uploader" class="wu-example">
      <!--用来存放文件信息-->
      <div id="fileLilst" class="uploader-list"></div>
      <div class="btns">
        <!-- 选择文件的按钮 -->
        <div id="picker">选择文件</div>
        <!-- 开始上传按钮 -->
        <button id="uploadBtn" class="btn btn-default" @click="fileUpload">
          开始上传
        </button>

        <input type="hidden" id="fileStatus" value="wait" />
      </div>
    </div>

    <div id="fileList"></div>
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
      extname: ""
    };
  },
  computed: {},
  created() {},
  mounted() {
    let _this = this;
    var mydate = new Date();
    //唯一ID
    var uuid =
      "lcl" +
      mydate.getDay() +
      mydate.getHours() +
      mydate.getMinutes() +
      mydate.getSeconds() +
      mydate.getMilliseconds() +
      Math.round(Math.random() * 10000);

    this.uploader = WebUploader.create({
      // swf文件路径
      swf: "../static/webuploader-0.1.5/Uploader.swf",
      // 文件接收服务端。
      // server: "/v1/upLoadFile",
      // server: "http://47.94.236.224:8082/app-api/upLoadFile",
      server: "http://127.0.0.1:8003/upLoadFile",
      // 选择文件的按钮。可选。
      // 内部根据当前运行是创建，可能是input元素，也可能是flash.
      pick: "#picker",
      // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
      resize: false,
      //是否开启自动上传
      auto: false,
      chunked: true,
      //如果要分片，分多大一片？ 默认大小为5M [可选]
      chunkSize: 3242880,
      //如果某个分片由于网络问题出错，允许自动重传多少次[可选] [默认值：2]
      chunkRetry: 5,
      // 上传并发数。允许同时最大上传进程数 [可选] [默认值：3]
      threads: 50,
      formData: { uuid: uuid },
      //设置文件上传域的name 对于SpringMVC来说也就是后台接受文件的参数名称 [可选] [默认值：'file']
      //fileVal:{}
      //文件上传方式，POST或者GET [可选] [默认值：'POST']
      method: "POST",
      // fileNumLimit: 2,
      //验证文件总大小是否超出限制, 超出则不允许加入队列 {int} [可选] [默认值：undefined]
      fileSizeLimit: 20971520000000,
      //验证单个文件大小是否超出限制, 超出则不允许加入队列
      fileSingleSizeLimit: 5242880000000
    });

    _this.uploader.on("beforeFileQueued", function(file) {
      console.log("文件加入队前", file);
    });

    // 当有文件被添加进队列的时候
    _this.uploader.on("fileQueued", function(file) {
      console.log("文件加入队列后");
      // 添加到页面
      var $list = $("#fileList");
      $list.append(
        '<div id="' +
          file.id +
          '" class="item">' +
          '<h4 class="info">' +
          file.name +
          "</h4>" +
          '<p class="state">等待上传...</p>' +
          "</div>"
      );

      // 得到文件拓展名进行判断
      this.extname = file.name.substring(
        file.name.indexOf(".") + 1,
        file.name.length
      );
      console.log(this.extname);

      // 判断文件类型
      let type = this.extname;
      console.log("fileupload:" + type);
      if (
        !(
          type === "avi" ||
          type === "mpg" ||
          type === "wmv" ||
          type === "3gp" ||
          type === "mov" ||
          type === "mp4" ||
          type === "asf" ||
          type === "asx" ||
          type === "flv"
        )
      ) {
        alert("请选择视频格式的文件");
        $("#fileList").html("");
        _this.uploader.reset();
      }
    });

    // 文件上传过程中创建进度条实时显示。
    _this.uploader.on("uploadProgress", function(file, percentage) {
      console.log("文件上传中", file, percentage);
      var $li = $("#" + file.id),
        $percent = $li.find(".progress .progress-bar");
      // 避免重复创建
      if (!$percent.length) {
        $percent = $(
          '<div class="progress progress-striped active">' +
            '<div class="progress-bar" role="progressbar" style="width: 0%">' +
            "</div>" +
            "</div>"
        )
          .appendTo($li)
          .find(".progress-bar");
      }
      $li.find("p.state").text("上传中");
      $percent.css("width", percentage * 100 + "%"); //根据上传进度改变进度条宽度
    });

    _this.uploader.on("uploadSuccess", function(file, response) {
      console.log("文件上传成功", file, response);
      $("#" + file.id)
        .find("p.state")
        .text("已上传");
    });

    _this.uploader.on("uploadError", function(file, reason) {
      console.log(reason);
      console.log("文件上传失败", file, reason);
      $("#" + file.id)
        .find("p.state")
        .text("上传出错");
    });

    _this.uploader.on("uploadComplete", function(file) {
      console.log("文件上传完成");
      $("#" + file.id)
        .find(".progress")
        .fadeOut();
    });
  },
  watch: {},
  methods: {
    //文件上传方法
    fileUpload() {
      let _this = this;
      var fileStatus = $("#fileStatus").val();
      console.log(_this.uploader.getFiles());

      _this.uploader.removeFile("WU_FILE_1", true);
      console.log(_this.uploader.getFiles());

      if (fileStatus == "wait") {
        // alert(_this.uploader.getFiles().length);
        _this.uploader.upload();
        $("#ctlBtn").html("暂停上传");
        $("#fileStatus").val("stop");
      }
      if (fileStatus == "stop") {
        _this.uploader.stop(true);
        $("#ctlBtn").html("继续上传");
        $("#fileStatus").val("continue");
      }

      if (fileStatus == "continue") {
        _this.uploader.upload();
        $("#ctlBtn").html("暂停上传");
        $("#fileStatus").val("stop");
      }
    },
    //重置文件上传
    fileReset() {
      $("#listImg").html("");
      uploader.reset();
      //查看队列中的文件数量
      //alert(uploader.getFiles().length);
    }
  },
  components: {}
};
</script>

<style scoped></style>
