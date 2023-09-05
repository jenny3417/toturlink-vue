<template>
  <div>
    <h1>課程表</h1>
    <p>建立章節、講座，開始組合您的課程</p>
    <hr />
    <!-- 影片章節表單 -->
    <form @submit.prevent="addCourse" enctype="multipart/form-data">
      <!-- 影片章節列表 -->
      <div v-for="(video, index) in videos" :key="index" class="video-item">
        <label>章節標題:</label>
        <input v-model="video.chapterName" />
        <br />
        <label>上傳課程影片:</label>
        <input type="file" @change="handleFileChange(index)" />

        <button type="button" @click="removeChapter(index)" class="tab-button">
          刪除章節
        </button>
      </div>
      <button type="button" @click="addChapter" class="tab-button">
        新增章節
      </button>
      <button type="button" @click="addCourse" class="tab-button">
        上傳課程
      </button>
      <!-- <button type="submit" class="tab-button">儲存課程</button> -->
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  data() {
    return {
      videos: [
        {
          chapterName: "",
          videoFile: null,
          sort: 0,
          lessonDetail: "",
        },
      ],
      lessonDetailId: null, // 将 lessonDetailId 添加到 data 方法中
    };
  },
  created() {
    const router = useRouter(); // 获取 router 对象
    this.lessonDetailId = router.params.lessonid; // 更新 lessonDetailId
  },
  methods: {
    handleFileChange(index) {
      const fileInput = this.$refs["chapterVideo" + index];
      if (fileInput && fileInput.files.length > 0) {
        this.videos[index].videoFile = fileInput.files[0];
      }
    },
    addChapter() {
      // 檢查前一章節是否已填寫完整
      const previousChapter = this.videos[this.videos.length - 1];
      if (
        previousChapter.chapterName == "" ||
        previousChapter.videoFile == ""
      ) {
        alert("請先填寫上一章的標題及課程影片");
        return;
      }

      const newIndex = this.videos.length;
      this.videos.push({
        chapterName: "",
        videoFile: null,
        sort: newIndex,
        lessonDetail: "",
      });
    },
    removeChapter(index) {
      this.videos.splice(index, 1);

      // 更新剩餘章節的索引
      for (let i = index; i < this.videos.length; i++) {
        this.videos[i].sort = i;
      }
    },

    async addCourse() {
      // 先更新 lessonDetail 属性
      this.videos.forEach((video) => {
        video.lessonDetail = {
          lessonDetailId: this.lessonDetailId,
        };
      });
      const formData = new FormData();
      // 遍歷章節列表，將每個章節的資訊加入 FormData
      this.videos.forEach((video, index) => {
        formData.append(`videoDTOs[${index}].chapterName`, video.chapterName);
        formData.append(`videoDTOs[${index}].videoFile`, video.videoFile);
        formData.append(
          `videoDTOs[${index}].lessonDetail`,
          JSON.stringify(video.lessonDetail)
        );
        formData.append(`videoDTOs[${index}].sort`, video.sort); // 添加 sort
      });

      try {
        const response = await axios.post("/addVideo", formData, {
          headers: {
            "Content-Type": "multipart/form-data", // 設定請求標頭為 FormData
          },
        });

        // 處理成功回應
        console.log("成功回應:", response.data);
      } catch (error) {
        // 處理錯誤
        console.error("錯誤:", error);
      }
    },
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
