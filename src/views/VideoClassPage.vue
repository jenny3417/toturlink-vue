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
        >{{ lessonList.lessonName }}</span
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
          <!-- <button
            :class="[
              'btn',
              'btn-outline-secondary',
              'btn-md',
              { active: displayedComponent === 'post' },
            ]"
            @click="displayedComponent = 'post'"
          >
            公告
          </button> -->
        </div>
        <component :is="displayedComponent"></component>
        <div v-if="displayedComponent === 'search'">
          <div class="videoBut" style="padding-bottom: 20px">
            <input
              type="search"
              v-model="keywordName"
              @input="search"
              placeholder="搜尋課程內容"
            />

            <button type="submit" class="btn btn-dark">搜尋</button>
          </div>
          <div
            v-if="keywordName != ''"
            style="margin-left: 50px; margin-bottom: 50px"
            class="searchName"
          >
            <h4>「{{ keywordName }}」搜尋結果如下:</h4>
            <ul>
              <li
                v-for="video in searchResults"
                :key="video.videoId"
                @click="searchVideo(video.videoId)"
              >
                {{ video.chapterName }}
              </li>
            </ul>
          </div>
        </div>
        <div v-if="displayedComponent === 'qna'">
          <div class="videoBut" style="padding-bottom: 0">
            <input
              type="search"
              v-model="KeywordQA"
              @input="searchQA"
              placeholder="搜尋課程問答"
            />
            <button type="submit" class="btn btn-dark">搜尋</button>
          </div>
          <div
            v-if="KeywordQA != ''"
            style="
              display: flex;
              flex-direction: column;
              margin: auto;
              margin-bottom: 10px;
              width: 70%;
            "
          >
            <h4>「{{ KeywordQA }}」搜尋結果如下:</h4>
            <ul style="margin: 30px 0">
              <li v-for="searchqa in searchQAResults" :key="qas">
                <h5 class="qa-title">{{ searchqa.title }}</h5>
                <p class="qa-content">{{ searchqa.question }}</p>
                <p class="qa-time">{{ formatDate(searchqa.time) }}</p>
                <p>{{ searchqa.answer }}</p>
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
            <div v-if="KeywordQA == ''">
              <h4>此課程的所有問題({{ QAList.length }})</h4>
              <ul style="margin: 30px 0">
                <li
                  v-for="(qaItem, index) in QAList"
                  :key="index"
                  style="cursor: default"
                >
                  <h5 class="qa-title">{{ qaItem.title }}</h5>
                  <p class="qa-content">{{ qaItem.question }}</p>
                  <p class="qa-time">{{ formatDate(qaItem.time) }}</p>
                  <p>{{ qaItem.answer }}</p>
                </li>
              </ul>
            </div>
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
            <h6 style="margin-right: 5px">{{ formattedPlaybackTime }}</h6>

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
            <h4>此課程的所有筆記({{ noteList.length }})</h4>
            <ul style="list-style-type: none">
              <li v-for="(noteItem, index) in noteList" :key="index">
                <div
                  style="
                    border: 1px solid #ccc;
                    padding: 10px;
                    margin-bottom: 10px;
                  "
                >
                  <button
                    class="timebut"
                    @click="jumpToTime(noteItem.timeLine)"
                  >
                    {{ formatTime(noteItem.timeLine) }}
                  </button>
                  <p>{{ noteItem.noteContent }}</p>
                </div>
                <button
                  class="delButt"
                  @click="confirmDelNote(noteItem.videoNoteId)"
                >
                  刪除筆記
                </button>
              </li>
            </ul>
          </div>
        </div>
        <!-- <div v-if="displayedComponent === 'post'">
          <div class="videoBut" style="display: flex; flex-direction: column">
            <h3>尚未發佈公告</h3>

            <p>
              講師尚未新增公告至此課程。公告是用於通知您有關課程的最新消息或新增項目。
            </p>
          </div>
        </div> -->
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
    <div
      style="display: flex; width: 100vw; background: #011627; height: 150px"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onBeforeUnmount } from "vue";
import videojs from "video.js/dist/video.min";
import "video.js/dist/video-js.min.css";
import Navbar from "@/components/public/Navbar.vue";
import { useRoute, useRouter } from "vue-router";
import tutorlink from "@/api/tutorlink.js";

const route = useRoute();
const lessonDetailIdData = ref(route.params.id);
// const lessonDetailIdData = ref(route.query.lessonDetail);
// const lessonDetailIdData = ref(1);

