<script setup>
import seeLesson from '@/components/lessons/SeeMyLesson.vue'
import Navbar from '@/components/public/Navbar.vue';
</script>

<template>
    <div class="container">
        <seeLesson></seeLesson>
        <div style="text-align: center;margin-top: 5px; ">
            <RouterLink to="/member/lesson/insert">
                <button type="submit" class="img-button"><img src="@/assets/lessonImage/add-circle-outline.svg" class="add">
                    新增課程</button>
            </RouterLink>
        </div>
    </div>
</template>

<style scoped>
.img-button {
    border: none;
    background-color: #e9ecef;
    cursor: pointer;
    font-size: 48px;
}

img,
svg {
    width: 80px;
}
</style>