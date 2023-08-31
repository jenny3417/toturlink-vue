<template>
    <navbar></navbar>
    <div class="container favoriatePage">
        <h1>我的收藏</h1>
        <div class="favoriateContant row row-cols-auto">
            <div class="col m-auto my-3 p-0" style="width: 18rem;" v-for="item in 12">
                <teacher-card></teacher-card>
            </div>
        </div>
    </div>
</template>
<script setup>
import navbar from "@/components/public/Navbar.vue"
import teacherCard from "../components/lessons/TeacherCard.vue";
</script>
<style scoped>
.card {
    min-height: 150px;
}

.cardImg {
    width: 100%;
}

.favoriateLink {
    color: #9d8189;
}

.favoriateLink:hover {
    color: #d5bdaf
}
</style>