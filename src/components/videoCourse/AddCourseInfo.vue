<template>
  <div>
    <h1>課程登陸頁面</h1>
    <p>
      課程登陸頁面對您能否在 toturlink
      上取得成功，可說是至關重要。如果登陸頁面設計得宜，亦可提升您在 Google
      等搜尋引擎上的可見度。您在完成此章節後，不妨考慮建立一個具吸引力的課程登陸頁面，巧妙呈現吸引人註冊您課程的好理由。進一步瞭解建立您的課程登陸頁面和課程名稱標準的更多資訊。
    </p>
    <hr />
    <form @submit.prevent="addCourse" class="form">
      <label for="title">課程標題：</label>
      <input type="text" id="title" v-model="newCourse.title" />
      <h6>您的課程名稱應能吸引目光、資訊清楚且經搜尋最佳化</h6>

      <label for="category">課程類別：</label>
      <select id="category" v-model="newCourse.category">
        <option value="科學">科學</option>
        <option value="語言">語言</option>
        <option value="藝術">藝術</option>
        <!-- 其他類別選項 -->
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
        <button @click="addItem" class="icon-button">
          <img src="@/assets/icon/add.png" alt="Edit Icon" />
        </button>
        <div class="content-list">
          <div
            v-for="(content, index) in items"
            :key="index"
            class="video-item"
          >
            <h3>
              <span v-if="!content.editing">{{ content.title }}</span>
              <span v-else>
                <input v-model="content.updatedTitle" />
              </span>
            </h3>
            <p>序號: {{ index + 1 }}</p>
            <button @click="editItem(content)">修改</button>
            <button @click="deleteItem(content.id)">刪除</button>
            <button v-if="content.editing" @click="saveEdit(content)">
              儲存
            </button>
          </div>
        </div>
      </div>

      <label for="description">課程說明：</label>
      <ckeditor
        :editor="editor"
        v-model="editorData"
        :config="editorConfig"
        id="description"
      ></ckeditor>

      <label for="language">使用語言：</label>
      <select id="language" v-model="newCourse.language">
        <option value="中文">中文</option>
        <option value="英文">英文</option>
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
    </form>
  </div>
</template>
<script>
import { ref } from "vue";
import Editor from "@ckeditor/ckeditor5-build-classic";

export default {
  setup() {
    const newCourse = ref({
      title: "",
      category: "",
      description: "",
      language: "",
      price: 0,
      image: null,
      video: null,
    });

    const content = ref({ title: "" });
    const items = ref([]);
    const editingIndex = ref(null);

    const addItem = () => {
      if (content.value.title !== "") {
        items.value.push({ ...content.value });
        content.value.title = "";
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
      items.value.splice(index, 1);
    };

    const addCourse = () => {
      // 在這裡執行將表單資料送到伺服器的邏輯
      console.log("新增課程", newCourse.value);
      // 可以使用fetch或其他方法將資料送到伺服器
    };

    const handleImageUpload = (event) => {
      newCourse.value.image = event.target.files[0];
    };

    const handleVideoUpload = (event) => {
      newCourse.value.video = event.target.files[0];
    };

    return {
      newCourse,
      addCourse,
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
