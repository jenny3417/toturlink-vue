<template>
    <n-card :title="'(' + props.index + ') ' + data.content + '(多選)'">
        <n-space vertical>
            <n-checkbox-group v-model:value="choiceAnswer">
                <n-space item-style="display: flex;" v-for="options in props.data.options">
                    <n-checkbox :value="options.content" :label="options.content" />

                </n-space>
            </n-checkbox-group>
        </n-space>
    </n-card>
</template>
    
<script setup>
import { ref, defineEmits, watch } from 'vue';


const props = defineProps({
    data: Object,
    index: Number

})
const choiceAnswer = ref(null)
const emits = defineEmits(['dataUpdate'])
watch(choiceAnswer, () => {
    emits('dataUpdate', choiceAnswer.value, props.index - 1, props.data.topicsId, 'mChoice')
})

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