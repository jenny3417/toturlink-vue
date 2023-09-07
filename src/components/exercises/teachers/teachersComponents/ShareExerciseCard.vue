<template>
    <n-card title="" hoverable>

        <n-space justify="space-between" size="large" align="center">
            <img class="stuImg" src="https://fakeimg.pl/300/" alt="" srcset="">
            <h1>王同學</h1>
            <n-space vertical>
                <n-button type="primary" @click="showModal = true">已分享</n-button>
                <n-button type="primary" @click="showModal = true">修改</n-button>
            </n-space>

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