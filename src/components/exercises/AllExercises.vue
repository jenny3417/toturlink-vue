<template>
    <h1>我的習題</h1>
    <RouterLink to="/#">已完成習題</RouterLink> |
    <RouterLink to="/#">未完成習題</RouterLink> |
    <RouterLink to="/#">已過期習題</RouterLink>

    <div class="exerciseCard">
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
        <AllExercisesCard></AllExercisesCard>

    </div>
</template>

<script setup>
import AllExercisesCard from '@/components/AllExercisesCard.vue';
</script>

<style scoped>
.exerciseCard {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
</style>
