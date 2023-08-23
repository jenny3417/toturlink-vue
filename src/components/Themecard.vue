<template>
    <div class="section_title" style="height: auto;">
        <div class="title">
            <div class="item-title">
                精選主題
            </div>
        </div>
        <theme></theme>
    </div>
    <div class="section_title" style="height: auto;">
        <div class="title">
            <div class="item-title">
                熱門課程
            </div>
        </div>
        <card></card>
    </div>
    <div class="section_title" style="height: auto;">
        <div class="title">
            <div class="item-title">
                最新開課
            </div>
        </div>
        <card></card>
    </div>
    <div class="section_title" style="height: auto;">
        <div class="title">
            <div class="item-title">
                促銷課程
            </div>
        </div>
        <card></card>
    </div>
</template>
    
<script setup lang="ts">
import theme from './theme.vue';
import card from "./Card.vue"
// import { ref } from 'vue'
// const selectedCategory = ref('language');
// const categorys = ref(['語言學習', '升學補習', '專業科目']);
// const handleButtonClick = (category) => {
//     if (category == '語言學習') {
//         selectedCategory.value = "language";
//     } else if (category == '升學補習') {
//         selectedCategory.value = "enrollment";
//     } else if (category == '專業科目') {
//         selectedCategory.value = "major";
//     }

// }

</script>
    
<style>
.title {
    display: flex;
    margin-top: 40px;
    margin-bottom: 10px;
}

.item-title {
    box-sizing: border-box;
    padding: 8px 16px;
    font-size: 30px;
    font-weight: 500;
    color: #9d8189;
    border: none;
}
</style>