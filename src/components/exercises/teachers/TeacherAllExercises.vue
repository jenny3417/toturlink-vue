<template>
    <!-- <h1>我的習題</h1> -->
    <div class="exerciseLinkWrap">
        我的試卷
        <a href="/addExercise" target="_blank">
            <n-button strong secondary type="warning">
                新增試卷
            </n-button>
        </a>
    </div>


    <div class="exerciseWrap">
        <div class="exerciseCards">
            <ExercisesCard sId="1"></ExercisesCard>
            <ExercisesCard></ExercisesCard>
            <ExercisesCard></ExercisesCard>
            <ExercisesCard></ExercisesCard>
            <ExercisesCard></ExercisesCard>


        </div>
    </div>
</template>

<script setup>
import ExercisesCard from '@/components/exercises/teachers/teachersComponents/ExerciseCard.vue';
import { NButton, NIcon, } from 'naive-ui';
import { MdCheckmarkCircle, MdCloseCircle, MdSad } from '@vicons/ionicons4'
</script>

<style scoped>
.exerciseLinkWrap {
    margin-bottom: 10px;
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
</style>
