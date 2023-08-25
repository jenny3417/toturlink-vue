<template>
    <!-- <h1>我的習題</h1> -->
    <div class="exerciseLinkWrap">
        <RouterLink class="exerciseLink" to="/#">已完成習題</RouterLink> |
        <RouterLink class="exerciseLink" to="/#">未完成習題</RouterLink> |
        <RouterLink class="exerciseLink" to="/#">已過期習題</RouterLink>
    </div>
    <div class="exerciseWrap">
        <div class="exerciseCards">
            <AllExercisesCard eId="123"></AllExercisesCard>
            <AllExercisesCard></AllExercisesCard>
            <AllExercisesCard></AllExercisesCard>
            <AllExercisesCard></AllExercisesCard>
            <AllExercisesCard></AllExercisesCard>
            <AllExercisesCard></AllExercisesCard>
            <AllExercisesCard></AllExercisesCard>
            <AllExercisesCard></AllExercisesCard>
            <AllExercisesCard></AllExercisesCard>
            <AllExercisesCard></AllExercisesCard>
            <AllExercisesCard></AllExercisesCard>
        </div>
    </div>
</template>

<script setup>
import AllExercisesCard from '@/components/exercises/exercisesComponents/ExercisesCard.vue';
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
