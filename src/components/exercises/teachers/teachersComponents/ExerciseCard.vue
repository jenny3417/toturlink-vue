<template>
    <n-card title="試卷1" hoverable>

        <n-space justify="space-around">
            <n-space class="NProgress" vertical>
                <n-tag type="error" round>
                    林老師的數學教室
                </n-tag>
                <n-tag type="error" round>
                    作業
                </n-tag>
            </n-space>
            <n-space class="NProgress" vertical>
                <n-progress type="dashboard" gap-position="bottom" :percentage="70" unit="分" color="#66CCFF" />
                平均分數
            </n-space>
            <n-space class="NProgress" vertical>
                <n-progress type="dashboard" gap-position="bottom" :percentage="70" unit="%" color="#B7cc22" />
                填寫人數百分比
            </n-space>

        </n-space>



        <hr>
        <n-space justify="space-around">
            <a :href="qNa" target="_blank">
                <n-button strong secondary type="primary">
                    <n-icon>
                        <MdHelpCircle />
                    </n-icon>
                    Q&A
                </n-button>
            </a>
            <a :href="correct" target="_blank">
                <n-button strong secondary type="primary">
                    <n-icon>
                        <MdCheckmarkCircleOutline />
                    </n-icon>
                    批改試卷
                </n-button>
            </a>
            <n-button strong secondary type="info">
                <n-icon>
                    <MdPersonAdd />
                </n-icon>
                分享試卷
            </n-button>
            <n-button strong secondary type="info">
                <n-icon>
                    <MdSettings />
                </n-icon>
                更新習題
            </n-button>
            <n-button strong secondary type="info">
                <n-icon>
                    <MdClipboard />
                </n-icon>
                拷貝試卷
            </n-button>
            <n-button strong secondary type="error" @click="showModal = true">
                <n-icon>
                    <MdTrash />
                </n-icon>
                刪除試卷
                <n-modal v-model:show="showModal" :mask-closable="false" preset="dialog" title="確定要刪除本張試卷"
                    content="真的要刪除嗎，刪除後無法復原" positive-text="刪除" negative-text="取消" @positive-click="onPositiveClick"
                    @negative-click="onNegativeClick" />
            </n-button>
        </n-space>
    </n-card>
</template>

<script setup lang="js">
import { MdHelpCircle, MdPersonAdd, MdClipboard, MdCheckmarkCircleOutline, MdSettings, MdTrash } from '@vicons/ionicons4'

import { ref, computed } from 'vue'

const props = defineProps({
    sId: Number
})

const showModal = ref(false)
const correct = computed(() => {
    return "/teacher/correct/" + props.sId
})

const qNa = computed(() => {
    return "/teacher/qa/" + props.sId
})

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