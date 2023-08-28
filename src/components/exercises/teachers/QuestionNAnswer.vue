<template>
    <n-button quaternary round type="success">
        <n-icon size="15px">
            <MdCheckmarkCircle />
        </n-icon>
        已回應
    </n-button> |
    <n-button quaternary round type="warning">
        <n-icon size="15px">
            <MdCloseCircle />
        </n-icon>
        未回應
    </n-button>

    <div class="ansWrap">
        <QuestionBox></QuestionBox>
        <QuestionBox></QuestionBox>
        <QuestionBox></QuestionBox>
        <QuestionBox></QuestionBox>
        <QuestionBox></QuestionBox>
    </div>
</template>

<script setup>
import QuestionBox from '@/components/exercises/teachers/teachersComponents/QuestionBox.vue'
import { MdCheckmarkCircle, MdCloseCircle, MdSad } from '@vicons/ionicons4'
</script>

<style scoped>
/* .ansWrap {

    margin: 10px;
    padding: 10px 0 0 50px;
} */

.ansWrap {
    display: flex;
    width: 90%;
    margin: 10px auto;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;

}
</style>
