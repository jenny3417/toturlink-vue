<template>
    <Navbar></Navbar>
    <div class="container">
        <div class="insert-box-block" style="margin: 8px; margin-top: 100px; padding: 16px;">
            <div class="picture-container-block" style="position: relative;">
                <div class="text-input-block" style="display: flex; padding: 16px;">
                    課程名稱 : <input type="text" v-model="lessonName">
                </div>
                <div class="lesson-select-block" style="display: flex; padding: 16px;">
                    課程類別 :
                    <select v-model="lessonType">
                        <option selected>請選擇</option>
                        <option v-for="subject in subjects" :key="subject.subjectId" :value="subject.subjectId">{{
                            subject.subjectContent }}</option>
                    </select>
                </div>
                <div class="picture-update-block">
                    <label for="file-input" class="upload-Image">
                        <img v-if="uploadedImage" :src="uploadedImage" alt="upload">
                        <img v-else src="@/assets/lessonImage/image-outline.svg" alt="upload">
                    </label>
                    <input type="file" id="file-input" @change="handleFileUpload">
                    <div style="font-size: large;">請按此上傳圖片</div>
                </div>
            </div>

            <div class="textarea-block" style="padding: 16px;">
                課程內容 : <CkEditor></CkEditor>
            </div>
            <div class="text-input-block" style="display: flex; padding: 16px">
                價格 : <input type="text" v-model="price">
            </div>
            <div>
                上課網址 : <input type="text" v-model="meetingURL">
            </div>
        </div>
        <div class="button-submit-block">
            <RouterLink to="/member/teacher/mylesson">
                <button type="button" class="cancel">取消</button>
            </RouterLink>
            <RouterLink to="/member/teacher/mylesson">
                <button type="button" class="upload" @click="insert">送出</button>
            </RouterLink>
        </div>
    </div>
</template>
  
<script setup>
import { ref, onBeforeUnmount, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import CkEditor from '../components/lessons/CkEditor.vue';
import Navbar from '../components/public/Navbar.vue';
import axios from 'axios';
import tutorlink from '@/api/tutorlink.js';

//將課程類別從後端引入
const subjects = ref([]);
tutorlink.get('/allSubjects').then((response) => {
    subjects.value = response.data
    console.log(response.data)
})

//新增課程的後端寫入
const meetingURL = ref('')
const lessonName = ref('')
const lessonType = ref('')
const price = ref('')
const insert = async () => {
    let lessonData = {
        subject: {
            subjectId: lessonType.value
        },
        lessonName: lessonName.value,
        price: price.value,
    }
    const response = await tutorlink.post('/lessons', lessonData)

    let lessonDetaildata = {
        lesson: response.data,
        meetingUrl: meetingURL.value,
        imformation: editorData.value
    }
    const response2 = await tutorlink.post('/lessonDetail', lessonDetaildata)

}


const uploadedImage = ref(null);


const handleFileUpload = (event) => {
    const fileInput = event.target;
    const file = fileInput.files[0];
    if (file) {
        // 更新`uploadedImage`的`ref`以使用上傳文件的URL
        uploadedImage.value = URL.createObjectURL(file);
    }
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
    width: 120px;
    height: 120px;

}

input[type="file"] {
    display: none;
}

.picture-update-block {
    position: absolute;
    right: 50px;
    top: 0px;
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
    color: green;
    background-color: #fff;
    width: 120px;
    height: 60px;
    border-radius: 10%;
}

.upload:hover {
    border: 1px solid green;
    color: #fff;
    background-color: green;
}

.upload:active {
    border: 1px solid green;
    color: #fff;
    background-color: rgb(24, 83, 24);
}

.cancel {
    border: 1px solid red;
    color: red;
    background-color: #fff;
    width: 120px;
    height: 60px;
    border-radius: 10%;
}

.cancel:hover {
    border: 1px solid red;
    color: #fff;
    background-color: red;
}

.cancel:active {
    border: 1px solid red;
    color: #fff;
    background-color: rgb(107, 16, 16);
}
</style>