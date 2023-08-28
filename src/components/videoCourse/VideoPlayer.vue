<template>
  <div>
    <a :href="currentVideo.link">
      <video
        id="my-video"
        ref="videoPlayer"
        class="video-js vjs-default-skin"
        muted
        preload="auto"
        :poster="currentVideo.poster"
      >
        <source :src="currentVideo.src" type="video/mp4" />
      </video>
    </a>

    <p>Current Playback Time: {{ formattedPlaybackTime }}</p>
  </div>
</template>

<script lang="ts">
// 引入videojs以及樣式文件
import videojs from "video.js/dist/video.min";
import "video.js/dist/video-js.min.css";
import { onMounted, ref, computed } from "vue";

export default {
  setup() {
    const currentPlaybackTime = ref(0); // 初始播放時間為 0 秒
    // 在onMounted階段進行初始化
    onMounted(() => {
      initVideoSourc();
    });

    const currentVideo = ref({
      title: "影片 1",
      poster: "src/assets/videoImg/2020-01-22.png",
      src: "src/assets/video/test.mp4",
      link: "http://localhost:5173/videoClassPage", // 从数据库获取链接
    });

    function initVideoSourc() {
      var myPlayer = videojs("my-video", {
        bigPlayButton: true,
        textTrackDisplay: false,
        posterImage: true,
        errorDisplay: false,
        height: 200,
        width: 400,
        playbackRates: [0.75, 1, 1.25, 1.5, 2],
        controls: true,
        autoplay: false,
      });
      //播放時長(秒)
      var totalTime = 0;
      //監聽播放進度
      myPlayer.on("timeupdate", function () {
        //當前播放時長(秒)
        var currentTime = Math.floor(myPlayer.currentTime());
        if (currentTime > 0 && currentTime > totalTime && currentTime % 1 == 0)
          //每隔1秒，向伺服器提交播放時間(秒)
          totalTime = currentTime;
      });

      // myPlayer.on("timeupdate", function () {
      //   var currentTime = Math.floor(myPlayer.currentTime());
      //   currentPlaybackTime.value = currentTime;
      // });
    }

    const formattedPlaybackTime = computed(() => {
      return formatTime(currentPlaybackTime.value);
    });

    function formatTime(seconds) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;
      return `${padNumber(hours)}:${padNumber(minutes)}:${padNumber(
        remainingSeconds
      )}`;
    }

    function padNumber(number) {
      return number.toString().padStart(2, "0");
    }

    return {
      formattedPlaybackTime,
      currentVideo,
    };
  },
};
</script>
