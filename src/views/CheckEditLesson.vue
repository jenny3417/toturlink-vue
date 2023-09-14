<template>
    <Navbar></Navbar>
    <div class="container">
        <div class="checkInfo">
            <lessonInfo :price="price"></lessonInfo>
        </div>
        <div class="checkBtn-block">
            <RouterLink :to="{ name: 'Edit', params: { lessonId: lessonId } }">
                <button type="button" class="checkBtn cancel" @click="cancel">取消</button>
            </RouterLink>
            <RouterLink to="/member/teacher/mylesson">
                <button type="button" class="checkBtn upload">送出</button>
            </RouterLink>
        </div>
    </div>
</template>
    
<script setup>
import lessonInfo from '@/components/lessons/LessonInfo.vue';
import Navbar from '@/components/public/Navbar.vue';
import { useRoute } from 'vue-router';
import { ref, onMounted, onUnmounted } from 'vue';
const route = useRoute();

const lessonName = ref({})
const price = ref({})
const meetingUrl = ref({})
const lessonContent = ref({})
const uploadImage = ref({})
console.log(route.params.lessonId);
const str = 'data:imagae/png;base64,';

onMounted(() => {
    lessonName.value = route.query.lessonName
    price.value = route.query.price
    meetingUrl.value = route.query.meetingUrl
    lessonContent.value = route.query.lessonContent
    uploadImage.value = route.query.uploadImage
    console.log("課程資料")
    console.log(lessonName.value)
    console.log(price.value)
    console.log(meetingUrl.value)
    console.log(lessonContent.value)
    console.log(uploadImage.value)

})

const cancel = () => {
    console.log("cancel")
    route.push('lessonInfo')
}


</script>
    
<style scoped>
.checkInfo {
    border: 3px solid black;
    margin-top: 120px;
}

.checkBtn-block {
    display: flex;
    justify-content: space-evenly;
    margin-top: 32px;
}

.checkBtn {
    width: 120px;
    height: 60px;
    border-radius: 10%;
    background-color: #fff;
}

.upload {
    border: 1px solid green;
    color: green;
}

.upload:hover {
    border: 1px solid green;
    color: #fff;
    background-color: green;
}

.upload:active {
    border: 1px solid green;
    color: #fff;
    background-color: rgb(24, 83, 24);
}

.cancel {
    border: 1px solid red;
    color: red;
}

.cancel:hover {
    border: 1px solid red;
    color: #fff;
    background-color: red;
}

.cancel:active {
    border: 1px solid red;
    color: #fff;
    background-color: rgb(107, 16, 16);
}
</style>