<template>
    <Navbar></Navbar>
    <!-- <h1>我的習題</h1> -->
    <div class="exerciseScoreWrap">
        <h2 class="exerciseName">試卷1{{ $route.params.id }}</h2>
        <h3 class="exerciseScore">得分:0 滿分:100</h3>

        <div class="exercisesWrap">
            <Choise count="1"></Choise>
            <MultipleChoice count="2"></MultipleChoice>
            <FillIn count="3"></FillIn>
        </div>
    </div>
    <hr>
    <h2>問與答</h2>
    <div class="queWrap">
        <textarea rows="4" cols="50" placeholder="在這裡輸入問題...."></textarea>
        <button>送出</button>
    </div>


    <div class="ansWrap">
        <n-collapse>
            <p>來自 王一 於 2023/01/01 00:00 :</p>
            <p>為什麼1+1等於2</p>
            <n-collapse-item title="點我看更多回應" name="1">
                <div>
                    <p>來自 老師 於 2023/01/01 00:00 :</p>
                    <p>為什麼你會有這個問題</p>
                </div>
                <hr>
                <div>
                    <p>來自 李二 於 2023/01/01 00:00 :</p>
                    <p>看戲</p>
                </div>
            </n-collapse-item>
        </n-collapse>
    </div>
</template>

<script setup lang="js">
import Navbar from '@/components/public/Navbar.vue'

import Choise from '@/components/exercises/students/studentsComponents/Choice.vue'
import MultipleChoice from '@/components/exercises/students/studentsComponents/MultipleChoice.vue'
import FillIn from '@/components/exercises/students/studentsComponents/FillIn.vue'
import { onMounted } from 'vue'

import { NCollapse, NCollapseItem, } from 'naive-ui'

onMounted(() => {

    document.title = "試卷1";
})

</script>


<style scoped>
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
