<template>
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
      >返回管理課程</span
    >
  </div>
  <div class="page">
    <h1 style="margin-top: 30px">課程登陸頁面</h1>
    <p>
      課程登陸頁面對您能否在 toturlink
      上取得成功，可說是至關重要。如果登陸頁面設計得宜，亦可提升您在 Google
      等搜尋引擎上的可見度。您在完成此章節後，不妨考慮建立一個具吸引力的課程登陸頁面，巧妙呈現吸引人註冊您課程的好理由。進一步瞭解建立您的課程登陸頁面和課程名稱標準的更多資訊。
    </p>
    <hr />
    <form @submit.prevent="uploadCourse" class="form">
      <label for="title">課程標題：</label>
      <input type="text" id="title" v-model="newCourse.title" required />
      <h6>您的課程名稱應能吸引目光、資訊清楚且經搜尋最佳化</h6>

      <label for="category">課程類別：</label>
      <select v-model="subjectData" required>
        <option
          v-for="subject in subjects"
          :key="subject.subjectId"
          :value="subject.subjectId"
        >
          {{ subject.subjectContent }}
        </option>
      </select>
      <h6>請選擇課程所屬的類別</h6>
      <div>
        <label for="willLearn">學生們將在您的課程學習到什麼?</label>
        <br />
        <input
          id="willLearn"
          v-model="newContent"
          @keyup.enter="addItem"
          placeholder="範例:識別及管理專案的風險"
        />
        <button type="button" @click="addItem" class="icon-button">
          <img src="@/assets/icon/add.png" alt="Edit Icon" />
        </button>
        <div class="content-list">
          <div
            v-for="(content, index) in items"
            :key="index"
            class="video-item"
            style="display: flex; align-items: center"
          >
            <span>{{ content.title }}</span>
            <!-- <span v-if="!content.editing">{{ content.title }}</span> -->
            <!-- <span v-else>
                <input v-model="content.updatedTitle" />
              </span> -->

            <button
              @click="deleteItem(index)"
              type="button"
              style="border: none; padding-left: 15px; background: none"
            >
              X
            </button>
          </div>
        </div>
      </div>

      <label for="description">課程說明：</label>
      <!-- <ckeditor
        :editor="editor"
        v-model="newCourse.description"
        :config="editorConfig"
        id="description"
      ></ckeditor> -->
      <CkEditor @emitContent="editValue" style="width: 100%"></CkEditor>

      <label for="language">使用語言：</label>
      <select id="language" v-model="newCourse.language" required>
        <option value="中文">中文</option>
        <option value="英文">英文</option>
        <option value="日文">日文</option>
        <option value="其他">其他</option>
        <!-- 其他語言選項 -->
      </select>
      <h6>您在教學時所使用的語言</h6>

      <label for="image">上傳圖片：</label>
      <h6>
        在此上傳您的課程圖片。必須符合我們的課程圖片品質標準方可使用。重要規範：750x422
        像素；.jpg、.jpeg、.gif 或 .png 檔案類型，圖片上不可有文字。
      </h6>
      <label for="file-input" class="upload-Image">
        <img
          v-if="uploadedImage"
          :src="uploadedImage"
          alt="upload"
          style="width: 320px"
        />
        <!-- <img v-else src="@/assets/lessonImage/image-outline.svg" alt="upload" /> -->
      </label>
      <input
        type="file"
        id="image"
        accept=".jpg, .jpeg, .png"
        @change="handleImageUpload"
        required
      />

      <label for="video">促銷影片：</label>
      <h6>
        推廣影片能抓住學生的目光，讓他們得以快速預覽您的課程，瞭解他們會學習到的內容。如果推廣影片製作精良，學生註冊您課程的可能性便會提高。
      </h6>
      <video ref="videoPlayer" controls width="320"></video>
      <input
        type="file"
        id="video"
        accept=".mp4, .avi, .mkv"
        @change="handleVideoUpload"
        required
      />

      <label for="price">價格(NTD)：</label>
      <input type="number" id="price" v-model="newCourse.price" required />
      <button type="submit" class="smbutton">下一步:規劃您的課程</button>
    </form>
  </div>
</template>
<script setup>
import { ref, onBeforeUnmount } from "vue";
import Editor from "@ckeditor/ckeditor5-build-classic";
import { useRouter } from "vue-router";
import tutorlink from "@/api/tutorlink.js";
import CkEditor from "../../components/lessons/CkEditor.vue";
import videojs from "video.js/dist/video.min";
import "video.js/dist/video-js.min.css";

const newCourse = ref({
  title: "",
  description: "",
  language: "",
  image: null,
  video: null,
  price: 0,
});

