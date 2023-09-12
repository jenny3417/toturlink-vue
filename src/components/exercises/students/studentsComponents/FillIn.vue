<template>
    <n-card :title="'(' + props.index + ') ' + data.content + '(填充)'">
        <n-input type="textarea" maxlength="100" v-model:value="answer" show-count placeholder="請輸入您的回答" />
    </n-card>
</template>
    
<script setup>
import { ref, defineEmits, watch } from 'vue';

const props = defineProps({
    data: Object,
    index: Number

})

const emits = defineEmits(['dataUpdate'])
const answer = ref(null)
watch(answer, () => {
    emits('dataUpdate', answer.value, props.index - 1, props.data.topicsId, 'fillIn')
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

textarea {
    font-size: 20px;
}


.title {
    font-size: 20px;
    /* color: rgb(218, 7, 7); */
}
</style>