<template>
    <div class="Lesson-view" v-for="lesson in lessons" :key="lesson.lessonId" :value="lesson.lessonId">
        <div class="Lesson">
            <div style="display: flex; flex-direction: column;">
                <div>
                    <div class="delete-div">
                        <button type="button" class="img-button" data-bs-toggle="modal" data-bs-target="#deleteModal"><img
                                src="@/assets/lessonImage/close-circle-outline.svg" class="wrong"
                                @click="handleDeleteClick(lesson.lessonId)"></button>
                        <deleteLesson v-if="lessonId2" :lessonId="lessonId2"></deleteLesson>
                    </div>
                    <div class="lesson-div">
                        課程名稱 : {{ lesson.lessonName }}
                    </div>
                </div>
                <br>
                <br>

                <div>
                    <div style="display: flex; justify-content: space-between;">
                        <div class="lesson-div">
                            費用 : {{ lesson.price }}
                        </div>
                        <div class="move-btn">
                            <RouterLink :to="{ name: 'Edit', params: { lessonId: lesson.lessonId } }">
                                <button type="button" class="btn" @click="handleEditClick(lesson.lessonId)">編輯課程</button>
                            </RouterLink>
                            <button type="button" class="btn">查看課程評價</button>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </div>
</template>
    
<script setup>
import deleteLesson from '@/components/lessons/DeleteLesson.vue';
import { ref } from 'vue';
import tutorlink from '@/api/tutorlink.js';



const lessons = ref([])
tutorlink.get('/allLessons').then((response) => {
    lessons.value = response.data
})

//刪除課程
const lessonId2 = ref('');
const handleDeleteClick = (lessonId) => {
    console.log(lessonId);
    lessonId2.value = lessonId
}
//編輯課程
const lessonId3 = ref('');
const handleEditClick = (lessonId) => {
    console.log(lessonId)
    lessonId3.value = lessonId
}



</script>
    
<style scoped>
/* 邊框調整 */
.Lesson-view {
    margin-left: 5px;
    margin-right: 5px;
    border: 1px solid black;
    border-radius: 8px;
    margin-top: 16px;
    background-color: #dae3e5;
}

.Lesson {
    margin-left: 3px;
}

.delete-div {
    float: right;

}

/* 課程的字型大小 */
.lesson-div {
    font-size: larger;
    font-weight: bold;
    /* 將字體設置為粗體 */
}



/* 按鈕 */
.move-btn {
    display: flex;
    gap: 5px;
    position: relative;
    justify-content: flex-end;
    bottom: 8px;
    right: 8px;

}

/* 刪除按鈕 */
.wrong {
    width: 50px;
    height: 50px;
    margin-right: 16px;
}

/* 按鈕套入圖片 */
.img-button {
    border: none;
    background-color: #dae3e5;
    cursor: pointer;
    font-size: 48px;
    border-radius: 50%;
}

/* 編輯跟預覽評價按紐 */
.btn {
    border: 1px solid #0d3b66;
    background-color: #dae3e5;
    cursor: pointer;
    /* width: 110px;
    height: 40px; */
    color: #0d3b66;
}

.btn:hover {
    background-color: #0d3b66;
    border: 1px solid #0d3b66;
    color: rgb(255, 255, 255);
}

/* 新增按紐 */
.add {
    width: 60px;
    height: 60px;
}
</style>