<template>
    <Navbar></Navbar>
    <div class="container">
        <form @submit.prevent="edit" class="form">
            <div class="editContainer">
                <h2 style="text-align: center; margin-bottom: 16px;">編輯課程</h2>
                <hr>
                <div>
                    <div>
                        <h4>課程名稱</h4>
                        <input type="text" v-model="lessons.lessonName" style="width: 25%;">
                    </div>
                    <div style="margin-top: 16px;">
                        <h4>課程類別</h4>
                        <select v-model="subjectId" style=" width: 25%">
                            <option v-for="subject in subjects" :key="subject.subjectId" :value="subject.subjectId">
                                {{ subject.subjectContent }}
                            </option>
                        </select>
                    </div>
                    <div style="margin-top: 16px;">
                        <h4>上課網址</h4>
                        <input type="text" v-model="lessonDetail.meetingUrl" style="width: 25%;">
                    </div>
                    <div style="margin-top: 16px; width: 25%;">
                        <h4>課程內容</h4>
                        <!-- <CkEditor :editorContent="lessonContent" @emitContent="handleEditorContentUpdate"></CkEditor> -->
                        <ckeditor :editor="editor" v-model="lessonDetail.imformation" :config="editorConfig"></ckeditor>
                    </div>
                    <div style="margin-top: 16px;">
                        <h4>價格</h4>
                        <input type="text" v-model="lessons.price" style="width: 25%;">
                    </div>
                    <div style="position: absolute;
                            right: 480px;
                            top: 160px;">
                        <h4>圖片</h4>
                        <label for="file-input" class="upload-Image">
                            <img v-if="uploadedImage" :src="uploadedImage" alt="upload" style="
                        width: 400px;height: 240px;">
                            <img v-else :src="`${str}${lessons.image}`" alt="upload" style="
                       width: 400px;height: 240px;">
                        </label>
                        <input type="file" id="file-input" @change="handleImageUpload">
                    </div>
                </div>
                <div class="checkBtn-block">
                    <RouterLink to="/member/teacher/mylesson">
                        <button type="button" class="checkBtn cancel">取消</button>
                    </RouterLink>

                    <button type="submit" class="checkBtn upload">送出</button>


                </div>
            </div>
        </form>
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
import { useLessonStore } from '@/stores/useLessonStore';
import { storeToRefs } from 'pinia';

//取得課程ID
const route = useRoute();
const lessonId = route.params.lessonId
//取得課程詳細資料
const lessonDetail = ref([])
tutorlink.get(`/findLessonDetailByLessonId?lessonId=${lessonId}`).then((response) => {

    lessonDetail.value = response.data

})
//讀取Base64資料的Headers
const str = 'data:imagae/png;base64,';
function base64toFile(data, fileName) {
    const dataArr = data.split(",");
    const byteString = atob(dataArr[1]);
    const options = {
        type: "image/jpeg",
        endings: "native",
    };
    const u8Arr = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
        u8Arr[i] = byteString.charCodeAt(i);
    }
    return new File([u8Arr], `${fileName}.jpg`, options); // 返回文件流
}
//圖片新增與預覽
const uploadedImage = ref(null); // 初始化为 null
const uploadedImageFile = ref(null); // 初始化为 null

const handleImageUpload = (event) => {
    lessons.image = event.target.files[0];
    uploadedImageFile.value = event.target.files[0]; // 存储上传的文件
    uploadedImage.value = URL.createObjectURL(event.target.files[0]); // 显示预览图片




}
onBeforeUnmount(() => {
    if (uploadedImage.value) {
        URL.revokeObjectURL(uploadedImage.value);
    }
});
//取得課程資料
const lessons = ref([])
const subjectId = ref()
const image = ref([])
tutorlink.post(`/findLessons/${lessonId}`).then((response) => {
    lessons.value = response.data
    subjectId.value = lessons.value.subject.subjectId
    image.value = lessons.value.image
    console.log('image', lessons.value.image);
    uploadedImageFile.value = base64toFile(str + lessons.value.image, "file");
    console.log("imgfile:", uploadedImageFile);

})

const subjects = ref([]);
const subjectData = ref("");
tutorlink.get("/allSubjects").then((response) => {
    subjects.value = response.data;
    if (subjects.value.length > 0) {
        subjectData.value = subjects.value[0].subjectId;
    }
    console.log(response.data);
});



const edit = async () => {
    console.log('edit 函數被調用');
    const formData = new FormData();
    formData.append('lessonName', lessons.value.lessonName)
    formData.append('price', lessons.value.price)
    formData.append('subject', subjectId.value)
    formData.append('meetingURL', lessonDetail.value.meetingUrl)
    formData.append('information', lessonDetail.value.imformation)
    formData.append('image', uploadedImageFile.value)


    for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
    }

    const response = await tutorlink.put(`/updateLessons/${lessonId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });

    router.push('/member/teacher/mylesson');

}


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

.editContainer {

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

.form {
    margin-top: 16px;
    border: 3px solid black;
    border-radius: 16px;
    background-color: #d3d3d3;
}
</style>