<template>
    <Navbar></Navbar>
    <div class="container">
        <form @submit.prevent="insert">

            <div class="insert-box-block" style="margin: 8px; margin-top: 100px; padding: 16px;">
                <div class="picture-container-block" style="position: relative;">
                    <div class="text-input-block" style="display: flex; padding: 16px;">
                        課程名稱 : <input type="text" v-model="newLesson.lessonName">
                    </div>
                    <div class="lesson-select-block" style="display: flex; padding: 16px;">
                        課程類別 :
                        <select v-model="subjectData">
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
                        <input type="file" id="file-input" @change="handleImageUpload">
                        <div style="font-size: large;">請按此上傳圖片</div>
                    </div>
                </div>

                <div class="textarea-block" style="padding: 16px;">
                    課程內容 :
                    <CkEditor @emitContent="editValue"></CkEditor>

                </div>
                <div class="text-input-block" style="display: flex; padding: 16px">
                    價格 : <input type="text" v-model="newLesson.price">
                </div>
                <div>
                    上課網址 : <input type="text" v-model="newLesson.meetingURL">
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
import { ref, onBeforeUnmount, onMounted, } from 'vue';
import { RouterLink } from 'vue-router';
import CkEditor from '../components/lessons/CkEditor.vue';
import Navbar from '../components/public/Navbar.vue';
import axios from 'axios';
import tutorlink from '@/api/tutorlink.js';
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const subjects = ref([]);
tutorlink.get('/allSubjects').then((response) => {
    subjects.value = response.data
    console.log(response.data)
})




//新增課程的後端寫入
const editorContent = ref('');
const newLesson = ref({
    lessonName: '',
    meetingURL: '',
    price: '',
    editorData: '',
    image: null,
});

const editValue = (editContent) => {
    editorContent.value = editContent
}


const subjectData = ref('')
const insert = async () => {
    console.log('Insert 函数被调用');
    const formData = new FormData();
    formData.append('lessonName', newLesson.value.lessonName);
    formData.append('subject', subjectData.value);
    formData.append('lessonType', 1);
    formData.append('image', newLesson.value.image);
    formData.append('price', newLesson.value.price);
    formData.append('meetingURL', newLesson.value.meetingURL);
    formData.append('imformation', editorContent.value);


    const response = await tutorlink.post('/lessons', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    router.push('/member/teacher/mylesson');

}


//圖片新增與預覽
const handleImageUpload = (event) => {
    newLesson.value.image = event.target.files[0];
    // uploadedImageFile.value = file; // 存儲上傳的文件
    // uploadedImage.value = URL.createObjectURL(file); // 顯示預覽圖片
}






// onBeforeUnmount(() => {
//     if (uploadedImage.value) {
//         URL.revokeObjectURL(uploadedImage.value);
//     }
// });
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