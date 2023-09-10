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
  <div
    style="
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 75%;
      margin: 0 auto;
    "
  >
    <h1>課程登陸頁面</h1>
    <p>
      課程登陸頁面對您能否在 toturlink
      上取得成功，可說是至關重要。如果登陸頁面設計得宜，亦可提升您在 Google
      等搜尋引擎上的可見度。您在完成此章節後，不妨考慮建立一個具吸引力的課程登陸頁面，巧妙呈現吸引人註冊您課程的好理由。進一步瞭解建立您的課程登陸頁面和課程名稱標準的更多資訊。
    </p>
    <hr />
    <form @submit.prevent="uploadCourse" class="form">
      <label for="title">課程標題：</label>
      <input type="text" id="title" v-model="newCourse.title" />
      <h6>您的課程名稱應能吸引目光、資訊清楚且經搜尋最佳化</h6>

      <label for="category">課程類別：</label>
      <!-- <select id="category" v-model="newCourse.category"> -->
      <!-- 取得類別資料 -->
      <select v-model="subjectData">
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
          v-model="content.title"
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
          >
            <h6>
              <span v-if="!content.editing">{{ content.title }}</span>
              <span v-else>
                <input v-model="content.updatedTitle" />
              </span>
            </h6>
            <!-- <p>序號: {{ index + 1 }}</p> -->
            <!-- <button @click="editItem(content)">修改</button> -->
            <button @click="deleteItem(index)" type="button">刪除</button>
            <!-- <button v-if="content.editing" @click="saveEdit(content)">
                儲存
              </button> -->
          </div>
        </div>
      </div>

      <label for="description">課程說明：</label>
      <ckeditor
        :editor="editor"
        v-model="newCourse.description"
        :config="editorConfig"
        id="description"
      ></ckeditor>

      <label for="language">使用語言：</label>
      <select id="language" v-model="newCourse.language">
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
      <input type="file" id="image" @change="handleImageUpload" />

      <label for="video">促銷影片：</label>
      <h6>
        推廣影片能抓住學生的目光，讓他們得以快速預覽您的課程，瞭解他們會學習到的內容。如果推廣影片製作精良，學生註冊您課程的可能性便會提高。
      </h6>
      <input type="file" id="video" @change="handleVideoUpload" />

      <label for="price">價格：</label>
      <input type="number" id="price" v-model="newCourse.price" required />
      <button type="submit" class="smbutton">下一步:規劃您的課程</button>
    </form>
  </div>
</template>
<script>
import { ref } from "vue";
import axios from "axios";
import Editor from "@ckeditor/ckeditor5-build-classic";
import { useRouter } from "vue-router";
import tutorlink from "@/api/tutorlink.js";

export default {
  setup() {
    const newCourse = ref({
      title: "",
      description: "",
      language: "",
      image: null,
      video: null,
      price: 0,
    });

    const content = ref({ title: "" });
    const items = ref([]);
    const editingIndex = ref(null);
    const willLearn = ref([]);
    const subjects = ref([]);
    const router = useRouter();
    const subjectData = ref("");

    // 发送请求以获取课程类别数据
    tutorlink.get("/allSubjects").then((response) => {
      subjects.value = response.data;
      console.log(response.data);
    });

    const uploadCourse = async () => {
      try {
        console.log(newCourse.value.language);
        // 創建 FormData 實例
        const formData1 = new FormData();
        formData1.append("lessonName", newCourse.value.title);
        formData1.append("subject", subjectData.value);
        formData1.append("lessonType", 0);
        formData1.append("image", newCourse.value.image);
        formData1.append("price", newCourse.value.price);
        formData1.append("information", newCourse.value.description);
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
        // const lessonId = courseResponse.data.lessonId;
        // 如果課程上傳成功，繼續上傳 Detail & willLearn 資料
        // if (courseResponse.status === 200) {
        //   // 创建一个包含 lessonId 属性的 lesson 对象
        //   const lesson = {
        //     lessonId: lessonId,
        //   };
        //   const formData2 = new FormData();
        //   formData2.append("lesson", JSON.stringify(lesson));

        //   const lessonDetailResponse = await tutorlink.post(
        //     "/VideoLessonDetail",
        //     formData2,
        //     {
        //       headers: {
        //         "Content-Type": "multipart/form-data",
        //       },
        //     }
        //   );
        //   const lessonDetailId = lessonDetailResponse.data.lessonDetailId;
        //   console.log("Detail 資料上傳成功", lessonDetailResponse.data);

        //   // 创建包含 lessonId 的 willLearn 数据
        //   const willLearnData = willLearn.value.map((item) => {
        //     return {
        //       lessonId: lessonId,
        //       title: item,
        //     };
        //   });

        //   //上傳Deatail資料
        //   const willLearnResponse = await tutorlink.post(
        //     "/api/addWillLearn",
        //     JSON.stringify(willLearnData),
        //     {
        //       headers: {
        //         "Content-Type": "application/json",
        //       },
        //     }
        //   );
        //   console.log("WillLearn 資料上傳成功", willLearnResponse.data);

        //   // 處理成功回應
        //   console.log("課程已成功上傳", courseResponse.data);
        //   router.push({ name: "addVideoList2", params: { lessonDetailId } });
        //   // this.$router.push({
        //   //   name: "addVideoList2",
        //   //   params: { lessonDetailId: lessonDetailId },
        //   // });
        // }
      } catch (error) {
        // 處理錯誤
        console.error("上傳課程時出錯", error);
      }
    };
    const addItem = () => {
      if (content.value.title !== "") {
        const newItem = { ...content.value };
        items.value.push(newItem); // 將內容添加到 items 陣列中
        content.value.title = "";

        const itemString = newItem.title;
        willLearn.value.push(itemString);
        console.log("已加到willLearn陣列");
      }
    };

    const editItem = (content) => {
      if (content.editing) {
        content.editing = false;
      } else {
        content.editing = true;
        content.updatedTitle = content.title;
      }
    };

    const saveEdit = (content) => {
      content.title = content.updatedTitle;
      content.editing = false;
    };

    const deleteItem = (index) => {
      const deletedItem = items.value.splice(index, 1)[0]; // 刪除 items 陣列的項目並取得被刪除的內容
      const deletedItemString = deletedItem.title;
      console.log("it刪除");

      // 找到對應的 willLearn 陣列中的項目索引並刪除
      const willLearnIndex = willLearn.value.indexOf(deletedItemString);
      if (willLearnIndex !== -1) {
        willLearn.value.splice(willLearnIndex, 1);
        console.log("wl刪除");
        // }
      }
    };

    const handleImageUpload = (event) => {
      newCourse.value.image = event.target.files[0];
    };

    const handleVideoUpload = (event) => {
      newCourse.value.video = event.target.files[0];
    };

    const goBack = () => {
      history.back();
    };
    return {
      subjectData,
      goBack,
      uploadCourse,
      willLearn,
      newCourse,
      handleImageUpload,
      handleVideoUpload,
      content,
      items,
      addItem,
      editingIndex,
      editItem,
      saveEdit,
      deleteItem,
      editor: Editor,
      editorData: "",
      editorConfig: {
        shouldNotGroupWhenFull: true,
      },
      subjects,
      router,
    };
  },
};
</script>
<style scoped>
/* .content-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  } */
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
.icon-button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: inline-block;
  margin: 5px; /* 可以根据需要调整按钮的外边距 */
}
</style>
