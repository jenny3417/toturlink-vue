<template>
    <!-- {{ props.answerData }} -->
    <div class="questionWrap">
        <span class="asker">⩥ 來自 <span style="color: rgb(9, 88, 61);">{{ askerName }}</span> 在 {{ askTime
        }} :</span>
        <p class="askMsg">{{ askMsg }}</p>
    </div>
</template>
    
<script setup >
import { ref, computed } from 'vue';

const props = defineProps({
    answerData: Object,
})


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