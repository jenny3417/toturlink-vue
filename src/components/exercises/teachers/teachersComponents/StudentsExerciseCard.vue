<template>
    <n-card title="王同學" hoverable>

        <n-space justify="space-around">
            <n-space class="NProgress" vertical>
                <img class="stuImg" src="https://fakeimg.pl/300/" alt="" srcset="">
            </n-space>
            <n-space class="NProgress" vertical>
                <n-progress type="dashboard" gap-position="bottom" :percentage="70" unit="分" color="#66CCFF" />
                系統自動評分
            </n-space>
            <n-space class="NProgress" vertical>
                <n-progress type="dashboard" gap-position="bottom" :percentage="70" unit="分" color="#B7cc22" />
                教師手動評分
            </n-space>

        </n-space>



        <hr>
        <n-space justify="space-around">
            <n-button strong secondary type="primary">
                <n-icon>
                    <MdDoneAll />
                </n-icon>
                手動閱卷
            </n-button>

        </n-space>
    </n-card>
</template>

<script setup lang="js">
import { MdDoneAll } from '@vicons/ionicons4'

import { ref } from 'vue'

import { NCard } from 'naive-ui';
const showModal = ref(false)


const onNegativeClick = () => {
    showModal.value = false
}


const onPositiveClick = () => {
    showModal.value = false
    notify('success')



}




</script>

<style scoped>
.n-card {
    margin-bottom: 10px;
}

.n-button {
    padding: 10px 50px;
    margin-right: 10px;
    font-size: large;

}

.stuImg {
    width: 100px;
    height: 100px;
    border-radius: 100%;
}

p {
    color: yellowgreen;
}

.NProgress {
    margin-right: 80px;
}

.n-progress {
    max-width: 100px;
}
</style>