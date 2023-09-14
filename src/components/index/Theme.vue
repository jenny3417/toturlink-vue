<template>
    <Carousel v-bind="settings" :breakpoints="breakpoints">
        <Slide v-for="(lesson, index) in sortData" :id="index">
            <div class="item" :style="'background-image: url(' + lesson.imageUrl + ')'">
                <h4>{{ lesson.subjectContent }}</h4>
            </div>
        </Slide>
        <template #addons>
        </template>
    </Carousel>
</template>
    
<script setup>
import { Carousel, Navigation, Slide } from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'
import { ref, defineProps } from 'vue';
const sortData = ref([
    { subjectContent: "數學", imageUrl: "https://picsum.photos/200/200?random=1" },
    { subjectContent: "科學", imageUrl: "https://picsum.photos/200/200?random=2" },
    { subjectContent: "歷史", imageUrl: "https://picsum.photos/200/200?random=3" },
    { subjectContent: "英文", imageUrl: "https://picsum.photos/200/200?random=4" },
    { subjectContent: "藝術", imageUrl: "https://picsum.photos/200/200?random=5" },
    { subjectContent: "日文", imageUrl: "https://picsum.photos/200/200?random=6" },
    { subjectContent: "國文", imageUrl: "https://picsum.photos/200/200?random=7" }
])
const settings = {
    itemsToShow: 1,
    snapAlign: 'center',
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
