<template>
  <div>
    <h1>課程表</h1>
    <p>建立章節、講座，開始組合您的課程</p>
    <hr />

    <form @submit.prevent="uploadVideos">
      <!-- 前端表单输入项 -->
      <input v-model="video.chapterName" placeholder="章節標題" />
      <input type="file" @change="handleFileChange" />
      <!-- 其他输入项... -->
      <!-- <button @click="addVideo">增加課程</button> -->
      <button type="submit">上傳課程</button>

      <!-- 显示视频列表 -->
      <ul>
        <li v-for="(video, index) in videoList" :key="index">
          <span>{{ video.chapterName }}</span>
          <span>{{ video.fileName }}</span>
          <!-- 其他视频信息... -->
        </li>
      </ul>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import tutorlink from "@/api/tutorlink.js";

export default {
  // mounted() {
  //   const route = useRoute();
  //   const lessonDetailIdData = ref(route.query.lessonDetail);
  //   console.log("Received lessonDetailId:", lessonDetailIdData.value);

  //   // 使用 courseId 显示课程信息或进行其他操作
  // },
  setup() {
    const route = useRoute();
    const lessonDetailIdData = ref(route.query.lessonDetail);
    console.log("Received lessonDetailId:", lessonDetailIdData.value);

    const video = ref({
      chapterName: "",
      sort: 0,
      videoFile: null,
    });

    const videoList = [];

    const uploadVideos = async () => {
      try {
        video.value.lessonDetail = {
          lessonDetailId: lessonDetailIdData.value,
        };

        // 創建 FormData 實例
        const formData = new FormData();
        console.log("formData建立");
        formData.append("videoFile", video.value.videoFile);
        formData.append("chapterName", video.value.chapterName);
        formData.append("sort", video.value.sort);
        formData.append(
          "lessonDetail",
          JSON.stringify(video.value.lessonDetail)
        );
        console.log(JSON.stringify(video.value.lessonDetail));

        const Response = await tutorlink.post("/uploadOneVideo", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("video 資料上傳成功", Response.data);

        videoList.value.push({
          chapterName: video.value.chapterName,
          fileName: Response.data.fileName, // 假设服务器返回了文件名
        });

        // 清空表单输入
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
      console.log("影片存入");
    };

    return {
      handleFileChange,
      uploadVideos,
      videoList,
      video,
    };
  },
};
</script>

<style scoped>
.icon-button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: inline-block;
  margin: 5px; /* 可以根据需要调整按钮的外边距 */
}

.video-item {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px 0;
}
.tab-button {
  padding: 6px 10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid #ccc;
  cursor: pointer;
  background: #f0f0f0;
  margin-bottom: -1px;
  margin-right: -1px;
}
.tab-button:hover {
  background: #e0e0e0;
}
.tab-button.active {
  background: #e0e0e0;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  text-align: center;
}
</style>
