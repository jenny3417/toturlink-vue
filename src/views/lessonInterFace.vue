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
<<<<<<< HEAD
import lessonInfo from '../components/lessons/lessonInfo.vue';
import suggetTeacher from '../components/lessons/suggetTeacher.vue';
import Navbar from '../components/public/Navbar.vue';;
=======
import lessonInfo from '@/components/lessonInfo.vue';
import suggetTeacher from '@/components/suggetTeacher.vue';
import Navbar from '@/components/public/Navbar.vue';
>>>>>>> e7f2969494386480400043e63faaafa76cc26c2e
</script>
    
<style></style>