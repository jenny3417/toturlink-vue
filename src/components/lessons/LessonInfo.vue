<template>
    <div class="container">
        <div style="
    border-radius: 25px;    
    margin: 16px;">
            <div class="lesson-info-block">
                <div style="padding-left: 32px;">
                    <h2>{{ lessons.lessonName }}</h2>
                </div>
                <div class="title">
                    <div>
                        <img :src="`${str}${lessons.image}`" alt="upload" style="
                       width: 400px;height: 240px;">
                    </div>
                    <div style="text-align: center;">
                        <button type="button" class="reportbtn">檢舉</button>
                        <priceButton :price="price"></priceButton>
                    </div>
                </div>
            </div>
            <br>
            <br>
            <br>
            <br>
            <div style="display: inline-block; position: relative; bottom: 120px; left: 80px;">
                <h2 style="margin-top: 8px;">課程內容</h2>
                <div class="info-block" :style="{ height: blockHeight }">
                    <div v-html="lessonDetail.imformation"></div>
                    <!-- <div class="info-btn">
                    <button @click="toggleText">
                        {{ showPartialText ? '顯示更多' : '顯示更少' }}
                    </button>
                </div> -->
                </div>
            </div>
        </div>
    </div>
</template>
    
<script setup>

import { onMounted, ref, } from 'vue';
import tutorlink from '@/api/tutorlink.js';
import { useRoute } from 'vue-router'
const route = useRoute()
const testLessonId = ref(5)

//取得課程詳細資料
const lessonDetail = ref([])
tutorlink.get(`/findLessonDetailByLessonId?lessonId=${testLessonId.value}`).then((response) => {

    lessonDetail.value = response.data

})
//取得課程資料
const lessons = ref([])
const subjectId = ref()
const price = ref('')
tutorlink.post(`/findLessons/${testLessonId.value}`).then((response) => {
    lessons.value = response.data
    console.log(lessons);
    subjectId.value = lessons.value.subject.subjectId
    price.value = lessons.value.price
    console.log(price.value);
})
//讀取Base64資料的Headers
const str = 'data:imagae/png;base64,';



// const text = lessonDetail.imformation;
const showPartialText = ref(true);
const blockHeight = ref("auto");

// const partialText = text.slice(0, 20);
// const fullText = text;



// const toggleText = () => {
//     showPartialText.value = !showPartialText.value;
//     blockHeight.value = showPartialText.value ? "auto" : "100%";
// };
import priceButton from './LessonPriceButton.vue';


</script>
    
<style scoped>
.lesson-info-block {
    margin-left: 48px;
    margin-top: 16px;
}

.lesson-info-block img {
    margin-top: 16px;
    width: 400px;
    height: 240px;
}

.info-block {

    display: inline-block;
    overflow: hidden;

    width: 480px;

    transition: height 0.3s ease;

    white-space: pre-wrap;
    word-wrap: break-word;

    font-size: x-large;
}

.info-btn {
    text-align: right;
}

.info-btn button {
    border: none;
    border-bottom: 1px solid #72aecf;
    color: #72aecf;
    background-color: #fff;
}

.title {
    display: flex;
    justify-content: space-around;
    margin-right: 80px;

}



.shopping-btn {
    display: flex;
    flex-direction: column;
    margin-top: 24px;
    gap: 32px;
}

.shopping-btn button {
    width: 320px;
    height: 80px;

}

.price {
    text-align: left;
}

.reportbtn {
    border: 1px solid red;
    color: red;
    background-color: #fff;
    width: 240px;
    height: 80px;
    border-radius: 15px;
}

.reportbtn:hover {
    border: 1px solid red;
    color: #fff;
    background-color: red;
}

.reportbtn:active {
    border: 1px solid red;
    color: #fff;
    background-color: rgb(107, 16, 16);
}
</style>