const newContent = ref("");
const items = ref([]);
const editingIndex = ref(null);
const willLearn = ref([]);
const subjects = ref([]);
const router = useRouter();
const subjectData = ref("");
const editorContent = ref("");
const videoPlayer = ref(null);

tutorlink.get("/allSubjects").then((response) => {
  subjects.value = response.data;
  console.log(response.data);
});

const editValue = (editContent) => {
  editorContent.value = editContent;
  console.log(editorContent.value);
};

const uploadCourse = async () => {
  try {
    console.log("CK:", editorContent.value);
    const formData1 = new FormData();
    formData1.append("lessonName", newCourse.value.title);
    formData1.append("subject", subjectData.value);
    formData1.append("lessonType", 0);
    formData1.append("image", newCourse.value.image);
    formData1.append("price", newCourse.value.price);
    formData1.append("information", editorContent.value);
    formData1.append("language", newCourse.value.language);
    formData1.append("video", newCourse.value.video);
    const currentTime = new Date();
    formData1.append("createTime", currentTime);
    formData1.append("courseTotalTime", 0);
    // 先上傳課程基本資料
    const courseResponse = await tutorlink.post("/lessons", formData1, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Lesson 資料上傳成功", courseResponse.data);
    const lessonDetailId = courseResponse.data;
    router.push({
      name: "AddVideoList2",
      query: {
        lessonDetail: lessonDetailId,
      }, // 传递的查询参数
    });

    // const willLearnData = Array.from(willLearn.value).map(
    //   (item) => item.content
    // );

    console.log(willLearn.value);
    //上傳willLearn資料
    const willLearnResponse = await tutorlink.post(
      `/willLearn?id=${lessonDetailId}`,
      JSON.stringify({
        willLearnList: willLearn.value,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("WillLearn 資料上傳成功", willLearnResponse.data);
  } catch (error) {
    // 處理錯誤
    console.error("上傳課程時出錯", error);
  }
};

const addItem = () => {
  if (newContent.value.trim() !== "") {
    items.value.push({
      title: newContent.value,
      editing: false,
    });
    newContent.value = "";

    const itemString = items.value[items.value.length - 1].title;
    willLearn.value.push(itemString);
    console.log(itemString, "已加到willLearn陣列");
  }
};

const deleteItem = (index) => {
  const deletedItem = items.value.splice(index, 1)[0];
  const deletedItemString = deletedItem.title;

  const willLearnIndex = willLearn.value.indexOf(deletedItemString);
  if (willLearnIndex !== -1) {
    willLearn.value.splice(willLearnIndex, 1);
    console.log(deletedItemString, "wl刪除");
  }
};

// const handleImageUpload = (event) => {
//   newCourse.value.image = event.target.files[0];
// };
//圖片新增與預覽
const uploadedImage = ref(null); // 初始化为 null
const uploadedImageFile = ref(null); // 初始化为 null

const handleImageUpload = (event) => {
  newCourse.value.image = event.target.files[0];
  uploadedImageFile.value = event.target.files[0]; // 存储上传的文件
  uploadedImage.value = URL.createObjectURL(event.target.files[0]); // 显示预览图片
};
onBeforeUnmount(() => {
  if (uploadedImage.value) {
    URL.revokeObjectURL(uploadedImage.value);
  }
});

// const handleVideoUpload = (event) => {
//   newCourse.value.video = event.target.files[0];
// };
const video = ref({
  videoFile: null,
});

const handleVideoUpload = (event) => {
  newCourse.value.video = event.target.files[0];
  console.log(video.value.videoFile);
  console.log("已讀取影片");

  // 获取video元素的引用
  if (videoPlayer.value && newCourse.value.video) {
    console.log("有影片");
    videoPlayer.value.src = URL.createObjectURL(newCourse.value.video);
  }
};

const goBack = () => {
  history.back();
};
// 在进入下一页时滚动到页面顶部
const scrollToTop = () => {
  window.scrollTo({
    top: 0, // 将此值设置为0将页面滚动到顶部
    behavior: "smooth", // 使用平滑滚动效果
  });
};

// 调用 scrollToTop 函数以滚动到页面顶部
scrollToTop();
</script>
<style scoped>
/* .content-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
} */

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
.form {
  display: flex;
  flex-direction: column;
  gap: 20px; /* 設定垂直間距 */
}
.form label {
  font-weight: bold;
  margin-top: 20px;
}

.form input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.form select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.icon-button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: inline-block;
  margin: 5px; /* 可以根据需要调整按钮的外边距 */
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
