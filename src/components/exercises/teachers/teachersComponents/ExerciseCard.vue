<template>
    <n-card :title="props.data.exerName" hoverable>

        <n-space justify="space-around">
            <n-space class="NProgress" vertical>
                <n-tag type="error" round>
                    {{ props.data.lesson.lessonName }}
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
            <n-button strong secondary type="info" @click="showModal = true">
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
            <!-- <n-button strong secondary type="info">
                <n-icon>
                    <MdClipboard />
                </n-icon>
                拷貝試卷
            </n-button> -->
            <n-button strong secondary type="error" @click="onDelete">
                <n-icon>
                    <MdTrash />
                </n-icon>
                刪除試卷
            </n-button>
        </n-space>
        <!-- {{ props.data }} -->
    </n-card>
    <n-modal v-model:show="showModal" class="custom-card" preset="card" :style="bodyStyle" title="分享試卷" size="huge"
        :bordered="false" :segmented="segmented">
        <template #header-extra>
            <n-input-group>
                <n-input placeholder="請輸入ID或名字搜索" />
                <!-- <n-button type="primary" ghost>
                    搜尋
                </n-button> -->
            </n-input-group>
        </template>
        <shareExerciseCard></shareExerciseCard>
        <template #footer>

        </template>
    </n-modal>
</template>

<script setup lang="js">
import { MdHelpCircle, MdPersonAdd, MdClipboard, MdCheckmarkCircleOutline, MdSettings, MdTrash, MdHand } from '@vicons/ionicons4'

import { ref, computed, h } from 'vue'
import { useDialog, useNotification, NIcon } from 'naive-ui'

import shareExerciseCard from '@/components/exercises/teachers/teachersComponents/shareExerciseCard.vue'

const props = defineProps({
    sId: Number,
    data: Object
})


const correct = computed(() => {
    return "/member/teacher/correct/" + props.sId
})

const qNa = computed(() => {
    return "/member/teacher/qa/" + props.sId
})

const dialog = useDialog()
const notification = useNotification()

const onDelete = () => {
    dialog.error({
        title: "確定要刪除嗎?",
        content: "請再次確定，刪除後無法復原",
        negativeText: '取消',
        positiveText: "刪除",
        maskClosable: false,
        icon: () => h(NIcon, null, [h(MdHand)]),
        onPositiveClick: () => {
            notification['success']({
                content: "刪除成功",
                meta: "拉進垃圾車",
                duration: 2500,
                keepAliveOnHover: true
            });
        },
        // onNegativeClick: () => {
        //     notification['error']({
        //         content: "刪除失敗",
        //         meta: "太可惜了",
        //         duration: 2500,
        //         keepAliveOnHover: true
        //     });
        // }
    });
}

const bodyStyle = {
    width: "800px"
}
const segmented = {
    content: "soft",
    footer: "soft"
}
const showModal = ref(false)




</script>

<style scoped>
.n-card {
    margin-bottom: 10px;
}

.n-button {
    padding: 20px;
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