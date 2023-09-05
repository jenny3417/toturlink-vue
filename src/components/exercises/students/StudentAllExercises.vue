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
    <div class="exerciseWrap">
        <div class="exerciseCards">
            <ExercisesCard eId="123"></ExercisesCard>
            <ExercisesCard eId="223"></ExercisesCard>
            <ExercisesCard></ExercisesCard>
            <ExercisesCard></ExercisesCard>
            <ExercisesCard></ExercisesCard>
            <ExercisesCard></ExercisesCard>
            <ExercisesCard></ExercisesCard>
            <ExercisesCard></ExercisesCard>
            <ExercisesCard></ExercisesCard>
            <ExercisesCard></ExercisesCard>
            <ExercisesCard></ExercisesCard>
        </div>
    </div>
</template>

<script setup>
import ExercisesCard from '@/components/exercises/students/studentsComponents/ExercisesCard.vue';
import { NButton, NIcon, } from 'naive-ui';
import { MdCheckmarkCircle, MdCloseCircle, MdSad } from '@vicons/ionicons4'
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
</style>
