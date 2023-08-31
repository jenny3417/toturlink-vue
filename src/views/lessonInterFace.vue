<template>
    <Navbar></Navbar>
    <div class="container">
        <lessonInfo></lessonInfo>
        <!-- 第二塊components -->
        <div>
            <h1>這裡會是行事曆</h1>
        </div>
        <hr>
        <!-- 第三塊componment -->
        <div>
            <h1>這裡會有統計數據</h1>
        </div>
        <hr>
        <!-- 第四塊componet -->
        <suggetTeacher></suggetTeacher>
    </div>
</template>
    
<script setup lang='ts'>
import lessonInfo from '../components/lessons/LessonInfo.vue';
import suggetTeacher from '../components/lessons/SuggetTeacher.vue';
import Navbar from '../components/public/Navbar.vue';;
</script>
    
<style></style>