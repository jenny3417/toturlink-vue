<script setup>
// import deleteLesson from '@/components/deleteLesson.vue';
import seeLesson from '../components/lessons/seemylesson.vue'
import Navbar from '../components/public/Navbar.vue';
</script>

<template>
    <Navbar></Navbar>
    <div class="container">
        <seeLesson></seeLesson>
        <div style="text-align: center;margin-top: 5px; ">
            <RouterLink to="/lesson/insertLesson">
                <button type="submit" class="img-button"><img src="@/assets/lessonImage/add-circle-outline.svg" class="add">
                    新增課程</button>
            </RouterLink>
        </div>
    </div>
</template>

<style scoped>
.img-button {
    border: none;
    background-color: #fff;
    cursor: pointer;
    font-size: 48px;
}

img,
svg {
    width: 80px;
}
</style>