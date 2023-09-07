<template>
    <div class="container">
        <div class="card cardStyle" style="width: 18rem;" v-for="teacher in teacherCard">
            <div>
                <img :src="teacher.lessonImg" class="card-img-top cardImg" alt="...">
            </div>
            <div class="card-body text-start">
                <h5 class="card-title cardTitle">{{ teacher.className }}</h5>
                <div class="card-text cardText">{{ teacher.teacherInfo }}</div>

            </div>
            <div class="card-body text-end">
                <RouterLink to="/lesson/lessonInterFace">
                    <button type="button" class="btn btn-outline-info btn-sm checkTeacher">看詳細>></button>
                </RouterLink>
            </div>
        </div>
    </div>
</template>
    
<script setup>
import { ref } from 'vue'
import image from '@/assets/lessonImage/image-outline.svg'
const teacherCard = ref([
    {
        lessonImg: 'https://picsum.photos/200/150?random=1',
        className: '課程名稱',
        teacherInfo: '探索攝影藝術的基礎與技巧，解析攝影世界的奧秘與美感，歡迎加入我們的攝影初階入門課程！'
    }
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
}

.cardTitle {
    color: #9d8189;
    font-weight: 500;
    font-size: 26px;
}

.cardImg {
    max-height: 50%;
}

.cardText {
    font-size: 16px;
}

.checkTeacher:hover {
    color: #fff;
}
</style>