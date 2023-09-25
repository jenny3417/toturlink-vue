<template>
    <n-progress type="line" :show-indicator="false" :status="status" :percentage="timeBar" v-if="hasTimeout" />
    <!-- <pre>{{ JSON.stringify(exerData, null, 2) }}</pre> -->

    <Navbar></Navbar>

    <!-- <h1>我的習題</h1> -->
    <div class="exerciseScoreWrap">
        <h2 class="exerciseName">{{ exerData.exerName }}</h2>
        <h3 class="exerciseScore">
            <n-countdown :duration="duration" :active="active" @finish="noTime" v-if="hasTimeout" />
        </h3>
        <div class="exercisesWrap">
            <div v-for="(topic, index) in  exerData.topics">
                <n-space justify="center">
                    <!-- {{ JSON.stringify(topic, null, 2) }} -->
                    <Choise v-if="topic.type === 1" :data="topic" :index="index + 1" @dataUpdate="dataUpdate"></Choise>
                    <MultipleChoice v-if="topic.type === 2" :data="topic" :index="index + 1" @dataUpdate="dataUpdate">
                    </MultipleChoice>
                    <FillIn v-if="topic.type === 3" :data="topic" :index="index + 1" @dataUpdate="dataUpdate"></FillIn>
                    <!-- {{ topic }} -->
                </n-space>
            </div>

        </div>
        <n-space justify="center">
            <n-button strong secondary round type="primary" @click="send">
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
import { ref, onMounted, watch, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useMessage, useDialog, useNotification } from "naive-ui";
import tutorlink from '@/api/tutorlink.js'

const router = useRouter();
const route = useRoute();
const notification = useNotification()

const epId = ref(route.params.id);
const exerData = ref(null)
const containerRef = ref(void 0);
const active = ref(false);
const message = useMessage();
const dialog = useDialog();
const duration = ref(3600000)

const hasTimeout = computed(() => {
    if (exerData.value.exerciseConfig.timeCountDown !== -1) {
        return true
    }
    return false
})

const childrenData = ref([])
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
const orginalTime = 3600 - 1
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

const dataUpdate = (data, index, topicsId, type) => {
    let dataType = {
        topicsId: topicsId,
        answer: data,
        type: type
    }
    childrenData.value[index] = dataType




}


onMounted(() => {
    document.title = "試卷1";
    if (exerData.value.exerciseConfig.timeCountDown !== -1) {
        timer = setInterval(countdown, 1000)
    }


})


const getExercise = async () => {
    let resData = await tutorlink.get(`/student/doExercise/${epId.value}`)
    exerData.value = resData.data.data
    for (let i = 0; i < exerData.value.topics.length; i++) {
        childrenData.value.push({ error: 1 })
    }
}
getExercise()


const send = async () => {
    let sentData = []
    let errFlag = false
    for (let i = 0; i < childrenData.value.length; i++) {
        if (childrenData.value[i].error === 1 || childrenData.value[i].answer === null || childrenData.value[i].answer === "" || childrenData.value[i].answer.length === 0) {
            notification['error']({
                content: `第${i + 1}題還未填寫`,
                meta: "完成後再送出吧",
                duration: 2500,
                keepAliveOnHover: true
            });
            errFlag = true
        }
    }
    if (errFlag) return

    for (let i = 0; i < childrenData.value.length; i++) {
        let dataType = {
            exercisePermissions: {
                exerPerId: epId.value
            },
            topics: {
                topicsId: childrenData.value[i].topicsId
            },
            answer: null
        }
        if (childrenData.value[i].type === "choice") {
            dataType.answer = childrenData.value[i].answer
        }
        if (childrenData.value[i].type === "mChoice") {
            let cutString = "<AND>"
            let dataString = ''
            for (let j = 0; j < childrenData.value[i].answer.length; j++) {
                dataString += childrenData.value[i].answer[j]
                if (j + 1 !== childrenData.value[i].answer.length) {
                    dataString += cutString
                }
            }
            dataType.answer = dataString
        } if (childrenData.value[i].type === "fillIn") {
            dataType.answer = childrenData.value[i].answer
        }
        sentData.push(dataType)
    }
    console.log(sentData)

    const resData = await tutorlink.post("/student/sendExercise", sentData)
    if (resData.data === 'Error') {
        notification['error']({
            content: `發生錯誤`,
            meta: "",
            duration: 2500,
            keepAliveOnHover: true
        });
    } else {
        dialog.success({
            title: "試卷送出成功",
            content: "",
            positiveText: "關閉網頁",
            onPositiveClick: () => {
                window.close()
            }
        });
    }
    console.log(resData.data)

}


const autoSend = async () => {
    let sentData = []

    for (let i = 0; i < childrenData.value.length; i++) {
        let dataType = {
            exercisePermissions: {
                exerPerId: epId.value
            },
            topics: {
                topicsId: childrenData.value[i].topicsId
            },
            answer: null
        }
        if (childrenData.value[i].type === "choice") {
            dataType.answer = childrenData.value[i].answer
        }
        if (childrenData.value[i].type === "mChoice") {
            let cutString = "<AND>"
            let dataString = ''
            for (let j = 0; j < childrenData.value[i].answer.length; j++) {
                dataString += childrenData.value[i].answer[j]
                if (j + 1 !== childrenData.value[i].answer.length) {
                    dataString += cutString
                }
            }
            dataType.answer = dataString
        } if (childrenData.value[i].type === "fillIn") {
            dataType.answer = childrenData.value[i].answer
        }
        sentData.push(dataType)
    }
    console.log(sentData)

    const resData = await tutorlink.post("/student/sendExercise", sentData)
    if (resData.data === 'Error') {
        notification['error']({
            content: `發生錯誤`,
            meta: "",
            duration: 2500,
            keepAliveOnHover: true
        });
    } else {
        dialog.success({
            title: "試卷送出成功",
            content: "",
            positiveText: "關閉網頁",
            onPositiveClick: () => {
                window.close()
            }
        });
    }
    console.log(resData.data)

}


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
