<template>
    <n-card :title="'(' + props.index + ') ' + topicData.content + '(填充)'">
        <!-- {{ topicData }} -->
        <n-space vertical>
            <p>你的答案:</p>
            <n-input type="textarea" maxlength="100" v-model:value="yourAnswer" show-count placeholder="請輸入您的回答" />

            <hr>
            <n-collapse>
                <n-collapse-item title="點我看正確答案" name="1">
                    <n-input type="textarea" maxlength="100" v-model:value="correctAnswer" show-count
                        placeholder="請輸入您的回答" />
                </n-collapse-item>
            </n-collapse>
        </n-space>

        <template #header-extra>
            <n-icon color="#119911" size="30" v-if="yourAnswer === correctAnswer">
                <MdCheckmarkCircle />
            </n-icon>
            <n-icon color="#dd1111" size="30" v-if="yourAnswer !== correctAnswer">
                <MdCloseCircle />
            </n-icon>
        </template>
    </n-card>
</template>
    
<script setup>
import { ref, defineEmits, watch, computed } from 'vue';
import { MdCheckmarkCircle, MdCloseCircle } from '@vicons/ionicons4'

const props = defineProps({
    index: Number,
    data: Object,
})
const emits = defineEmits(['dataUpdate'])

const topicData = ref(props.data.topics)
const yourAnswer = computed(() => {
    return props.data.answer
})
const correctAnswer = computed(() => {
    return topicData.value.options[0].answer
})
const choiceOptions = ref([])



const dataSetup = () => {
    for (let i = 0; i < topicData.value.options.length; i++) {
        let data = {
            value: topicData.value.options[i].content,
            label: topicData.value.options[i].content
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


.n-radio:disabled {
    accent-color: #7c2727;
}

.title {
    font-size: 20px;
    /* color: rgb(218, 7, 7); */
}
</style>