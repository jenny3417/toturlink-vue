<template>
    <Navbar></Navbar>
    <div class="container">
        <div>
            傳來的參數:{{ leesonId }}
            <br>
            後端送來的值:{{ lessonContent }}
        </div>

        <div style="margin-top: 120px;">
            <h2 style="text-align: center; margin-bottom: 16px;">編輯課程內容</h2>
            <CkEditor :editorContent="lessonContent" @emitContent="handleEditorContentUpdate"></CkEditor>
        </div>
        <div class="checkBtn-block">
            <RouterLink to="/member/teacher/mylesson">
                <button type="button" class="checkBtn cancel">取消</button>
            </RouterLink>
            <RouterLink to="/member/lesson/checkEdit">
                <button type="button" class="checkBtn upload">預覽</button>
            </RouterLink>
        </div>

    </div>
</template>
    
<script setup>
import CkEditor from '@/components/lessons/CkEditor.vue';
import Navbar from '@/components/public/Navbar.vue';
import { useRoute } from 'vue-router';
import tutorlink from '@/api/tutorlink.js';
import { ref } from 'vue';

const route = useRoute();
const leesonId = route.params.lessonId

const lessondetail = ref([]);
let lessonContent = ref('');
//取得課程詳細資料
tutorlink.get(`/findLessonDetailByLessonId?lessonId=${leesonId}`).then((response) => {
    lessondetail.value = response.data;
    console.log(lessondetail.value.imformation);
    lessonContent.value = lessondetail.value.imformation
})

const handleEditorContentUpdate = (content) => {
    lessonContent.value = content;
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
    background-color: #fff;
}

.upload {
    border: 1px solid green;
    color: green;
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