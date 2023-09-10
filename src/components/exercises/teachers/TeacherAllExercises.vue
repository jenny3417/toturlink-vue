<template>
    <!-- <h1>我的習題</h1> -->
    <div class="loading" v-if="isDataLoading">
        <n-spin :size="100" stroke="#66CCFF" />
    </div>
    <div class="exerciseLinkWrap">
        我的試卷
        <a href="/member/addExercise" target="_blank">
            <n-button strong secondary type="warning">
                +新增試卷
            </n-button>
        </a>
    </div>
    <div class="exerciseWrap">
        <div v-if="exercises.length > 0">
            <div class="exerciseCards" v-for="exercise in exercises">
                <ExercisesCard :sId="exercise.exerId" :lessonId="exercise.lessonId" :data="exercise"
                    @deleteExercise="getExercise"></ExercisesCard>
            </div>

        </div>
        <div v-else-if="dataState" class="noData">
            <n-card hoverable>
                <n-result status="info" title="沒有試卷資料" description="你可以按一下『黃色按鈕』新增試卷" />

                <n-space justify="center">
                    <a href="/member/addExercise" target="_blank">
                        <n-button strong secondary type="warning">
                            +新增試卷
                        </n-button>
                    </a>
                </n-space>

            </n-card>
        </div>




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
const isDataLoading = ref(true)

const getExercise = async () => {
    const res = await tutorlinkTest.get(`teacher/myAllExercise?teacherId=${teacherId}`)
    console.log(res)
    dataState.value = true
    exercises.value = res.data
    isDataLoading.value = false
}
getExercise()

document.title = "我的習題"




</script>

<style scoped>
.n-card {
    border-color: #c3cacf;
    background-color: #dfe7ec;
}

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

.loading {
    position: absolute;
    z-index: 1;
    text-align: center;
    padding-top: 300px;
    width: 100%;
    height: 100%;
    background-color: #1b1b1bb6;
}

.noData {
    margin-left: 50px;
    margin-right: 50px
}
</style>
