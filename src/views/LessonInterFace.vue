<template>
    <Navbar></Navbar>
    <div class="container">
        <div class="lessonInterFace">
            <lessonInfo></lessonInfo>
            <hr>
            <!-- 第二塊components -->
            <div style="margin-left: 48px;">
                <h1>這裡會是行事曆</h1>
            </div>
            <hr>
            <!-- 第三塊componment -->
            <div style="margin-left: 48px;">
                <h1>這裡會有統計數據</h1>
            </div>
            <hr>
            <!-- 第四塊componet -->
            <suggetTeacher></suggetTeacher>
        </div>
    </div>
</template>
    
<script setup>
import lessonInfo from '@/components/lessons/LessonInfo.vue';
import suggetTeacher from '@/components/lessons/SuggetTeacher.vue';
import Navbar from '@/components/public/Navbar.vue';;
</script>
    
<style>
.lessonInterFace {
    border: 3px solid black;
    border-radius: 25px;
    margin-top: 16px;
}
</style>