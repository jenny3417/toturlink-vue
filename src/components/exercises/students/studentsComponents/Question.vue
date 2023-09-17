<template>
    <div style="border: 1px solid #b9b9b9; padding: 10px; border-radius: 5px;">
        <n-space justify="space-between">
            <n-space>
                <span class="asker">⩥ 來自 <span style="color: rgb(9, 88, 61);">{{ askerName }}</span> 在 {{ askTime
                }} :</span>
            </n-space>
            <n-space justify="end" v-if="isMyQuestion">
                <n-button type="warning" @click="sendQuestion">
                    修改提問
                </n-button>
                <n-button type="error" @click="sendQuestion">
                    刪除提問
                </n-button>
            </n-space>
        </n-space>
        <!-- {{ props.questionData }} -->
        <p class="askMsg">{{ askMsg }}</p>
        <hr>
        <div v-if="props.questionData.answer.length === 0">目前無任何回應</div>
        <n-collapse v-else>
            <n-collapse-item name="1">

                <div v-for="answer in props.questionData.answer">
                    <!-- {{ answer }} -->
                    <Answer :answerData="answer"></Answer>
                    <hr style="margin-left: 25px;">
                </div>
                <template #header>
                    <n-text class="nHeader">
                        點我查看更多留言({{ props.questionData.answer.length }})
                    </n-text>
                </template>

                <hr>
            </n-collapse-item>
            <!-- {{ sendAnswerData }} -->

        </n-collapse>
        <n-input v-model:value="sendAnswerData.content" maxlength="100" show-count placeholder="請輸入您的回應" />
        <n-space justify="end">
            <n-button type="info" @click="sendAnswer">
                送出回應
            </n-button>
        </n-space>
    </div>
</template>
    
<script setup>
import Answer from '@/components/exercises/students/studentsComponents/Answer.vue'
import { ref, computed } from 'vue';
import { useNotification } from 'naive-ui'
import tutorlink from '@/api/tutorlink.js'

const notification = useNotification()
const props = defineProps({
    questionData: Object,
})
const emits = defineEmits(['sendAnswer'])
const askerName = ref(props.questionData.userName)
const isMyQuestion = ref(props.questionData.myQuestion)
const askTime = computed(() => {
    const dateTime = new Date(props.questionData.createDate);
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, '0');
    const day = String(dateTime.getDate()).padStart(2, '0');
    const hours = String(dateTime.getHours()).padStart(2, '0');
    const minutes = String(dateTime.getMinutes()).padStart(2, '0');
    const seconds = String(dateTime.getSeconds()).padStart(2, '0');
    const formattedDateTime = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
    return formattedDateTime
})


const askMsg = ref(props.questionData.content)
const sendAnswerData = ref({
    question: {
        questionId: props.questionData.questionId,
    },
    content: "",
    createDate: 0
})





const sendAnswer = async () => {
    sendAnswerData.value.createDate = new Date().getTime()
    console.log(sendAnswerData.value)
    if (sendAnswerData.value.content !== "") {
        let resData = await tutorlink.post(`/student/addNewAnswer`, sendAnswerData.value)
        console.log(resData.data.data)
        sendAnswerData.value = {
            question: {
                questionId: props.questionData.questionId,
            },
            content: "",
            createDate: 0
        }
        emits("sendAnswer")

    } else {
        notification['error']({
            content: "請輸入您要回應的內容",
            meta: "",
            duration: 5000,
            keepAliveOnHover: true
        });
    }


}



</script>
    
<style scoped>
.asker {
    font-size: 20px;
    font-weight: bold;
}

.askMsg {
    font-size: 20px;
    margin-top: 10px;
    padding-left: 25px;
}

.nHeader {
    margin-top: 10px;
    padding: 0 10px;
    font-size: 20px;
    transition: all 0.2s;
}

.nHeader:hover {
    font-size: 20px;
    padding: 0 10px;
    background-color: #d6d6d6;
    border-radius: 5px;
    transition: all 0.2s;
}
</style>