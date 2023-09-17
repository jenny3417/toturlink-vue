<template>
    <!-- <h1>我的習題</h1> -->
    <div class="exerciseLinkWrap">

        <RouterLink class="exerciseLink" to="#">
            <n-button quaternary round type="success">
                <n-icon size="15px">
                    <MdCheckmarkCircle />
                </n-icon>
                已完成習題
            </n-button>
        </RouterLink> |
        <RouterLink class="exerciseLink" to="#">
            <n-button quaternary round type="warning">
                <n-icon size="15px">
                    <MdCloseCircle />
                </n-icon>
                未完成習題
            </n-button>
        </RouterLink> |
        <RouterLink class="exerciseLink" to="#">
            <n-button quaternary round type="error">
                <n-icon size="15px">
                    <MdSad />
                </n-icon>
                已過期習題
            </n-button>
        </RouterLink>
    </div>
    <!-- {{ exercisesData }} -->
    <div class="exerciseWrap">
        <div class="exerciseCards">
            <div v-for="exercise in exercisesData">
                <ExercisesCard :eData="exercise"></ExercisesCard>
            </div>
        </div>
    </div>

    <div class="noData" v-if="isNoData">
        <n-card hoverable style="background-color:#dfe7ec; border-color: #c3cacf;">
            <n-result status="info" title="目前無可用試卷" description="你可以後買課程後與老師聯絡索取" />
        </n-card>
    </div>
</template>

<script setup>
import ExercisesCard from '@/components/exercises/students/studentsComponents/ExercisesCard.vue';
import { NButton, NIcon, } from 'naive-ui';
import { MdCheckmarkCircle, MdCloseCircle, MdSad } from '@vicons/ionicons4'
import tutorlink from '@/api/tutorlink.js';
import { ref, computed, onUnmounted } from 'vue';

const exercisesData = ref(null)
const isNoData = computed(() => {
    if (exercisesData.value === null || exercisesData.value.length === 0) {
        return true
    }
    return false
})
const getExercises = async () => {
    let res = await tutorlink.get('/student/myAllExercise')
    if (res.data.errorCode == 200) {
        exercisesData.value = res.data.data
    } else {
        console.log(res.data.errorMsg)
    }

}
getExercises()

setInterval(() => {
    getExercises()
}, 10000)


let autoUpdate = setInterval(() => {
    getExercises()
}, 1000)

setInterval(autoUpdate)


onUnmounted(() => {
    clearInterval(autoUpdate)
    console.log('unmounted');
})









</script>

<style scoped>
.exerciseLinkWrap {
    padding: 10px 0 0 50px;
}

.exerciseWrap {
    display: flex;
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
    display: flex;
    width: 90%;
    margin: 0 auto;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;

}

.noData {
    margin-left: 50px;
    margin-right: 50px
}
</style>
