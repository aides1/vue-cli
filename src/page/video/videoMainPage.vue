<template>
  <div style="height: 100%">
    <div style="height: 30%;width:100%; ">
      <video-player
        class="video-player vjs-custom-skin"
        ref="videoPlayer"
        :playsinline="true"
        :options="playerOptions"
      ></video-player>
    </div>

    <div
      style="height: 68%;overflow-y: auto;position: absolute;white-space: nowrap;width: 95%;margin-left: 2.5%;
  "
    >
      <div
        class="movieItem"
        v-for="(item, index) in movieList"
        :class="{ selectMovie: oIndex === index }"
        @click="clickMovie(index, item.M3U8_URL)"
      >
        <div style="vertical-align:middle;text-align: center;">
          <span style="line-height: 40px" class="sapnclass">{{
            item.ORIGINAL_FILENAME
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMovieList } from "@/api/ax.js";

export default {
  props: {},
  data() {
    return {
      oIndex: 0,
      movieList: [],
      movieSrc: "http://47.94.236.224:8082/file/output/a.m3u8",
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "application/x-mpegURL", //这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
            // src: require("@/page/qf.mp4") //url地址
            // src: "http://cctvalih5ca.v.myalicdn.com/live/cctv1_2/index.m3u8" //url地址
            // src: "http://47.94.236.224:8082/file/output/a.m3u8" //url地址
            src: "" //url地址
            // src: "qf.mp4" //url地址
          }
        ],
        hls: true,
        poster: "", //你的封面地址
        // width: document.documentElement.clientWidth, //播放器宽度
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true //全屏按钮
        }
      }
    };
  },

  computed: {
    player() {
      return this.$ref.videoPlayer.player;
    }
  },
  created() {
    // this.movieSrc = "http://47.94.236.224:8089/file/output/a.m3u8";
    //         ?url=http://47.94.236.224:8089/file/output/a.m3u8
    // this.movieSrc = this.$route.query.url;
    // this.playerOptions["sources"][0]["src"] = this.movieSrc;
    this.getMovieList();
  },
  mounted() {},
  watch: {},
  methods: {
    clickMovie(index, url) {
      this.movieSrc = url;
      this.playerOptions["sources"][0]["src"] = this.movieSrc;
      this.oIndex = index;
    },
    getMovieList() {
      let _this = this;
      let postParam = {};
      getMovieList(postParam).then(res => {
        if (res.code === 200) {
          if (res.data.length > 0) {
            _this.movieList = res.data;
            _this.movieSrc = res.data[0].M3U8_URL;
            _this.playerOptions["sources"][0]["src"] = this.movieSrc;
          } else {
            _this.movieSrc = "";
          }
        } else if (res.state === 500) {
        } else {
        }
      });
    }
  },
  components: {}
};
</script>

<style scoped>
.video-js .vjs-icon-placeholder {
  width: 100%;
  height: 100%;
  display: block;
}

.movieItem {
  margin-top: 2.5%;
  /*display: table;*/
  min-height: 40px;
  border-radius: 3px;
  border: 1px solid #000;
}

.sapnclass {
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;

  width: 90%;
  margin-left: 5%;
}

.selectMovie {
  color: red;
  border: 1px solid red;
}

::-webkit-scrollbar {
  width: 0;
}
</style>