onMounted(async () => {
  await getCourseVideosInfo(); // 等待视频列表加载完成
  await getCourseQA(); // 等待课程问答加载完成
  // await getCoursePost(); // 等待课程公告加载完成
  await getCourse();
  // 初始化视频播放器
  initVideoSource();
  await getFirstVideo();
  // await getVideoNote(); // 等待视频笔记加载完成
});

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
const noteData = ref({
  timeLine: 0,
  noteContent: "",
});
const noteList = ref([]);
const lessonList = ref([]);

const currentPlaybackTime = ref(0);
const formattedPlaybackTime = computed(() => {
  return formatTime(currentPlaybackTime.value);
});
let player;

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

  player = videojs(videoPlayer.value, options);
  // player.src(currentVideo.courseUrl); // 設定影片 src
  // player.src(videoPath);
  player.on("ended", () => {
    currentVideo.value.watched = true;
  });

  player.on("timeupdate", function () {
    var currentTime = Math.floor(player.currentTime());
    currentPlaybackTime.value = currentTime;
    noteData.value.timeLine = currentTime;
  });
}

const jumpToTime = (timeLine) => {
  player.currentTime(timeLine);
  console.log("跳轉到時間戳");
};

const currentVideo = ref(videoList.value[currentVideoIndex.value]);
// const currentVideoId = ref(currentVideo.value.videoId);

const changeVideo = (index) => {
  console.log("跳轉到video", index);
  currentVideoIndex.value = index;
  currentVideo.value = videoList.value[currentVideoIndex.value];
  console.log("影片id:", currentVideo.value.videoId);
  // 调用函数并传递 videoid
  console.log("調用getVideo,videoId: ", currentVideo.value.videoId); // 替换为您要获取的 videoid
  getVideo(currentVideo.value.videoId);
  getVideoNote(currentVideo.value.videoId);
  // initVideoSource();
};

const searchVideo = (videoId) => {
  getVideo(videoId);
  getVideoNote(videoId);
};

const getPlaylistItemClasses = (index) => {
  return {
    "playlist-item": true,
    active: index === currentVideoIndex.value,
    disabled: index === currentVideoIndex.value,
  };
};

//讀取LocalStorage

const savedData = localStorage.getItem("video_data");
console.log("localStorage:", savedData);

//將影片時間戳存入LocalStorage
onBeforeUnmount(() => {
  const videoId = currentVideo.value.videoId;
  const userId = 1;
  const dataToSave = {
    videoId,
    timestamp: Math.floor(player.currentTime()),
    userId,
  };
  localStorage.setItem("video_data", JSON.stringify(dataToSave));
  console.log(JSON.stringify(dataToSave));
});

//取得課程名稱
const getCourse = async () => {
  try {
    const response = await tutorlink.get(
      `/findLessonByLessonId/${lessonDetailIdData.value}`
      // `/findLessonByLessonId/3`
    );
    console.log("此門課程:", response.data);
    lessonList.value = response.data;
  } catch (error) {
    console.error("獲取課程錯誤", error);
  }
};
getCourse();

// 取得課程影片資訊
const getCourseVideosInfo = async () => {
  try {
    const response = await tutorlink.get(
      `/findVideoByCourse/${lessonDetailIdData.value}`
      // `/findVideoByCourse/3`
    );
    console.log("影片列表:", response.data);

    videoList.value = response.data;
  } catch (error) {
    console.error("獲取影片時出錯", error);
  }
};

//進入畫面影片
const getFirstVideo = async (videoId) => {
  try {
    videoId = videoList.value[0].videoId;
    console.log("初始videoid", videoId);
    const response = await tutorlink.get(`/getVideo/${videoId}`, {
      responseType: "blob",
    });

    // 处理获取到的视频文件，可能需要使用Blob URL或其他方式来播放或显示视频
    const videoBlob = response.data;

    // 示例：将视频Blob URL设置为HTML5视频元素的src
    const videoUrl = URL.createObjectURL(videoBlob);

    console.log(videoUrl);
    player.src({ src: videoUrl, type: "video/mp4" });
    currentVideo.value = videoList.value[currentVideoIndex.value];
    getVideoNote(videoId);
  } catch (error) {
    console.error("獲取影片出錯", error);
  }
};

