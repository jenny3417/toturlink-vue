<template>
  <div class="container">
    <div style="width: 100vw; background: #011627; height: 40px">
      <button class="icon-button">
        <img src="@/assets/icon/back.png" alt="back" />
      </button>
    </div>
    <div class="video-page">
      <video
        ref="videoPlayer"
        class="video-js vjs-default-skin"
        muted
        preload="auto"
      >
        <source :src="currentVideo.src" type="video/mp4" />
      </video>
      <div class="playlist">
        <ul>
          <li
            v-for="(video, index) in videoList"
            :key="index"
            :class="getPlaylistItemClasses(index)"
            @click="changeVideo(index)"
          >
            <span v-if="video.watched" class="watched-icon">✔</span>
            {{ video.title }}
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="buttons">
    <button
      class="btn btn-outline-secondary btn-lg"
      @click="displayedComponent = 'search'"
    >
      搜尋
    </button>
    <button
      class="btn btn-outline-secondary btn-lg"
      @click="displayedComponent = 'qna'"
    >
      問與答
    </button>
    <button
      class="btn btn-outline-secondary btn-lg"
      @click="displayedComponent = 'notes'"
    >
      筆記
    </button>
    <button
      class="btn btn-outline-secondary btn-lg"
      @click="displayedComponent = 'post'"
    >
      公告
    </button>
  </div>
  <div v-if="displayedComponent === 'search'">
    <div class="videoBut">
      <input
        type="search"
        v-model="searchTitleKeyword"
        placeholder="搜尋課程內容"
      />
      <button type="submit" class="btn btn-dark">搜尋</button>
      <ul>
        <li v-for="video in filteredVideoList" :key="video.title">
          {{ video.title }}
        </li>
      </ul>
    </div>
  </div>
  <div v-if="displayedComponent === 'qna'">
    <div class="videoBut">
      <input
        type="search"
        v-model="searchQnAKeyword"
        placeholder="搜尋課程問答"
      />
      <button type="submit" class="btn btn-dark">搜尋</button>
      <ul>
        <li v-for="video in filteredVideoList" :key="video.title">
          {{ video.title }}
        </li>
      </ul>
    </div>
  </div>
  <div v-if="displayedComponent === 'notes'">
    <div class="videoBut">
      <p>在{{ formattedPlaybackTime }}建立新筆記</p>
      <input type="text" placeholder="建立新筆記" />
      <button type="submit" class="btn btn-dark">新增</button>
      <ul>
        <li v-for="video in filteredVideoList" :key="video.title">
          {{ video.title }}
        </li>
      </ul>
    </div>
  </div>
  <div v-if="displayedComponent === 'post'">
    <div class="videoBut">
      <h3>Lorem ipsum dolor sit amet.</h3>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse, debitis!
      </p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import videojs from "video.js/dist/video.min";
import "video.js/dist/video-js.min.css";

export default {
  setup() {
    const videoList = ref([
      {
        title: "影片 1",
        src: "src/assets/video/test.mp4",

        watched: false,
      },
      {
        title: "影片 2",
        src: "src/assets/video/test2.mp4",
        watched: false,
      },
      {
        title: "影片 3",
        src: "src/assets/video/test3.mp4",
        watched: false,
      },
    ]);

    const videoPlayer = ref(null);
    const currentVideoIndex = ref(0);
    const displayedComponent = ref("search");
    // const searchKeyword = ref("");

    const currentPlaybackTime = ref(0);

    onMounted(() => {
      initVideoSource();
    });

    function initVideoSource() {
      const options = {
        bigPlayButton: true,
        textTrackDisplay: false,
        posterImage: true,
        errorDisplay: false,
        height: 500,
        width: 900,
        playbackRates: [0.75, 1, 1.25, 1.5, 2],
        controls: true,
        autoplay: false,
      };

      const player = videojs(videoPlayer.value, options);
      player.src(currentVideo.value.src); // 設定影片 src
      player.on("ended", () => {
        currentVideo.value.watched = true;
      });

      player.on("timeupdate", function () {
        var currentTime = Math.floor(player.currentTime());
        currentPlaybackTime.value = currentTime;
      });
    }

    const currentVideo = ref(videoList.value[currentVideoIndex.value]);

    const changeVideo = (index) => {
      currentVideoIndex.value = index;
      currentVideo.value = videoList.value[currentVideoIndex.value];
      initVideoSource();
    };

    const getPlaylistItemClasses = (index) => {
      return {
        "playlist-item": true,
        active: index === currentVideoIndex.value,
        disabled: index === currentVideoIndex.value,
      };
    };

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
      videoList,
      changeVideo,
      currentVideo,
      videoPlayer,
      getPlaylistItemClasses,
      displayedComponent,
      // filteredVideoList,
      formattedPlaybackTime,
    };
  },
};
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
}
body {
  margin: 0;
}
.container {
  width: 100vw;
  display: flex;
  margin: 0;
  flex-direction: column;
}
.video-page {
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.playlist {
  flex: 1;
  width: auto;
  border-left: 1px solid #ccc;
  /* padding-left: 20px; */
}

.playlist ul {
  list-style: none;
}

.playlist li {
  cursor: pointer;
}
.watched-icon {
  margin-left: 5px;
  color: black;
}

li {
  background-color: white;
  color: black;
  cursor: pointer;
  padding: 10px;

  transition: background-color 0.1s, color 0.1s;
}

.playlist-item.active {
  background-color: lightgray;
  color: black;
  cursor: not-allowed;
}

.playlist-item:hover {
  background-color: lightgray;
  color: black;
}

.playlist-item.disabled {
  pointer-events: none; /* 使元素不可點擊 */
  opacity: 0.8;
}
.btn {
  padding: 5px 20px;
  border: 0;
  border-radius: 0;
}

.videoBut {
  margin: 20px;
  padding-bottom: 50px;
}

.icon-button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: inline-block;
  margin: 5px; /* 可以根据需要调整按钮的外边距 */
}
</style>
