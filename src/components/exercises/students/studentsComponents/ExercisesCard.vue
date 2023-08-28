<template>
    <div class="card">
        <img class="exerciseImg" src="@/assets/logo.svg" alt="試卷ICON">
        <div class="card-body">
            <h3 class="card-title exerciseName">試卷1</h3>

        </div>
        <div class="buttonWrap">

            <n-button type="primary">
                填寫習題
            </n-button>
            <a :href="scoreLink" target="_blank">
                <n-button type="info">
                    查看分數與Q&A
                </n-button>

            </a>


        </div>
        <hr>
        <div>
            <h5 class="endDate">結束日期: 2023/01/01 00:00</h5>
        </div>
        <hr>
        <div class="tag">
            <n-tag class="tagItem" type="error" round>
                林老師的數學
            </n-tag>
            <n-tag class="tagItem" type="error" round>
                作業
            </n-tag>
        </div>
    </div>
</template>
    
<script setup>
import { computed } from 'vue'
import { NButton, NTag } from 'naive-ui'
const props = defineProps({
    eId: String
})

const scoreLink = computed(() => {
    return `/score/${props.eId}`
})


const doExercise = () => {






}



</script>
    
<style scoped>
.card {
    width: 20rem;
    padding: 10px;
    margin: 10px;
    border: 2px solid #9b9b9b;
    border-radius: 10px;
    display: flex;
    transition: all;
    transition-duration: 0.3s;
}

.card:hover {
    padding: 10px;
    background-color: #f6f6f6;
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