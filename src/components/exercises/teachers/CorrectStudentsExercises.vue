<template>
    <!-- <h1>我的習題</h1> -->
    <div class="exerciseLinkWrap">
        林老師數學教室的已繳交試卷

    </div>


    <div class="exerciseWrap">
        <div class="exerciseCards">
            <StudentsExerciseCard></StudentsExerciseCard>
            <StudentsExerciseCard></StudentsExerciseCard>
            <StudentsExerciseCard></StudentsExerciseCard>
            <StudentsExerciseCard></StudentsExerciseCard>
        </div>
    </div>
</template>

<script setup>
import StudentsExerciseCard from '@/components/exercises/teachers/teachersComponents/StudentsExerciseCard.vue';
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
