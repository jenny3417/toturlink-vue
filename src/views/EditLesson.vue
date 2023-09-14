<template>
    <Navbar></Navbar>
    <div class="container">
        <div class="editContainer">
            <h2 style="text-align: center; margin-bottom: 16px;">編輯課程</h2>
            <hr>
            <div>
                <div>
                    <h4>課程名稱</h4>
                    <input type="text" v-model="lessonName" style="width: 25%;">
                </div>
                <div style="margin-top: 16px;">
                    <h4>上課網址</h4>
                    <input type="text" v-model="meetingUrl" style="width: 25%;">
                </div>
                <div style="margin-top: 16px; width: 25%;">
                    <h4>課程內容</h4>
                    <!-- <CkEditor :editorContent="lessonContent" @emitContent="handleEditorContentUpdate"></CkEditor> -->
                    <ckeditor :editor="editor" v-model="lessonContent" :config="editorConfig"></ckeditor>
                </div>
                <div style="margin-top: 16px;">
                    <h4>價格</h4>
                    <input type="text" v-model="price" style="width: 25%;">
                </div>
                <div style="position: absolute;
                            right: 480px;
                            top: 160px;">
                    <h4>圖片</h4>
                    <label for="file-input" class="upload-Image">
                        <img v-if="uploadedImage" :src="uploadedImage" alt="upload" style="
                        width: 400px;height: 240px;">
                        <img v-else :src="`${str}${image}`" alt="upload" style="
                       width: 400px;height: 240px;">
                    </label>
                    <input type="file" id="file-input" @change="handleImageUpload">
                </div>
            </div>
            <div class="checkBtn-block">
                <RouterLink to="/member/teacher/mylesson">
                    <button type="button" class="checkBtn cancel">取消</button>
                </RouterLink>
                <RouterLink
                    :to="{ name: 'checkEdit', params: { lessonId: leesonId }, query: { lessonName, price, meetingUrl, lessonContent, uploadedImage } }">
                    <button type="button" class="checkBtn upload">預覽</button>
                </RouterLink>
                <button type="button" @click="check">檢查</button>
            </div>
        </div>
    </div>
</template>
    
<script setup>
// import CkEditor from '@/components/lessons/CkEditor.vue';
import Navbar from '@/components/public/Navbar.vue';
import { useRoute } from 'vue-router';
import tutorlink from '@/api/tutorlink.js';
import { ref, onBeforeUnmount, computed } from 'vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import router from '../router';


//取得課程ID
const route = useRoute();
const leesonId = route.params.lessonId
//取得課程明細資料庫
const lessondetail = ref([]);
const lessonContent = ref('');
const meetingUrl = ref('')
//取得課程詳細資料
tutorlink.get(`/findLessonDetailByLessonId?lessonId=${leesonId}`).then((response) => {
    lessondetail.value = response.data;
    console.log(lessondetail.value);
    lessonContent.value = lessondetail.value.imformation
    meetingUrl.value = lessondetail.value.meetingUrl
})

//取得課程資料庫
const lesson = ref([]);
const lessonName = ref('')
const price = ref('');
const image = ref('');
const lessonNameValue = lessonName.value;
//讀取Base64資料的Headers
const str = 'data:imagae/png;base64,';
tutorlink.post(`/findLessons/${leesonId}`).then((response) => {
    lesson.value = response.data;
    console.log(lesson.value);
    lessonName.value = lesson.value.lessonName
    image.value = lesson.value.image
    price.value = lesson.value.price
})

// router.push({
//     name:'checkEdit',
//     query:{
//         lessonId:leesonId,
//         lessonName:lessonName,
//         pr
//     },
// })

const check = () => {
    console.log(lessonNameValue);

}



//圖片新增與預覽
const uploadedImage = ref(null); // 初始化为 null
const uploadedImageFile = ref(null); // 初始化为 null

const handleImageUpload = (event) => {
    lesson.value.image = event.target.files[0];
    uploadedImageFile.value = event.target.files[0]; // 存储上传的文件
    uploadedImage.value = URL.createObjectURL(event.target.files[0]); // 显示预览图片
}
onBeforeUnmount(() => {
    if (uploadedImage.value) {
        URL.revokeObjectURL(uploadedImage.value);
    }
});






const editor = ClassicEditor;
const editorConfig = {
    toolbar: {
        items: [
            'heading',
            '|',
            'bold',
            'italic',
            'link',
            '|',
            'bulletedList',
            'numberedList',
            '|',
            'undo',
            'redo',
        ],
    },
    // 其他配置项
};
</script>
    
<style scoped>
.checkInfo {
    border: 3px solid black;
}

.checkBtn-block {
    display: flex;
    justify-content: space-evenly;
    margin-top: 32px;
}

.checkBtn {
    width: 120px;
    height: 60px;
    border-radius: 8px;

}

.upload {
    border: 1px solid green;
    color: #fff;
    background-color: green;
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

.editContainer {
    border: 1px solid black;
    border-radius: 8px;
    padding: 24px;
}

input[type="file"] {
    display: none;
}

.upload-Image {
    /* border: 3px solid black; */
    display: inline-block;
    cursor: pointer;
}
</style>