<template>
    <!-- {{ props.answerData }} -->
    <div class="questionWrap">
        <n-space justify="space-between">
            <n-space>
                <span class="asker">⩥ 來自 <span style="color: rgb(9, 88, 61);">{{ askerName }}</span> 在 {{ askTime
                }} 回應 :</span>

            </n-space>
            <n-space justify="end" v-if="isMyQuestion">
                <!-- <n-button type="warning" @click="sendQuestion">
                    修改回應
                </n-button> -->

                <n-popconfirm positive-text="確認刪除" negative-text="取消" @positive-click="deleteAnswer">
                    <template #icon>
                        <n-icon color="red">
                            <hand-icon />
                        </n-icon>
                    </template>
                    <template #trigger>
                        <n-button type="error">
                            刪除回應
                        </n-button>
                    </template>
                    再次確認是否刪除?
                </n-popconfirm>

            </n-space>
        </n-space>
        <p class="askMsg">{{ askMsg }}</p>
    </div>
</template>
    
<script setup >
import { ref, computed } from 'vue';
import { MdHand as HandIcon } from '@vicons/ionicons4'
import { useNotification } from 'naive-ui';
import tutorlink from '@/api/tutorlink.js'

const notification = useNotification()
const props = defineProps({
    answerData: Object,
})
const emits = defineEmits(['deleteAnswer'])
const isMyQuestion = ref(props.answerData.myQuestion)
const askerName = ref(props.answerData.userName)
const askTime = computed(() => {
    const dateTime = new Date(props.answerData.createDate);
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, '0');
    const day = String(dateTime.getDate()).padStart(2, '0');
    const hours = String(dateTime.getHours()).padStart(2, '0');
    const minutes = String(dateTime.getMinutes()).padStart(2, '0');
    const seconds = String(dateTime.getSeconds()).padStart(2, '0');
    const formattedDateTime = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
    return formattedDateTime
})
const askMsg = ref(props.answerData.content)


const deleteAnswer = async () => {
    let resData = await tutorlink.delete(`/teacher/deleteAnswer/${props.answerData.answerId}`)
    emits('deleteAnswer')
    notification['success']({
        content: `刪除成功`,
        meta: "",
        duration: 5000,
        keepAliveOnHover: true
    })
}

</script>
    
<style scoped>
.questionWrap {
    padding-left: 35px;
}

.asker {
    font-size: 20px;
    font-weight: bold;

}

.askMsg {
    font-size: 20px;
    margin-top: 10px;
    padding-left: 25px;
}
</style>