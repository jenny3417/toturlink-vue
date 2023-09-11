<template>
    <n-progress type="line" :show-indicator="false" :status="status" :percentage="timeBar" />

    <Navbar></Navbar>

    <!-- <h1>我的習題</h1> -->
    <div class="exerciseScoreWrap">
        <h2 class="exerciseName">試卷1{{ $route.params.id }}</h2>
        <h3 class="exerciseScore">
            <n-countdown :duration="duration" :active="active" @finish="noTime" />
        </h3>

        <div class="exercisesWrap">
            <Choise count="1"></Choise>
            <MultipleChoice count="2"></MultipleChoice>
            <FillIn count="3"></FillIn>
        </div>
        <n-space justify="center">
            <n-button strong secondary round type="primary">
                交卷
            </n-button>
        </n-space>

    </div>
</template>

<script setup lang="js">
import Navbar from '@/components/public/Navbar.vue'

import Choise from '@/components/exercises/students/studentsComponents/Choice.vue'
import MultipleChoice from '@/components/exercises/students/studentsComponents/MultipleChoice.vue'
import FillIn from '@/components/exercises/students/studentsComponents/FillIn.vue'

import { NCollapse, NCollapseItem, NLoadingBarProvider } from 'naive-ui'

import { ref, onMounted, watch, computed } from "vue";
import { useMessage, useDialog } from "naive-ui";

const containerRef = ref(void 0);
const active = ref(false);
const message = useMessage();
const dialog = useDialog();
const duration = ref(30000)

const noTime = () => {
    // console.log("時間到");
    // document.body.style.backgroundColor = "#ffaaaa";

    dialog.warning({
        title: "時間到了",
        content: "請交卷",
        positiveText: "交卷",
        closable: false,
        maskClosable: false,
        onPositiveClick: () => {
            message.success("已交卷");
        },
    });
}
let timer = null
const orginalTime = 30 - 1
let time = orginalTime
let status = "success"
// const timeComputed = 0
const timeBar = ref(100)


const countdown = () => {

    console.log(timeBar)
    active.value = true;
    time--;
    timeBar.value = 100 * (time / orginalTime)
    if (timeBar.value < 30) {
        status = "warning"
    }
    if (timeBar.value < 10) {
        status = "error"
    }
    if (time == 0) {
        clearInterval(timer)
    }
}


onMounted(() => {

    document.title = "試卷1";
    timer = setInterval(countdown, 1000)

})



</script>

<style scoped>
.n-progress {
    position: fixed;
    bottom: 0;
}

.exerciseScore {
    position: fixed;
}

.exerciseScoreWrap {
    margin: 5px 10px 10px 10px;
    padding: 10px;
}

.exerciseName {
    text-align: center;
}

.exerciseScore {
    text-align: right;
}

.exercisesWrap {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

.queWrap {
    padding: 20px 50px;
    margin: 0 50px;
    border-radius: 10px;
}

.queWrap textarea {
    width: 100%;
}

.queInput {
    width: 100%;
    padding: 20px 50px;
    border: 1px solid #ccc;

    border-radius: 10px;
}

.queInput:focus {
    outline: none;
    border: 1px solid #000;
}

.queInput::placeholder {
    font-size: 16px;
}

.ansWrap {
    padding: 20px 50px;
    border: 1px solid #ccc;
    margin: 0 50px;
    border-radius: 10px;
}
</style>
