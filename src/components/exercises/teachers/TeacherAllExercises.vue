<template>
    <!-- <h1>我的習題</h1> -->
    <div class="exerciseLinkWrap">
        我的試卷
        <a href="/member/addExercise" target="_blank">
            <n-button strong secondary type="warning">
                新增試卷
            </n-button>
        </a>
    </div>
    <div class="exerciseWrap">
        <div v-if="exercises.length > 0">
            <div class="exerciseCards" v-for="exercise in exercises">
                <ExercisesCard :sId="exercise.exerId" :data="exercise"></ExercisesCard>
            </div>

        </div>
        <div v-else-if="dataState"><n-spin size="large" /></div>
        <div v-else>沒有資料</div>



    </div>
</template>

<script setup>
import ExercisesCard from '@/components/exercises/teachers/teachersComponents/ExerciseCard.vue';
import { NButton, NIcon, } from 'naive-ui';
import { ref } from 'vue'
import { MdCheckmarkCircle, MdCloseCircle, MdSad } from '@vicons/ionicons4'
import tutorlinkTest from '@/api/tutorlinkTest.js'

const teacherId = 1
const exercises = ref([])
const dataState = ref(false)
const getExercise = async () => {
    const res = await tutorlinkTest.get(`teacher/myExercise?teacherId=${teacherId}`)
    console.log(res)
    dataState.value = true
    exercises.value = res.data
}
getExercise()






</script>

<style scoped>
.exerciseLinkWrap {
    margin-bottom: 10px;
    padding: 10px 0 0 50px;
}

.exerciseWrap {
    /* display: flex; */
    justify-content: center;
}

.exerciseLink {
    font-size: 20px;
    color: rgb(145, 145, 145);

}

.exerciseLink:hover {
    color: rgb(80, 72, 72);
}

.exerciseCards {
    /* display: flex; */
    width: 90%;
    margin: 0 auto;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;

}
</style>
