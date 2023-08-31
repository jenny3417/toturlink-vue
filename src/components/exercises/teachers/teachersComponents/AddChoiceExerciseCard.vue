<template>
    <n-card :title="titleString" hoverable>
        <n-space vertical>
            <n-input v-model:value="questionData.questionTitle" type="textarea" maxlength="50" show-count
                placeholder="請在此輸入題目" />
            <n-dynamic-input v-model:value="questionData.choice" :on-create="onCreate" :min="4" :max="6">
                <template #create-button-default>
                    随便搞点啥
                </template>
                <template #default="{ value }">
                    <div style="display: flex; align-items: center; width: 100%">
                        <n-checkbox v-model:checked="value.isAnswer" style="margin-right: 12px" />
                        <n-input v-model:value="value.string" type="text" placeholder="請在此輸入選項，前方勾選即為答案，將自動辨識單選或多選"
                            maxlength="50" show-count />
                    </div>
                </template>
            </n-dynamic-input>
            <n-space>
                <n-switch v-model:value="questionData.mutipleChoice" />
                強制多選
            </n-space>

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
            <!-- <n-popselect v-model:value="questionType" :options="questionTypeOptions" trigger="click">
                <n-button strong secondary round type="warning" @click="newBlock">
                    新增題目
                </n-button>
            </n-popselect> -->
            <n-button strong secondary round type="warning" @click="delBlock">
                刪除
            </n-button>
            <n-button strong secondary round type="warning" @click="down">
                下移
            </n-button>
        </n-space>

    </n-card>
    <!-- {{ props.questionData }} -->
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

const onCreate = () => {
    return {
        isAnswer: false,
        string: ""
    };
}
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
    console.log(1)
    emits('newBlock', 'choice', props.questionId)
}
const addFillIn = () => {
    console.log(2)
    emits('newBlock', 'fillIn', props.questionId)
}
watch(questionData, (newVal) => {
    // console.log(newVal)
    emits('dataUpdate', questionData.value, props.questionId)
}, { deep: true })
watch(props, () => {

}, { deep: true })

</script>

<style scoped>
.n-input {
    min-width: 500px;
}
</style>
