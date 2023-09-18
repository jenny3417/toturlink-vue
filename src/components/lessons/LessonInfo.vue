<template>
    <div class="container">
        <div style="position: relative;">
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
                            <priceButton :price="price"></priceButton>
                        </div>
                    </div>
                </div>
                <br>
                <br>
                <br>
                <br>
                <div style="display: inline-block; position: relative; bottom: 80px; left: 80px;">
                    <h2 style="margin-top: 8px;">課程內容</h2>
                    <div class="info-block" :style="{ height: blockHeight }">
                        <div v-html="visibleContent"></div>
                        <div style="margin-left: 75%; display: inline-block;">
                            <button @click="toggleContent" v-if="showToggleButton" style="border: none;
                        background: none;color: #f77f00;
                        ">
                                {{ toggleButtonText }}
                            </button>
                        </div>
                    </div>
                </div>
                <div style="display: inline-block; position: absolute; right: 16px; bottom: 16px;">
                    <button type="button" class="reportbtn">檢舉</button>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script setup>

import { onMounted, ref, watch } from 'vue';
import tutorlink from '@/api/tutorlink.js';
import { useRoute } from 'vue-router'
import priceButton from './LessonPriceButton.vue';
const route = useRoute()
const testLessonId = ref(2)
//取得課程ID
const props = defineProps({
    lessonId: {
        type: Number
    }
})
//取得課程詳細資料
const lessonDetail = ref([])
const content = ref('')
const visibleContent = ref('');
const fullContentVisible = ref(false);
tutorlink.get(`/findLessonDetailByLessonId?lessonId=${props.lessonId}`).then((response) => {
    lessonDetail.value = response.data
    content.value = lessonDetail.value.imformation
    visibleContent.value = content.value.slice(0, 43);
})
//取得課程資料
const lessons = ref([])
const subjectId = ref()
const price = ref('')
tutorlink.post(`/findLessons/${props.lessonId}`).then((response) => {
    lessons.value = response.data
    console.log(lessons);
    subjectId.value = lessons.value.subject.subjectId
    price.value = lessons.value.price
    // console.log(price.value);
})
//讀取Base64資料的Headers
const str = 'data:imagae/png;base64,';


//調整課程內容的顯示更多、顯示更少
const blockHeight = ref("auto");
const showToggleButton = ref(true); // 初始化為顯示按鈕
const isContentVisible = ref(false);
const toggleButtonText = ref('顯示更多');

const toggleContent = () => {
    fullContentVisible.value = !fullContentVisible.value;
    if (fullContentVisible.value) {
        visibleContent.value = content.value; // 顯示完整內容
    } else {
        visibleContent.value = content.value.slice(0, 43); // 顯示前20個字符
    }
    blockHeight.value = fullContentVisible.value ? 'auto' : '120px';
    toggleButtonText.value = fullContentVisible.value ? '顯示更少' : '顯示更多';
};







onMounted(() => {
    // 如果內容長度大於20，才顯示切換按鈕
    if (content.value.length > 43) {
        showToggleButton.value = true;
    }
});

// 監聽isContentVisible變化，根據是否顯示內容改變按鈕文本
watch(isContentVisible, (newVal) => {
    toggleButtonText.value = newVal ? '顯示更少' : '顯示更多';
    console.log('isContentVisible:', newVal);
    console.log('visibleContent:', visibleContent.value);
});






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
    width: 120px;
    height: 40px;
    border-radius: 15px;
    position: absolute;
    right: 16px;
    bottom: 16px;
    z-index: 1;
    /* 以确保按钮在上方 */
    /* 其他样式保持不变 */
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