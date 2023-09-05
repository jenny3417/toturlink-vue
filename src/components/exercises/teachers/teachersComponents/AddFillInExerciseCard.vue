<template>
    <n-card :title="titleString" hoverable>
        <n-space vertical>
            <n-input v-model:value="questionData.questionTitle" type="textarea" maxlength="50" show-count
                placeholder="請在此輸入題目" />
            <n-input v-model:value="questionData.answer" type="textarea" maxlength="100" show-count
                placeholder="請在此輸入參考解答" />
        </n-space>
        <hr>
        <n-space justify="space-around">
            <n-button strong secondary round type="warning" @click="up">
                上移
            </n-button>
            <n-popconfirm :show-icon="false" negative-text="選擇題" positive-text="填充題" @positive-click="addFillIn"
                @negative-click="addChoice">
                <template #trigger>
                    <n-button strong secondary round type="warning">
                        新增題目</n-button>
                </template>
            </n-popconfirm>
            <n-button strong secondary round type="warning" @click="delBlock">
                刪除
            </n-button>
            <n-button strong secondary round type="warning" @click="down">
                下移
            </n-button>
        </n-space>

    </n-card>
    <!-- <pre>{{ JSON.stringify(questionData, null, 2) }}</pre> -->
</template>

<script setup lang="js">
import { ref, watch, toRaw, computed, defineEmits } from "vue";

const props = defineProps({
    questionId: Number,
    questionData: Object,
})
const titleString = props.questionId + "."
const emits = defineEmits(['dataUpdate', 'getUp', 'getDown', 'newBlock', 'delBlock'])

const questionData = ref(props.questionData)

const up = () => {
    emits('getUp', props.questionId)
}
const down = () => {
    emits('getDown', props.questionId)
}
const delBlock = () => {
    emits('delBlock', props.questionId)
}
const addChoice = () => {
    emits('newBlock', 'choice', props.questionId)
}
const addFillIn = () => {
    emits('newBlock', 'fillIn', props.questionId)
}
watch(questionData, (newVal) => {
    // console.log(newVal)
    emits('dataUpdate', questionData.value)
}, { deep: true })
</script>

<style scoped>
.n-input {
    min-width: 500px;
}
</style>
