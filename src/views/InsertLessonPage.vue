<template>
  <Navbar></Navbar>
  <div class="container">
    <form @submit.prevent="insert" class="form">
      <div class="insert-box-block" style="margin: 8px; padding: 16px">
        <div class="picture-container-block" style="position: relative">
          <div class="text-input-block" style="
              display: flex;
              padding: 16px;
              display: flex;
              flex-direction: column;
            ">
            <h4>課程名稱</h4>
            <input type="text" v-model="newLesson.lessonName" style="margin-left: 8px; width: 25%" />
          </div>
          <div class="lesson-select-block" style="display: flex; flex-direction: column; padding: 16px">
            <h4>課程類別</h4>
            <select v-model="subjectData" style="margin-left: 8px; width: 25%">
              <option v-for="subject in subjects" :key="subject.subjectId" :value="subject.subjectId">
                {{ subject.subjectContent }}
              </option>
            </select>
          </div>
          <div class="picture-update-block">
            <label for="file-input" class="upload-Image">
              <img v-if="uploadedImage" :src="uploadedImage" alt="upload" />
              <img v-else src="@/assets/lessonImage/image-outline.svg" alt="upload" />
            </label>
            <input type="file" id="file-input" @change="handleImageUpload" />
            <h4 style="text-align: center">請按此上傳圖片</h4>
          </div>
        </div>

        <div class="textarea-block" style="padding: 16px; display: flex; flex-direction: column">
          <h4>課程內容</h4>
          <CkEditor @emitContent="editValue"></CkEditor>
        </div>
        <div class="text-input-block" style="display: flex; flex-direction: column; padding: 16px">
          <h4>價格</h4>
          <input type="text" v-model="newLesson.price" style="margin-left: 8px; width: 25%" />
        </div>
        <div style="padding: 16px; display: flex; flex-direction: column">
          <h4>上課網址</h4>
          <input type="text" v-model="newLesson.meetingURL" style="margin-left: 8px; width: 25%" />
        </div>
      </div>
      <div class="button-submit-block">
        <RouterLink to="/member/teacher/mylesson">
          <button type="button" class="cancel">取消</button>
        </RouterLink>
        <button type="submit" class="upload">送出</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount, onMounted } from "vue";
import { RouterLink } from "vue-router";
import CkEditor from "@/components/lessons/CkEditor.vue";
import Navbar from "../components/public/Navbar.vue";
import tutorlink from "@/api/tutorlink.js";
import { useRouter } from "vue-router";

//將課程類別從後端引入
const subjects = ref([]);
const subjectData = ref("");
tutorlink.get("/allSubjects").then((response) => {
  subjects.value = response.data;
  if (subjects.value.length > 0) {
    subjectData.value = subjects.value[0].subjectId;
  }
  console.log(response.data);
});

const router = useRouter();

//新增課程的後端寫入
const editorContent = ref("");
const newLesson = ref({
  lessonName: "",
  meetingURL: "",
  price: "",
  editorData: "",
  image: null,
});

const editValue = (editContent) => {
  editorContent.value = editContent;
};

//正規表達式，用來字串是否符合表達式的規範
const isNullOrWhiteSpace = (value) => {
  return value === null || value.match(/^ *$/) !== null;
};

//建立防呆
const checkInput = () => {
  let alertString = "";

  if (isNullOrWhiteSpace(newLesson.value.lessonName))
    alertString += "請輸入課程名稱\n";
  if (isNullOrWhiteSpace(editorContent.value))
    alertString += "請輸入課程內容\n";

  try {
    const meetingUrl = new URL(newLesson.value.meetingURL)
  } catch {
    alertString += "網址錯誤，請輸入可以使用的上課網址(如Teams或googleMeet)\n";
  }

  if (isNullOrWhiteSpace(newLesson.value.price))
    alertString += "請輸入價格\n";
  if (newLesson.value.image === null)
    alertString += "沒有圖片\n";

  return alertString;
}


const insert = async () => {
  console.log('Insert 函數被调用');
  let alertString = checkInput();

  if (alertString != "") {

    alert(alertString);
  } else {

    const formData = new FormData();
    formData.append('lessonName', newLesson.value.lessonName);
    formData.append('subject', subjectData.value);
    formData.append('lessonType', 1);
    formData.append('image', newLesson.value.image);
    formData.append('price', newLesson.value.price);
    formData.append('meetingURL', newLesson.value.meetingURL);
    formData.append('information', editorContent.value);
    const currentTime = new Date();
    formData.append("createTime", currentTime);


    const response = await tutorlink.post('/lessons', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    router.push('/member/teacher/mylesson');
  }

}




//圖片新增與預覽
const uploadedImage = ref(null); // 初始化为 null
const uploadedImageFile = ref(null); // 初始化为 null

const handleImageUpload = (event) => {
  newLesson.value.image = event.target.files[0];
  uploadedImageFile.value = event.target.files[0]; // 存储上传的文件
  uploadedImage.value = URL.createObjectURL(event.target.files[0]); // 显示预览图片
};
onBeforeUnmount(() => {
  if (uploadedImage.value) {
    URL.revokeObjectURL(uploadedImage.value);
  }
});
</script>

<style scoped>
/* 邊框 */
.insertTable {
  border: 3px solid black;
}

.upload-Image {
  /* border: 3px solid black; */
  display: inline-block;
  cursor: pointer;
}

.upload-Image img {
  width: 400px;
  height: 240px;
}

input[type="file"] {
  display: none;
}

.picture-update-block {
  position: absolute;
  right: 240px;
  top: 80px;
}

.button-submit-block {
  display: flex;
  justify-content: center;
}

.button-submit-block button {
  margin: 8px;
}

.upload {
  border: 1px solid green;
  color: #fff;
  background-color: green;
  width: 120px;
  height: 60px;
  border-radius: 10%;
  font-weight: bold;
  /* 將字體設置為粗體 */
}

.upload:hover {
  border: 1px solid green;
  color: green;
  background-color: #fff;

}

.upload:active {
  border: 1px solid green;
  color: #fff;
  background-color: rgb(24, 83, 24);
}

.cancel {
  border: 1px solid red;
  color: #fff;
  background-color: red;
  width: 120px;
  height: 60px;
  border-radius: 10%;
  font-weight: bold;
  /* 將字體設置為粗體 */
}

.cancel:hover {
  border: 1px solid red;
  color: red;
  background-color: #fff;
}

.cancel:active {
  border: 1px solid red;
  color: #fff;
  background-color: rgb(107, 16, 16);
}

.form {
  margin-top: 16px;
  border: 3px solid black;
  border-radius: 16px;
  background-color: #d3d3d3;
}
</style>
