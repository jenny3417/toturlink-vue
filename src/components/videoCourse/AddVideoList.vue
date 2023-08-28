<template>
  <div>
    <h1>課程表</h1>
    <p>建立章節、講座，開始組合您的課程</p>
    <hr />
    <div class="video-item">
      <label>課程章節標題:</label>
      <input v-model="newVideo.title" ref="titleInput" />
      <span v-if="isTitleInvalid" style="color: red; font-size: 10px"
        >&nbsp;&nbsp;請填寫課程標題</span
      >
      <br />
      <label>上傳課程影片:</label>
      <input type="file" ref="fileInput" @change="handleFileChange" />
      <button type="submit" @click="addVideo" class="tab-button">
        新增章節
      </button>
    </div>
    <div v-for="(video, index) in videos" :key="video.id" class="video-item">
      <h3>
        <span v-if="!video.editing">{{ video.title }}</span>
        <span v-else>
          <input v-model="video.updatedTitle" />
        </span>
        <!-- <button @click="toggleEditing(video)">修改</button>
        <button v-if="video.editing" @click="saveChanges(video)">儲存</button> -->
      </h3>
      <p>序號: {{ video.sortNum }}</p>
      <p>影片:{{ video.filename }}</p>

      <input
        v-if="video.filename == ''"
        type="file"
        ref="fileInput"
        @change="saveChanges(video)"
      />

      <button class="icon-button edit-button" @click="toggleEditing(video)">
        <span v-if="!video.editing">
          <img src="@/assets/icon/edit.svg" alt="Edit Icon" />
        </span>
        <span v-else>
          <img src="@/assets/icon/save.png" alt="Save Icon" />
        </span>
      </button>

      <button class="icon-button" @click="deleteVideo(video.id)">
        <img src="@/assets/icon/delete.svg" alt="Delete Icon" />
      </button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const newVideo = ref({ sortNum: "", title: "", filename: "" });
    const videos = ref([]);

    const fileInputRef = ref(null);
    const isTitleInvalid = ref(false);

    function addVideo() {
      if (!newVideo.value.title) {
        // 如果标题为空，则标记为无效
        isTitleInvalid.value = true;
        return;
      }
      const newSortNum = videos.value.length + 1;
      videos.value.push({ ...newVideo.value, sortNum: newSortNum });
      newVideo.value.title = "";
      newVideo.value.filename = "";
      isTitleInvalid.value = false;
    }

    function deleteVideo(videoId) {
      const confirmDelete = window.confirm(`確定要刪除課程嗎？`);

      if (confirmDelete) {
        const index = videos.value.findIndex((video) => video.id === videoId);
        if (index !== -1) {
          videos.value.splice(index, 1);
          for (let i = index; i < videos.value.length; i++) {
            videos.value[i].sortNum = i + 1;
          }
        }
      }
    }

    function toggleEditing(video) {
      if (video.editing) {
        video.editing = false;
      } else {
        video.editing = true;
        video.updatedTitle = video.title;
      }
    }

    function saveChanges(video) {
      video.title = video.updatedTitle;
      video.editing = false;

      // 在這裡可以將修改後的資料儲存到後端或其他存儲系統
      console.log("已儲存的變更:", video);
    }

    function handleFileChange(event) {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        // 将文件名存储在 newVideo.filename 中
        newVideo.value.filename = selectedFile.name;
        // 在這裡可以使用 FormData 將選中的檔案上傳到伺服器
        console.log("已選中的檔案:", selectedFile);
      }
    }

    return {
      newVideo,
      videos,
      addVideo,
      deleteVideo,
      toggleEditing,
      saveChanges,
      handleFileChange,
      fileInputRef,
      isTitleInvalid,
    };
  },
});
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
