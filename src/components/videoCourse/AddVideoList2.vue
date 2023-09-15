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
    <h1 style="margin-top: 30px">課程表</h1>
    <p>建立章節、講座，開始組合您的課程</p>
    <hr />

    <form @submit.prevent="uploadVideos" class="uploadform">
      <label>章節標題:</label>
      <input
        v-model="video.chapterName"
        placeholder="章節標題"
        class="inputT"
      />
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
      <h3>已上傳的課程({{ videoCount }})</h3>
      <hr />
      <ul>
        <li v-for="(videoItem, index) in videoList.value" :key="index">
          <h3>{{ videoItem.chapterName }}</h3>
          <h5 hidden>順序: {{ videoItem.sort }}</h5>
          <video
            controls
            :src="videoItem.courseUrl"
            width="320"
            height="240"
          ></video>
        </li>
      </ul>
    </div>

    <button @click="exitAddCourse" class="smbutton">提交課程以待審核</button>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import tutorlink from "@/api/tutorlink.js";

const route = useRoute();
const router = useRouter();
const lessonDetailIdData = ref(route.query.lessonDetail);
console.log("Received lessonDetailId:", lessonDetailIdData.value);

const exitAddCourse = () => {
  router.push({ name: "TeacherMagVideoCourse" });
};

const video = ref({
  chapterName: "",
  videoFile: null,
});

const videoList = reactive([]);
let currentSort = 0;
const videoCount = ref("0");
const videoPlayer = ref(null);

const uploadVideos = async () => {
  try {
    if (!video.value.videoFile || video.value.chapterName == "") {
      // 如果 videoFile 不存在，弹出警告框并中止上传操作
      window.alert("請填寫完整課程內容");
      return;
    }

    video.value.lessonDetail = {
      lessonDetailId: lessonDetailIdData.value,
    };

    const formData = new FormData();
    console.log("formData建立");
    formData.append("videoFile", video.value.videoFile);
    formData.append("chapterName", video.value.chapterName);
    formData.append("sort", currentSort);
    formData.append("lessonDetail", JSON.stringify(video.value.lessonDetail));
    console.log(JSON.stringify(video.value.lessonDetail));

    const Response = await tutorlink.post("/uploadOneVideo", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("video 資料上傳成功", Response.data);
    getCourseVideos();

    currentSort += 1;

    // videoList.value.push({
    //   chapterName: video.value.chapterName,
    //   fileName: Response.data.fileName,
    // });

    video.value.chapterName = "";
    video.value.videoFile = null;
    video.value.sort = "";
  } catch (error) {
    // 處理錯誤
    console.error("上傳video時出錯", error);
  }
};

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

// 获取课程影片列表
const getCourseVideos = async () => {
  try {
    const response = await tutorlink.get(
      `/findVideoByCourse/${lessonDetailIdData.value}`
    );
    console.log("影片列表:", response.data);
    videoList.value = response.data;
    console.log(videoList.value[0].chapterName);
    videoCount.value = videoList.value.length;
  } catch (error) {
    console.error("獲取影片時出錯", error);
  }
};
onMounted(() => {
  getCourseVideos();
});
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
