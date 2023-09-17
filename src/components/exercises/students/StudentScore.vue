<template>
    <Navbar></Navbar>
    <!-- <h1>我的習題</h1> -->
    <div class="exerciseScoreWrap">
        <!-- {{ finishData }} -->
        <h2 class="exerciseName">{{ finishData.exercises.exerName }}</h2>
        <h3 class="exerciseScore"> 得分: <n-number-animation ref="numberAnimationInstRef" :from="0" :to="finishData.score" />
            / 100</h3>

        <div class="exercisesWrap">
            <div v-for="(data, index) in finishData.studentAnswers">
                <n-space justify="center">
                    <!-- {{ data }} -->
                    <Choise :data="data" :index="index + 1" v-if="data.topics.type === 1"></Choise>
                    <MultipleChoice :data="data" :index="index + 1" v-if="data.topics.type === 2"></MultipleChoice>
                    <FillIn :data="data" :index="index + 1" v-if="data.topics.type === 3"></FillIn>
                </n-space>
            </div>
        </div>
        <!-- <div class="exercisesWrap">
            <Choise count="1"></Choise>
            <MultipleChoice count="2"></MultipleChoice>
            <FillIn count="3"></FillIn>
        </div> -->
    </div>
    <hr>

    <!-- {{ sendQuestionData }} -->
    <n-space class="queWrap" vertical>
        <h2>問與答</h2>
        <n-input type="textarea" maxlength="100" v-model:value="sendQuestionData.content" show-count
            placeholder="請輸入您的問題" />
        <n-space justify="end">
            <n-button type="info" @click="sendQuestion">
                送出提問
            </n-button>
        </n-space>

        <div v-for="questionData in questionDatas">
            <QA :questionData="questionData" @sendAnswer="sendAnswer"></QA>
        </div>



    </n-space>
</template>

<script setup lang="js">
import Navbar from '@/components/public/Navbar.vue'
import QA from '@/components/exercises/students/studentsComponents/Question.vue'
import Choise from '@/components/exercises/students/studentsComponents/FinishChoice.vue'
import MultipleChoice from '@/components/exercises/students/studentsComponents/FinishMultipleChoice.vue'
import FillIn from '@/components/exercises/students/studentsComponents/FinishFillIn.vue'
import { onMounted, onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useNotification } from 'naive-ui'
import tutorlink from '@/api/tutorlink.js'

const route = useRoute();
const notification = useNotification();
const epId = ref(route.params.id);

const finishData = ref({ exercises: { exerName: "" } })

const questionDatas = ref([])
const showQA = ref(false)
const sendQuestionData = ref({
    content: "",
    createDate: 0
})

const getQuestion = async () => {
    let resData = await tutorlink.get(`/student/getAllQuestion/${epId.value}`)
    questionDatas.value = resData.data.data
    console.log(resData.data);
    showQA.value = true
}
getQuestion()

const sendAnswer = () => {
    showQA.value = false
    getQuestion()
    showQA.value = true
}


const sendQuestion = async () => {
    sendQuestionData.value.createDate = new Date().getTime()
    console.log(sendQuestionData.value)
    if (sendQuestionData.value.content !== "") {
        let resData = await tutorlink.post(`/student/addNewQuestion/${epId.value}`, sendQuestionData.value)
        sendQuestionData.value = { content: "", createDate: 0 }
        showQA.value = false
        getQuestion()
        showQA.value = true
    } else {
        notification['error']({
            content: "請輸入您要問的問題",
            meta: "",
            duration: 5000,
            keepAliveOnHover: true
        });
    }


}




















onBeforeMount(() => {
    const getFinishExerciseData = async () => {
        let resData = await tutorlink.get('/student/getFinishExercise/' + epId.value)
        finishData.value = resData.data.data
        document.title = `習題-${finishData.value.exercises.exerName}`;
    }
    getFinishExerciseData()
})




// onMounted(() => {
//     document.title = `習題-${finishData.value.exercises.exerName}`;
// })

</script>


<style scoped>
* {
    -webkit-user-select: none;
    -moz-user-select: none;
    -o-user-select: none;
    user-select: none;
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
