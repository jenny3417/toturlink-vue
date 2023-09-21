<template>
    <div class="container">
        <div class="card cardStyle" style="width: 18rem;" v-for="teacher in teacherCard">
            <div class="cartImgStyle">
                <img :src="teacher.lessonImg" class="card-img-top cardImg" alt="...">
                <div class="favoriateIcon"><n-icon size="40">
                        <heart-outline />
                    </n-icon></div>
            </div>
            <div class="card-body text-start">
                <h5 class="card-title cardTitle">{{ teacher.className }}</h5>
                <div class="card-text cardText">{{ teacher.teacherInfo }}</div>

            </div>
            <div class="card-body text-end">
                <RouterLink to="/lesson/lessonInterFace">
                    <button type="button" class="btn btn-sm checkTeacher">看詳細>></button>
                </RouterLink>
            </div>
        </div>
    </div>
</template>
    
<script setup>
import { ref } from 'vue'

import { HeartOutline } from '@vicons/ionicons5'



const teacherCard = ref([
    {
        lessonImg: 'https://picsum.photos/200/150?random=1',
        className: '課程名稱',
        teacherInfo: '探索攝影藝術的基礎與技巧，解析攝影世界的奧秘與美感，歡迎加入我們的攝影初階入門課程！'
    },

])
</script>
    
<style scoped>
/* .checkTeacher {
    width: 120px;
    height: 40px;
    border-radius: 5px;
    background-color: #fff;
    border-color: #759df0;
    color: #759df0;
} */
.cardStyle {
    /* background-color: #ecf8f8; */
    max-height: 430px;
    border-radius: 15px;
}

.favoriateIcon {
    display: inline;
    position: absolute;
    top: -60px;
    transition: .3s;
    left: 235px;
    color: antiquewhite;
}

.cardTitle {
    color: #9d8189;
    font-weight: 500;
    font-size: 26px;
}

.cartImgStyle,
.cardStyle {
    overflow: hidden;
}

.cardImg {
    object-position: center center;
    max-width: 100%;
    max-height: 100%;
    transition: .3s;
}

.cardImg:hover,
.favoriateIcon:hover+.cardImg {
    transform: scale(1.1, 1.1);
}

.cardImg:hover+.favoriateIcon,
.favoriateIcon:hover {
    top: 3px;
}

.cardText {
    font-size: 16px;
}

.checkTeacher:hover {
    color: #9d8189;
}
</style>