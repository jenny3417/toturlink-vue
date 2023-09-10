<template>
  <div style="margin: 30px">
    <div>
      <h1>課程表</h1>
      <p>建立章節、講座，開始組合您的課程</p>
      <hr />

      <form @submit.prevent="uploadVideos" class="uploadform">
        <label>章節標題:</label>
        <input v-model="video.chapterName" placeholder="章節標題" />
        <br />
        <input type="file" @change="handleFileChange" />

        <button type="submit">上傳課程</button>
      </form>

      <div style="margin-top: 30px">
        <h3>已上傳的課程</h3>
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
    </div>
    <div style="margin-top: 30px">
      <button @click="exitAddCourse">提交課程以待審核</button>
    </div>
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
  console.log("已讀取影片");
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
  width: 500px;
}
</style>
