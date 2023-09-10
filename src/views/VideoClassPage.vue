<template>
  <!-- <navbar></navbar> -->
  <div class="container">
    <div style="display: flex; width: 100vw; background: #011627; height: 50px">
      <button class="icon-button" style="margin: 0 20px" @click="goBack">
        <img src="@/assets/icon/back.png" alt="back" />
      </button>
      <span
        style="
          display: flex;
          align-items: center;
          flex: 1;
          color: white;
          font-size: larger;
        "
        >課程名稱</span
      >
    </div>
    <div class="video-page">
      <div class="video-container" style="width: 75%">
        <video
          ref="videoPlayer"
          class="video-js vjs-default-skin"
          muted
          preload="auto"
          style="width: 100%"
        >
          <!-- <source :src="currentVideo.courseUrl" type="video/mp4" /> -->
        </video>
        <div class="buttons">
          <button
            :class="[
              'btn',
              'btn-outline-secondary',
              'btn-md',
              { active: displayedComponent === 'search' },
            ]"
            @click="displayedComponent = 'search'"
          >
            搜尋
          </button>
          <button
            :class="[
              'btn',
              'btn-outline-secondary',
              'btn-md',
              { active: displayedComponent === 'qna' },
            ]"
            @click="displayedComponent = 'qna'"
          >
            問與答
          </button>
          <button
            :class="[
              'btn',
              'btn-outline-secondary',
              'btn-md',
              { active: displayedComponent === 'notes' },
            ]"
            @click="displayedComponent = 'notes'"
          >
            筆記
          </button>
          <button
            :class="[
              'btn',
              'btn-outline-secondary',
              'btn-md',
              { active: displayedComponent === 'post' },
            ]"
            @click="displayedComponent = 'post'"
          >
            公告
          </button>
        </div>
        <component :is="displayedComponent"></component>
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
          <div class="videoBut" style="padding-bottom: 0">
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
          <div
            style="
              display: flex;
              flex-direction: column;
              margin: auto;
              margin-bottom: 10px;
              width: 70%;
            "
          >
            <h2>此課程的所有問題({{ QAList.length }})</h2>
            <ul>
              <li v-for="(qaItem, index) in QAList" :key="index">
                <h5>{{ qaItem.title }}</h5>
                <p>{{ qaItem.question }}</p>
                <p>{{ formatDate(qaItem.time) }}</p>
              </li>
            </ul>
          </div>
          <div
            class="addQA"
            style="
              display: flex;
              flex-direction: column;
              margin: auto;
              margin-bottom: 100px;
              width: 70%;
            "
          >
            <h5 style="font-weight: bolder; margin-bottom: 5px">新增問答</h5>
            <h6>標題</h6>
            <input type="text" v-model="courseQAData.title" />
            <br />
            <h6>詳細內容</h6>
            <input type="text" v-model="courseQAData.question" />
            <br />
            <button
              class="btn btn-dark"
              style="height: 40px"
              @click="addQuestion"
            >
              發佈
            </button>
          </div>
        </div>
        <div v-if="displayedComponent === 'notes'">
          <div class="videoBut" style="padding-bottom: 0">
            <button class="timebut">{{ formattedPlaybackTime }}</button>
            <input
              type="text"
              placeholder="建立新筆記"
              v-model="noteData.noteContent"
            />
            <button class="btn btn-dark" @click="addNote">儲存筆記</button>
          </div>
          <div
            style="
              display: flex;
              flex-direction: column;
              margin: auto;
              margin-bottom: 100px;
              width: 70%;
            "
          >
            <h2>此課程的所有筆記({{ noteList.length }})</h2>
            <ul>
              <li v-for="(noteItem, index) in noteList" :key="index">
                <button class="timebut">
                  {{ formatTime(noteItem.timeLine) }}
                </button>
                <p>{{ noteItem.noteContent }}</p>
              </li>
            </ul>
          </div>
        </div>
        <div v-if="displayedComponent === 'post'">
          <div class="videoBut">
            <h3>Lorem ipsum dolor sit amet.</h3>

            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse,
              debitis!
            </p>
          </div>
        </div>
      </div>
      <div class="playlist">
        <ul>
          <li style="cursor: default">課程內容</li>
          <li
            v-for="(video, index) in videoList"
            :key="index"
            :class="getPlaylistItemClasses(index)"
            @click="changeVideo(index)"
            style="border: none"
          >
            <!-- <span v-if="videoList.watched" class="watched-icon">✔</span> -->
            {{ video.chapterName }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import videojs from "video.js/dist/video.min";
import "video.js/dist/video-js.min.css";
import Navbar from "@/components/public/Navbar.vue";
import { useRoute, useRouter } from "vue-router";
import tutorlink from "@/api/tutorlink.js";

const route = useRoute();
const lessonDetailIdData = ref(route.query.lessonDetail);

// const videoList = ref([
//   {
//     title: "影片 1",
//     src: "../src/assets/video/test.mp4",
//     watched: false,
//   },
//   {
//     title: "影片 2",
//     src: "../src/assets/video/test2.mp4",
//     watched: false,
//   },
//   {
//     title: "影片 3",
//     src: "../src/assets/video/test3.mp4",
//     watched: false,
//   },
// ]);
const videoList = ref([]);

const currentDate = new Date();
const videoPlayer = ref(null);
const currentVideoIndex = ref(0);
const displayedComponent = ref("search");
// const searchKeyword = ref("");
const courseQAData = ref({
  title: "",
  question: "",
  time: currentDate,
});

const QAList = ref([]);

const currentPlaybackTime = ref(0);
const formattedPlaybackTime = computed(() => {
  return formatTime(currentPlaybackTime.value);
});

const noteData = ref({
  timeLine: currentPlaybackTime.value,
  noteContent: "",
});
const noteList = ref([]);

onMounted(async () => {
  await getCourseVideos(); // 等待视频列表加载完成
  await getCourseQA(); // 等待课程问答加载完成
  await getVideoNote(); // 等待视频笔记加载完成
  await getCoursePost(); // 等待课程公告加载完成

  // 初始化视频播放器
  initVideoSource();
});

function initVideoSource() {
  const options = {
    bigPlayButton: true,
    textTrackDisplay: false,
    posterImage: true,
    errorDisplay: false,
    height: 700,
    width: 1000,
    playbackRates: [0.75, 1, 1.25, 1.5, 2],
    controls: true,
    autoplay: false,
  };

  const player = videojs(videoPlayer.value, options);
  player.src(currentVideo.courseUrl); // 設定影片 src
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
  console.log("影片id:", currentVideo.value.videoId);
  getVideoNote();
  // initVideoSource();
};

const getPlaylistItemClasses = (index) => {
  return {
    "playlist-item": true,
    active: index === currentVideoIndex.value,
    disabled: index === currentVideoIndex.value,
  };
};

// 取得課程影片
const getCourseVideos = async () => {
  try {
    const response = await tutorlink.get(
      // `/findVideoByCourse/${lessonDetailIdData.value}`
      `/findVideoByCourse/1`
    );
    console.log("影片列表:", response.data);
    videoList.value = response.data;
    console.log(videoList.value[0].chapterName);
  } catch (error) {
    console.error("獲取影片時出錯", error);
  }
};
getCourseVideos();

//取得課程問答
const getCourseQA = async () => {
  try {
    const response = await tutorlink.get(
      // `/courseQA/${lessonDetailIdData.value}`
      `/courseQA/1`
    );
    console.log("QA列表:", response.data);
    QAList.value = response.data;
  } catch (error) {
    console.error("獲取QA時錯誤", error);
  }
};
getCourseQA();
const formatDate = (time) => {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

//新增課程問答
const addQuestion = async () => {
  try {
    console.log(JSON.stringify(courseQAData.value));
    const response = await tutorlink.post(
      // `/courseQA/${lessonDetailIdData.value}`,
      "/courseQA/1",
      JSON.stringify(courseQAData.value),
      { headers: { "Content-Type": "application/json;charset=UTF-8" } }
    );
    console.log("問題新增成功", response.data);
  } catch (error) {
    console.error("新增問答錯誤", error);
  }
};

//取得影片筆記
const getVideoNote = async () => {
  try {
    const response = await tutorlink.get(
      `/videoNote/${currentVideo.value.videoId}`
    );
    console.log("筆記列表:", response.data);
    noteList.value = response.data;
  } catch (error) {
    console.error("獲取筆記時錯誤", error);
  }
};
getVideoNote();

//新增筆記
const addNote = async () => {
  try {
    const videoId = currentVideo.value.videoId;
    console.log(videoId);
    const response = await tutorlink.post(
      `/videoNote/${videoId}`,
      JSON.stringify(noteData.value),
      { headers: { "Content-Type": "application/json;charset=UTF-8" } }
    );
    console.log("筆記新增成功", response.data);
    getVideoNote();
  } catch (error) {
    console.error("新增筆記錯誤", error);
  }
};
//取得課程公告
const getCoursePost = async () => {
  try {
    const response = await tutorlink.get(
      // `/coursePostByCourse/{lessonDetailIdData.value}`
      `/coursePostByCourse/1`
    );
    console.log("公告列表:", response.data);
    postList.value = response.data;
  } catch (error) {
    console.error("獲取公告時錯誤", error);
  }
};
getCoursePost();

function formatTime(seconds) {
  // const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${padNumber(minutes)}:${padNumber(remainingSeconds)}`;
}

function padNumber(number) {
  return number.toString().padStart(2, "0");
}

const goBack = () => {
  history.back();
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
.timebut {
  border-radius: 15px;
  border: none;
  margin-right: 5px;
  background-color: #011627;
  color: white;
  padding: 5px;
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
  pointer-events: none;
  /* 使元素不可點擊 */
  opacity: 0.8;
}

.btn {
  padding: 10px 0;
  margin: 0 20px;
  border: 0;
  border-radius: 0;
  box-sizing: border-box;
  height: 46px;
}

.videoBut {
  margin: 20px;
  padding-bottom: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.videoBut input {
  width: 40%;
  height: 50px;
  padding: 20px;
}
.addQA input {
  width: 100%;
  height: 40px;
  padding: 10px;
}

.videoBut button {
  height: 50px;
}

.icon-button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: inline-block;
  margin: 5px;
  /* 可以根据需要调整按钮的外边距 */
}

.btn-outline-secondary:hover {
  color: #011627;
  background: none;
}

.active {
  /* 下框线样式 */
  background: none;
  color: #011627;
  font-weight: bolder;
  border-bottom: 1px solid #011627;
}

.btn-dark {
  margin: 0;
  padding: 0 20px;
}

.buttons {
  border-bottom: 1.5px solid #ccc;
  margin: 0 20px;
  padding-left: 30px;
}
</style>
