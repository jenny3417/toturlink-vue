<template>
    <div class="card">
        <!-- {{ props.eData }} -->
        <img class="exerciseImg" src="@/assets/logo.svg" alt="試卷ICON">
        <div class="card-body">
            <h3 class="card-title exerciseName">{{ props.eData.exerName }}</h3>

        </div>
        <div class="buttonWrap">
            <a :href="doExercise" target="_blank">
                <n-button type="primary">
                    填寫習題
                </n-button>
            </a>
            <a :href="scoreLink" target="_blank">
                <n-button type="info" :disabled="isQAdisabled">
                    查看分數與Q&A
                </n-button>
            </a>

        </div>
        <hr>
        <div>
            <h5 class="endDate">開始日期: {{ startTime }}</h5>
        </div>
        <hr>
        <div>
            <h5 class="endDate">結束日期: {{ endDate }}</h5>
        </div>
        <hr>
        <div class="tag">
            <n-tag class="tagItem" type="error" round>
                {{ props.eData.lessonName }}
            </n-tag>
            <n-tag class="tagItem" type="error" round>
                {{ props.eData.subjectContent }}
            </n-tag>
            <n-tag class="tagItem" type="error" round>
                {{ exerciseType }}
            </n-tag>
        </div>
    </div>
</template>
    
<script setup>
import { computed, ref } from 'vue'
import { NButton, NTag } from 'naive-ui'
const props = defineProps({
    eId: String,
    eData: Object
})


const isQAdisabled = computed(() => {
    if (props.eData.score !== null || props.eData.overwriteScore !== null) {
        return false
    }
    return true
})
const exerciseType = computed(() => {
    if (props.eData.exerciseConfig.type === 1) {
        return "作業"
    }
    if (props.eData.exerciseConfig.type === 2) {
        return "考試"
    }
    if (props.eData.exerciseConfig.type === 3) {
        return "影片課程練習題"
    }
})

const endDate = computed(() => {
    const dateTime = new Date(props.eData.exerciseConfig.endTime);

    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, '0');
    const day = String(dateTime.getDate()).padStart(2, '0');
    const hours = String(dateTime.getHours()).padStart(2, '0');
    const minutes = String(dateTime.getMinutes()).padStart(2, '0');
    const seconds = String(dateTime.getSeconds()).padStart(2, '0');

    const formattedDateTime = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;

    return formattedDateTime
})
const startTime = computed(() => {
    const dateTime = new Date(props.eData.exerciseConfig.startTime);

    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, '0');
    const day = String(dateTime.getDate()).padStart(2, '0');
    const hours = String(dateTime.getHours()).padStart(2, '0');
    const minutes = String(dateTime.getMinutes()).padStart(2, '0');
    const seconds = String(dateTime.getSeconds()).padStart(2, '0');

    const formattedDateTime = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;

    return formattedDateTime
})

















const scoreLink = computed(() => {
    return `/member/exerciseScore/${props.eId}`
})

const doExercise = computed(() => {
    return `/member/doExercise/${props.eId}`
})




</script>
    
<style scoped>
.card {
    width: 20rem;
    padding: 10px;
    margin: 10px;
    background-color: #dfe7ec;
    border: 2px solid #9b9b9b;
    border-radius: 10px;
    display: flex;
    transition: all;
    transition-duration: 0.3s;
}

.card:hover {
    padding: 10px;
    background-color: #d7e5ec;
    border: 2px solid #9b9b9b;
    border-radius: 10px;
    display: flex;
    transition: all;
    transition-duration: 0.3s;
}

.exerciseImg {
    margin: auto;
    width: 100px;
    height: 100px;
    border: 1px solid #000;
    border-radius: 50%;

}


.exerciseName {
    /* 文字置中 */
    text-align: center;
    font-weight: bold;
}

.endDate {
    text-align: center;
    margin: auto;
}

.lessonName {
    padding: 0 10px;
    display: inline;
    background-color: #b7dab0;
    border-radius: 10px;
    text-align: center;
    margin-left: 10px;
}

.exerciseType {
    padding: 0 10px;
    display: inline;
    background-color: #b7dab0;
    border-radius: 10px;
    text-align: center;
    margin-left: 10px;
}

.buttonWrap {
    margin: auto;

}

.buttonWrap button {
    min-height: 50px;
    margin-left: 10px;
    padding: 5px;
    border: 0px solid #000000;
    border-radius: 5px;
    /* background: #8c8ddf; */
    color: azure;
    font-weight: bold;
    transition: all;
    transition-duration: 0.3s;
}

.buttonWrap button:hover {
    min-height: 50px;
    margin-left: 10px;
    padding: 5px;
    border: 0px solid #000000;
    border-radius: 5px;
    /* background: #6b6cb6; */
    color: azure;
    font-weight: bold;
    transition: all;
    transition-duration: 0.3s;
}

.tag {

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.tagItem {
    margin-left: 5px;
}
</style>