//取得影片
const getVideo = async (videoId) => {
  try {
    const response = await tutorlink.get(`/getVideo/${videoId}`, {
      responseType: "blob",
    });

    // 处理获取到的视频文件，可能需要使用Blob URL或其他方式来播放或显示视频
    const videoBlob = response.data;

    // 示例：将视频Blob URL设置为HTML5视频元素的src
    const videoUrl = URL.createObjectURL(videoBlob);

    console.log(videoUrl);
    player.src({ src: videoUrl, type: "video/mp4" });
  } catch (error) {
    console.error("獲取影片出錯", error);
  }
};

//取得課程問答
const getCourseQA = async () => {
  try {
    const response = await tutorlink.get(
      `/courseQA/${lessonDetailIdData.value}`
      // `/courseQA/3`
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
      `/courseQA/${lessonDetailIdData.value}`,
      // "/courseQA/3",
      JSON.stringify(courseQAData.value),
      { headers: { "Content-Type": "application/json;charset=UTF-8" } }
    );
    console.log("問題新增成功", response.data);
    alert("已提出發問，等待教師回覆");
    courseQAData.value.title = "";
    courseQAData.value.question = "";
    getCourseQA();
  } catch (error) {
    console.error("新增問答錯誤", error);
  }
};

//取得影片筆記
const getVideoNote = async (videoId) => {
  try {
    const response = await tutorlink.get(`/videoNote/${videoId}`);
    console.log("筆記列表:", response.data);
    noteList.value = response.data;
  } catch (error) {
    console.error("獲取筆記時錯誤", error);
  }
};
// getVideoNote();

//新增筆記
const addNote = async () => {
  try {
    const videoId = currentVideo.value.videoId;
    console.log(videoId);
    console.log("時間戳", noteData.value.timeLine);
    const response = await tutorlink.post(
      `/videoNote/${videoId}`,
      JSON.stringify(noteData.value),
      { headers: { "Content-Type": "application/json;charset=UTF-8" } }
    );
    console.log("筆記新增成功", response.data);
    noteData.value.noteContent = "";
    getVideoNote(videoId);
  } catch (error) {
    console.error("新增筆記錯誤", error);
  }
};

//刪除筆記
const confirmDelNote = (videoNoteId) => {
  const isConfirmed = window.confirm("確定要刪除這筆筆記嗎？");

  if (isConfirmed) {
    delNote(videoNoteId);
  }
};
const delNote = async (noteId) => {
  try {
    const videoId = currentVideo.value.videoId;
    const response = await tutorlink.delete(`/videoNote/${noteId}`);
    console.log("刪除筆記成功");
    getVideoNote(videoId);
  } catch (error) {
    console.error("刪除筆記時錯誤", error);
  }
};
//取得課程公告
// const getCoursePost = async () => {
//   try {
//     const response = await tutorlink.get(
//       `/coursePostByCourse/{lessonDetailIdData.value}`
//       // `/coursePostByCourse/3`
//     );
//     console.log("公告列表:", response.data);
//     postList.value = response.data;
//   } catch (error) {
//     console.error("獲取公告時錯誤", error);
//   }
// };
// getCoursePost();

//模糊搜尋
const keywordName = ref("");
const searchResults = ref([]);
const search = async () => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  tutorlink
    .get(`/searchChapterName/${lessonDetailIdData.value}`, {
      params: {
        keyword: keywordName.value,
      },
    })
    .then((response) => {
      searchResults.value = response.data;
      console.log(searchResults.value);
    })
    .catch((error) => {
      console.error("搜尋課程失敗:", error);
    });
};
const KeywordQA = ref("");
const searchQAResults = ref([]);
const searchQA = async () => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  tutorlink
    .get(`/searchQA/${lessonDetailIdData.value}`, {
      params: {
        keyword: KeywordQA.value,
      },
    })
    .then((response) => {
      searchQAResults.value = response.data;
      console.log(searchQAResults.value);
    })
    .catch((error) => {
      console.error("搜尋問答失敗:", error);
    });
};

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
  color: black;
  cursor: pointer;
  padding: 10px;

  transition: background-color 0.1s, color 0.1s;
}
ul {
  list-style-type: none;
}

.searchName li:hover {
  color: #aaa;
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
.qa-title {
  font-size: 16px;
  font-weight: bold;
  margin: 0;
}

.qa-content {
  font-size: 14px;
  margin: 5px 0;
}

.qa-time {
  font-size: 12px;
  color: #777;
  margin: 0;
}

.delButt {
  padding: 6px 10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid #ccc;
  cursor: pointer;
  background: #f0f0f0;
  /* width: 60%; */
  margin: auto;
  margin-bottom: 20px;
}
</style>
