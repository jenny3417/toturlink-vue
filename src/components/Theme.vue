<template>
    <Carousel v-bind="settings" :breakpoints="breakpoints">
        <Slide v-for="(lesson, index) in sortData" :id="index">
            <div class="item" :style="'background-image: url(' + lesson.imageUrl + ')'">
                <h4>{{ lesson.name }}</h4>
            </div>
        </Slide>
        <template #addons>
        </template>
    </Carousel>
</template>
    
<script setup>
import { Carousel, Navigation, Slide } from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'
import { ref } from 'vue';
const sortData = ref([
    { name: "英文家教", price: 336, type: "language", imageUrl: "https://picsum.photos/200/200?random=1" },
    { name: "日文家教", price: 336, type: "language", imageUrl: "https://picsum.photos/200/200?random=2" },
    { name: "韓文家教", price: 336, type: "language", imageUrl: "https://picsum.photos/200/200?random=3" },
    { name: "西班牙文家教", price: 336, type: "language", imageUrl: "https://picsum.photos/200/200?random=4" },
    { name: "法文家教", price: 336, type: "language", imageUrl: "https://picsum.photos/200/200?random=5" },
    { name: "德文家教", price: 336, type: "language", imageUrl: "https://picsum.photos/200/200?random=6" },
    { name: "中文家教", price: 336, type: "language", imageUrl: "https://picsum.photos/200/200?random=7" },
    { name: "數學家教", price: 336, type: "enrollment", imageUrl: "https://picsum.photos/200/200?random=10" },
    { name: "國文家教", price: 336, type: "enrollment", imageUrl: "https://picsum.photos/200/200?random=11" },
    { name: "歷史家教", price: 336, type: "enrollment", imageUrl: "https://picsum.photos/200/200?random=12" },
    { name: "地理家教", price: 336, type: "enrollment", imageUrl: "https://picsum.photos/200/200?random=13" },
    { name: "自然家教", price: 336, type: "enrollment", imageUrl: "https://picsum.photos/200/200?random=14" },
    { name: "科學家教", price: 336, type: "enrollment", imageUrl: "https://picsum.photos/200/200?random=16" },
    { name: "社會家教", price: 336, type: "enrollment", imageUrl: "https://picsum.photos/200/200?random=17" },
    { name: "會計家教", price: 336, type: "major", imageUrl: "https://picsum.photos/200/200?random=18" },
    { name: "經濟家教", price: 336, type: "major", imageUrl: "https://picsum.photos/200/200?random=19" },
    { name: "唱歌家教", price: 336, type: "major", imageUrl: "https://picsum.photos/200/200?random=20" },
    { name: "吉他家教", price: 336, type: "major", imageUrl: "https://picsum.photos/200/200?random=21" },
    { name: "鋼琴家教", price: 336, type: "major", imageUrl: "https://picsum.photos/200/200?random=22" },
    { name: "烏克麗麗家教", price: 336, type: "major", imageUrl: "https://picsum.photos/200/200?random=23" },
    { name: "小提琴家教", price: 336, type: "major", imageUrl: "https://picsum.photos/200/200?random=24" },
    { name: "貝斯家教", price: 336, type: "major", imageUrl: "https://picsum.photos/200/200?random28" },
])
const settings = {
    itemsToShow: 1,
    snapAlign: 'center'
};

const breakpoints = {
    // 700px and up
    400: {
        itemsToShow: 2,
        snapAlign: 'center',
    },
    770: {
        itemsToShow: 3,
        snapAlign: 'center',
    },
    1000: {
        itemsToShow: 4,
        snapAlign: 'center',
    },
    // 1024 and up
    1300: {
        itemsToShow: 5,
        snapAlign: 'start',
    },
    1500: {
        itemsToShow: 6,
        snapAlign: 'start',
    },
};
</script>
    
<style scoped> .item {
     text-align: left;
     width: 200px;
     height: 200px;
     padding: 5px;
     border-radius: 3px;
     display: flex;
     flex-direction: column-reverse;
 }

 h4 {
     color: #fff;
     font-weight: 400;
     font-size: 1.4375rem;
     margin-top: 0rem;
 }
</style>
