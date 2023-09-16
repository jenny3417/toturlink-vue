<template>
  <div
    style="
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 75%;
      margin: 0 auto;
    "
  >
    <h1 style="margin-top: 30px">課程表編輯</h1>
    <p>建立章節、講座，開始組合您的課程</p>
    <hr />

    <form @submit.prevent="uploadVideos" class="uploadform">
      <label>章節標題:</label>
      <input placeholder="章節標題" class="inputT" />
      <br />
      <label>課程檔案:</label>
      <input style="margin: 10px" type="file" @change="handleFileChange" />
      <br />
      <!-- <div v-if="video.videoFile !== null"> -->
      <video ref="videoPlayer" controls width="320" height="240"></video>
      <br />
      <button type="submit" style="margin: 10px 0">上傳課程</button>
      <!-- </div> -->
    </form>

    <div style="margin-top: 30px">
      <h3>已上傳的課程()</h3>
      <hr />
      <ul>
        <li v-for="(videoItem, index) in videoList" :key="index">
          <h3>{{ videoItem.chapterName }}</h3>
          <h5 hidden>順序: {{ videoItem.sort }}</h5>
          <video
            controls
            :src="videoItem.courseUrl"
            width="320"
            height="240"
          ></video>
          <hr />
        </li>
      </ul>
    </div>

    <button @click="exitAddCourse" class="smbutton">更新課程影片</button>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import tutorlink from "@/api/tutorlink.js";

const route = useRoute();
const lessonId = ref(route.params.lessonId);
console.log("Received lessonDetailId:", lessonId.value);
const videoList = ref([]);
const video = ref({
  chapterName: "",
  videoFile: null,
});
const videoPlayer = ref(null);

const handleFileChange = (event) => {
  video.value.videoFile = event.target.files[0];
  console.log(video.value.videoFile);
  console.log("已讀取影片");

  // 获取video元素的引用
  if (videoPlayer.value && video.value.videoFile) {
    console.log("有影片");
    videoPlayer.value.src = URL.createObjectURL(video.value.videoFile);
  }
};

//取得所有課程
const getAllVideo = async () => {
  const response = await tutorlink.get(`/findVideoByCourse/${lessonId.value}`);
  //   videoList.value = response.data;
  const videoData = response.data;
  console.log("videoData:", videoData);

  //取得每一筆影片id傳入getvideo()
  for (const videoItem of videoData) {
    videoItem.courseUrl = await getVideo(videoItem.videoId);
  }

  videoList.value = videoData;
};
getAllVideo();

const videoUrls = [];

//取得影片
const getVideo = async (videoId) => {
  try {
    const response = await tutorlink.get(`/getVideo/${videoId}`, {
      responseType: "blob",
    });

    const videoBlob = response.data;

    const videoUrl = URL.createObjectURL(videoBlob);
    return videoUrl;
    // console.log(videoUrl);
    // videoUrls.push(videoUrl);
  } catch (error) {
    console.error("獲取影片出錯", error);
  }
};
console.log("影片URL數組:", videoUrls);
</script>

<style scoped>
button {
  padding: 6px 10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid #ccc;
  cursor: pointer;
  background: #f0f0f0;
  margin-bottom: -1px;
  margin-right: -1px;
}
button:hover {
  background: #e0e0e0;
}
.tab-button.active {
  background: #e0e0e0;
}

.uploadform {
  border: 1px solid #ccc;
  padding: 10px;
  width: 100%;
}
.inputT {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 10px;
}
label {
  font-weight: bold;
  margin-top: 20px;
}

ul {
  list-style: none; /* 清除列表标志 */
}
.smbutton {
  padding: 6px 10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid #ccc;
  cursor: pointer;
  background: #f0f0f0;
  width: 60%;
  margin: auto;
  margin-bottom: 20px;
}
.smbutton:hover {
  background: #e0e0e0;
}
</style>
