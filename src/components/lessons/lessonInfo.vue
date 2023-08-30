<template>
    <div class="container">
        <div class="lesson-info-block">
            <h2>XXX老師的基礎韓文課程</h2>
            <div class="title">
                <div>
                    <img src="@/assets/lessonImage/image-outline.svg">
                </div>
                <div style="text-align: center;">
                    <button type="button" class="reportbtn">檢舉</button>
                    <priceButton></priceButton>
                </div>
            </div>
        </div>
        <br>
        <br>
        <br>
        <br>
        <div style="display: inline-block; position: relative; bottom: 80px;">
            <h2 style="margin-top: 8px;">課程內容</h2>
            <div class="info-block" :style="{ height: blockHeight }">
                {{ showPartialText ? partialText : fullText }}
                <div class="info-btn">
                    <button @click="toggleText">
                        {{ showPartialText ? '顯示更多' : '顯示更少' }}
                    </button>
                </div>
            </div>
        </div>
    </div>
    <hr>
</template>
    
<script setup lang='ts'>

import { ref } from 'vue';

const text = "歡迎來到韓文基礎課程！在這門課程中，我們將帶你進入韓國文化的奇妙世界。從基本的拼音和數字開始，你將學習如何閱讀和書寫韓文字。我們將深入探討韓文的語法結構，讓你能夠建立起基本的對話能力。通過有趣的對話練習和互動，你將學會用韓文表達自己的想法，並能夠介紹自己、問候他人以及討論時間和日期。我們課程中的第100個字，正是你將在這個旅程中學到的數字，從一到十，為你的韓文學習之旅劃上完美的句號。讓我們一起開始吧！222222222222222222222222222222222222222222222222222222222222222222222222222222222222";
const showPartialText = ref(true);
const blockHeight = ref("auto");

const partialText = text.slice(0, 20);
const fullText = text;

const toggleText = () => {
    showPartialText.value = !showPartialText.value;
    blockHeight.value = showPartialText.value ? "auto" : "100%";
};
import priceButton from './lessonPriceButton.vue';
</script>
    
<style scoped>
.lesson-info-block {
    margin-top: 120px;
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
    justify-content: space-between;
    margin-right: 300px;

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