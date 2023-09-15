<template>
    <div class="container">

        <div style="margin-left: 48px;">
            <h2>相似教師推薦</h2>
        </div>
        <div class="carousel-container">
            <div id="carouselLessonControls" class="carousel carousel-dark slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <div class="card-group">
                            <div class="card-spacing" v-for="(lesson, index) in firstCardGroup" :key="index">
                                <div class="card" style="width: 14rem;" v-if="index < 4">
                                    <img :src="lesson.imageUrl" class="img-top" alt="...">
                                    <div class="card-body">
                                        <h5 class="card-title">{{ lesson.teacherName }}</h5>
                                        <div class="card-text">{{ lesson.lessonName }}：{{ lesson.lessonContent }}
                                        </div>
                                        <button type="button" class="suggetTeacher">查看老師</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <div class="card-group">
                            <div class="card-spacing" v-for="(lesson, index) in secondCardGroup" :key="index">
                                <div class="card" style="width: 14rem;" v-if="index < 4">
                                    <img :src="lesson.imageUrl" class="img-top" alt="...">
                                    <div class="card-body">
                                        <h5 class="card-title">{{ lesson.teacherName }}</h5>
                                        <div class="card-text">{{ lesson.lessonName }} : {{ lesson.lessonContent }}
                                        </div>
                                        <button type="button" class="suggetTeacher">查看老師</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="carousel-controls-container">
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselLessonControls"
                        data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true" style="color:;"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselLessonControls"
                        data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<!-- -->

<script setup>
import { ref } from 'vue'

const lessons = ref([
    { imageUrl: "https://picsum.photos/seed/picsum/200/300", teacherName: '陳小明', lessonName: "英文課", lessonContent: "基礎寫作技巧養寫作基本功，提升表達能力。" },
    { imageUrl: "https://picsum.photos/seed/picsum/200/300", teacherName: '陳小明', lessonName: "英文課", lessonContent: "基礎寫作技巧養寫作基本功，提升表達能力。" },
    { imageUrl: "https://picsum.photos/seed/picsum/200/300", teacherName: '陳小明', lessonName: "英文課", lessonContent: "基礎寫作技巧養寫作基本功，提升表達能力。" },
    { imageUrl: "https://picsum.photos/seed/picsum/200/300", teacherName: '陳小明', lessonName: "英文課", lessonContent: "基礎寫作技巧養寫作基本功，提升表達能力。" },
    { imageUrl: "https://picsum.photos/seed/picsum/200/300", teacherName: '陳老師', lessonName: "英文課", lessonContent: "基礎寫作技巧養寫作基本功，提升表達能力。" },
    { imageUrl: "https://picsum.photos/seed/picsum/200/300", teacherName: '陳老師', lessonName: "英文課", lessonContent: "基礎寫作技巧養寫作基本功，提升表達能力。" },
    { imageUrl: "https://picsum.photos/seed/picsum/200/300", teacherName: '陳老師', lessonName: "英文課", lessonContent: "基礎寫作技巧養寫作基本功，提升表達能力。" },
    { imageUrl: "https://picsum.photos/seed/picsum/200/300", teacherName: '陳老師', lessonName: "英文課", lessonContent: "基礎寫作技巧養寫作基本功，提升表達能力。" }])

const firstCardGroup = lessons.value.slice(0, Math.ceil(lessons.value.length / 2))
const secondCardGroup = lessons.value.slice(Math.ceil(lessons.value.length / 2))


</script>

<style scoped>
.carousel-inner {
    max-height: 400px;
}

.carousel-container {
    width: 100%;
}

.carousel-controls-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 16px;

}

.card {
    flex: 1;
    width: 18rem;
    border: 1px solid black;
}

.carousel {

    margin: 0 auto;
}

.card-body {
    text-align: center;
}

.card-text {
    border: 1px solid silver;
}

.img-top {
    border-radius: 50%;
    width: 100px;
    height: 100px;
    margin: 0 auto;
    margin-top: 16px;
}

.card-body button {
    margin-top: 8px;
}

.suggetTeacher {
    width: 120px;
    height: 40px;
    border-radius: 5px;
    background-color: #fff;
    border-color: #759df0;
    color: #759df0;
}

.suggetTeacher:hover {
    background-color: #759df0;
    color: #fff;
}

.carousel-control-prev {
    width: 80px;
    height: 100%;
    margin: -10px;
}

.carousel-control-next {
    height: 100%;
    width: 80px;
    margin: -1px;
}

.card-spacing {
    margin-right: 8px;

}

.card-group {
    display: flex;
    justify-content: space-evenly;
}
</style>