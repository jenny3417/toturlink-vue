<template>
    <n-card :title="'(' + props.index + ') ' + data.content + '(單選)'">
        <n-space vertical>
            <n-radio-group v-model:value="choiceAnswer" name="radiogroup">
                <n-space vertical>
                    <n-radio v-for="option in choiceOptions" :key="option.value" :value="option.value">
                        {{ option.label }}
                    </n-radio>
                </n-space>
            </n-radio-group>
        </n-space>
    </n-card>
</template>
    
<script setup>
import { ref, defineEmits, watch } from 'vue';

const props = defineProps({
    data: Object,
    index: Number

})
const emits = defineEmits(['dataUpdate'])


const choiceAnswer = ref(null)
const choiceOptions = ref([])

watch(choiceAnswer, () => {
    emits('dataUpdate', choiceAnswer.value, props.index - 1, props.data.topicsId, 'choice')
})

const dataSetup = () => {
    for (let i = 0; i < props.data.options.length; i++) {
        let data = {
            value: props.data.options[i].content,
            label: props.data.options[i].content
        }
        choiceOptions.value.push(data)
    }
}
dataSetup()
</script>
    
<style scoped>
.n-card {
    margin-bottom: 10px;
    min-width: 500px;
}

.choiceWrap {
    min-width: 100px;
    padding: 20px 50px;
    /* border: 1px solid #555; */
    border-radius: 10px;
}


.radioWrap {
    /* 在水平方向上居中对齐 */
}

.title {
    font-size: 20px;
    /* color: rgb(218, 7, 7); */
}
</style>