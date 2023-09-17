<template>
  <div style="display: flex; width: 100vw; background: #011627; height: 50px">
    <button class="icon-button" style="margin: 0 20px" @click="exitAddCourse">
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
      >返回管理課程</span
    >
  </div>
  <div class="page">
    <router-link :to="{ name: 'editCourse', params: { lessonId: lessonId } }">
      <button class="smbutton" style="width: 150px">編輯課程資訊</button>
    </router-link>
    <h1 style="margin-top: 10px">課程表編輯</h1>
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
      <h3>已上傳的課程</h3>
      <hr />
      <ul>
        <li v-for="(videoItem, index) in videoList" :key="index">
          <div style="margin: 20px">
            <div style="margin-bottom: 0">
              <input type="text" v-model="videoItem.chapterName" />
              <button
                style="font-size: small; margin-left: 30px"
                @click="editChapterName(videoItem)"
              >
                修改
              </button>
              <button
                style="font-size: small; margin-left: 10px"
                @click="confirmDeleteVideo(videoItem.videoId)"
              >
                刪除
              </button>
            </div>
            <h5 hidden>順序: {{ videoItem.sort }}</h5>
            <video
              controls
              :src="videoItem.courseUrl"
              width="320"
              height="240"
            ></video>

            <hr />
          </div>
        </li>
      </ul>
    </div>

    <button @click="exitAddCourse" class="smbutton">完成課程表變更</button>
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
const router = useRouter();
const exitAddCourse = () => {
  router.push({ name: "teacherAllVideoCourse" });
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

const editChapterName = (videoItem) => {
  const chapterName = videoItem.chapterName;
  const videoId = videoItem.videoId;
  const requestBody = {
    chapterName: chapterName,
  };
  console.log(videoId);
  console.log(chapterName);
  tutorlink.put(`/updateVideoName/${videoId}`, requestBody, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("標題已更新");
  alert("標題已更新");
};

const confirmDeleteVideo = (videoId) => {
  const userConfirmed = window.confirm("確定要刪除嗎?");
  if (userConfirmed) {
    deleteVideo(videoId);
  } else {
  }
};

const deleteVideo = async (videoId) => {
  tutorlink.delete(`/deleteVideo/${videoId}`);
  console.log("已刪除videoId:" + videoId);
  getAllVideo();
};

let currentSort = 0;
const uploadVideos = async () => {
  try {
    if (!video.value.videoFile || video.value.chapterName == "") {
      // 如果 videoFile 不存在，弹出警告框并中止上传操作
      window.alert("請填寫完整課程內容");
      return;
    }

    video.value.lessonDetail = {
      lessonDetailId: lessonId.value,
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
    getAllVideo();

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
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 75%;
  margin: 20px auto;
  background-color: white;
  padding: 20px;
  box-shadow: 5px 10px 5px rgba(0, 0, 0, 0.1);
}
.icon-button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: inline-block;
  margin: 5px; /* 可以根据需要调整按钮的外边距 */
}
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
/* button:hover {
  background: #e0e0e0;
} */
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
