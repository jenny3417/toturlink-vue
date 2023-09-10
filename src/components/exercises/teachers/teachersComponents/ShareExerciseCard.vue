<template>
    <!-- {{ props.stdData }} -->
    <n-card title="" hoverable>
        <n-space justify="space-between" size="large" align="center">
            <img class="stuImg" src="https://fakeimg.pl/300/" alt="" srcset="">
            <h1>{{ props.stdData.userName ? props.stdData.userName : "無使用者名稱" }}</h1>
            <n-space vertical>
                <n-button :type="isShareBtn ? 'primary' : 'error'" @click="shareClick">{{
                    isShareBtn ? "分　　享" : "取消分享"

                }}</n-button>

                <n-button type="primary" v-if="props.stdData.exerPermissions !== null"
                    @click="showShareModal = true">修　　改</n-button>
            </n-space>
        </n-space>
    </n-card>
    <!-- {{ shareData }} -->
    <br>

    <n-modal v-model:show="showShareModal" style="width: 600px;" :mask-closable="false" :bordered="false"
        :segmented="segmented" class="custom-card" preset="card" :style="bodyStyle" size="huge" title="分享試卷設定檔 - 針對每個學生設定">
        <n-card title="">
            <n-space vertical>
                習題類型:<n-select v-model:value="exerciseType" :options="exerciseTypeOptions" placeholder="請選擇習題類型" />
            </n-space>
            <n-space vertical>
                習題有效時間:
                <n-date-picker v-model:value="dateTime" update-value-on-close type="datetimerange"
                    start-placeholder="開始日期及時間" end-placeholder="結束日期及時間" :actions="['clear']" />
            </n-space>
            <n-space vertical>
                倒數計時:
                <n-space>
                    <n-switch v-model:value="timePickerDisable" :checked-value="false" :unchecked-value="true" />
                    <n-time-picker v-model:value="timePicker" size="small" :disabled="timePickerDisable" :actions="null" />
                    {{ realTimePicker }} 秒
                </n-space>

            </n-space>
            <n-space vertical>
                完成顯示答案:
                <n-space>
                    否
                    <n-switch v-model:value="showAnswer" :checked-value="true" :unchecked-value="false" />
                    是
                </n-space>

            </n-space>
        </n-card>


        <n-space justify="center">
            <n-button strong secondary type="success" @click="send">
                儲存試卷
            </n-button>
        </n-space>
    </n-modal>
</template>

<script setup lang="js">
import { MdDoneAll } from '@vicons/ionicons4'

import { ref, computed, defineEmits } from 'vue'
import tutorlink from '@/api/tutorlink.js'
import { NCard, useNotification } from 'naive-ui';

const props = defineProps({
    stdData: Object,
    exerId: Number
})
const emits = defineEmits('updateStudent')
const isShareBtn = computed(() => {
    if (props.stdData.exerPermissions !== null) {
        return false
    }
    return true
})
const notification = useNotification()
const exerciseType = ref(null)
const exerciseTypeOptions = [
    {
        label: "作業",
        value: "1",
    },
    {
        label: "考試",
        value: "2"
    },
    {
        label: "影片課程練習題",
        value: "3"
    }
]
const timePickerDisable = ref(true)
const showAnswer = ref(false)
const dateTime = ref(null)
const showShareModal = ref(false)
const timePicker = ref(-28800000)
const realTimePicker = computed(() => {
    return (timePicker.value + 28800000) / 1000
})

const shareData = ref({
    exerPerId: null,
    exercises: {
        exerId: null
    },
    users: {
        usersId: null
    },
    exerciseConfig: {
        exerConfigId: null,
        type: null,
        startTime: null,
        endTime: null,
        timeCountDown: null,
        finishShowAnswer: null
    },
})

const dataStartUp = () => {
    console.info("HI")
    if (props.stdData.exerPermissions === null) return
    let data = props.stdData.exerPermissions
    console.info("HI123")
    shareData.value.exerPerId = data.exerPerId
    if (data.exerPermissions !== null) {
        shareData.value.exerciseConfig.exerConfigId = data.exerciseConfig.exerConfigId
        exerciseType.value = exerciseTypeOptions[data.exerciseConfig.type - 1].value
        dateTime.value = [new Date(data.exerciseConfig.startTime), new Date(data.exerciseConfig.endTime)]

        if (data.exerciseConfig.timeCountDown !== -1) {
            timePickerDisable.value = false
            timePicker.value = data.exerciseConfig.timeCountDown * 1000 - 28800000
        }


        showAnswer.value = data.exerciseConfig.finishShowAnswer
    }

    // if (data.exerPermissions !== null) {
    //     shareData.value.exerciseConfig.exerConfigId = data.exerciseConfig.exerConfigId
    //     exerciseType.value = exerciseTypeOptions[data.exerciseConfig.type - 1].value
    //     dateTime.value = [new Date(data.exerciseConfig.startTime), new Date(data.exerciseConfig.endTime)]

    //     if (data.exerciseConfig.timeCountDown === -1) {
    //         timePickerDisable.value = true
    //     } else {
    //         timePickerDisable.value = false
    //         timePicker = data.exerciseConfig.timeCountDown * 1000 - 28800000
    //     }

    //     showAnswer.value = data.exerciseConfig.finishShowAnswer

    // }
}

dataStartUp()

const formatData = () => {
    let errorFlag = false
    if (props.stdData.exerPermissions !== null) {
        console.info('NONULL')
        shareData.value.exerPerId = props.stdData.exerPermissions.exerPerId
        shareData.value.exerciseConfig.exerConfigId = props.stdData.exerPermissions.exerciseConfig.exerConfigId
    }
    shareData.value.exercises.exerId = props.exerId
    shareData.value.users.usersId = props.stdData.usersId

    if (exerciseType.value === null) {
        errorFlag = true
        notification['error']({
            content: "未選擇習題類型",
            meta: "請選擇習題類型",
            duration: 5000,
            keepAliveOnHover: true
        });
    } else {
        shareData.value.exerciseConfig.type = exerciseType.value
    }


    if (dateTime.value === null) {
        errorFlag = true
        notification['error']({
            content: "未選擇開始時間與結束時間",
            meta: "請選擇開始時間與結束時間",
            duration: 5000,
            keepAliveOnHover: true
        });
    } else if (dateTime.value[0] === dateTime.value[1]) {
        errorFlag = true
        notification['error']({
            content: "開始時間不能等於結束時間",
            meta: "請檢查開始時間與結束時間",
            duration: 5000,
            keepAliveOnHover: true
        });
    }
    else {
        shareData.value.exerciseConfig.startTime = dateTime.value[0]
        shareData.value.exerciseConfig.endTime = dateTime.value[1]
    }


    if (timePickerDisable.value) {
        shareData.value.exerciseConfig.timeCountDown = -1
    } else {
        if (realTimePicker.value === 0) {
            errorFlag = true
            notification['error']({
                content: "未選擇倒數秒數",
                meta: "請進入詳細設定選擇倒數秒數",
                duration: 5000,
                keepAliveOnHover: true
            })
        } else if (realTimePicker.value <= 1799) {
            errorFlag = true
            notification['error']({
                content: "倒數秒數不能小於30分鐘",
                meta: "請檢查倒數秒數",
                duration: 5000,
                keepAliveOnHover: true
            })
        } else {
            shareData.value.exerciseConfig.timeCountDown = realTimePicker.value
        }
    }


    shareData.value.exerciseConfig.finishShowAnswer = showAnswer.value


    return errorFlag
}

const send = async () => {
    const isError = formatData()
    console.log(shareData.value)
    if (isError) {
        return
    }
    const result = await tutorlink.post('/teacher/shareExercise', shareData.value)
    if (result.data === "OK") {
        notification['success']({
            content: "分享成功",
            meta: "",
            duration: 5000,
            keepAliveOnHover: true
        })
        console.info(123)
        emits('updateStudent')

        showShareModal.value = false
        // dataStartUp()
    }
}
const sendDelete = async () => {
    let result = await tutorlink.delete(`/teacher/deleteExercisePermissions/${props.stdData.exerPermissions.exerPerId}`)
    console.log(result.data)
    if (result.data === "OK") {
        emits('updateStudent')
        notification['success']({
            content: "取消分享成功",
            meta: "",
            duration: 5000,
            keepAliveOnHover: true
        })

        shareData.value = {
            exerPerId: null,
            exercises: {
                exerId: null
            },
            users: {
                usersId: null
            },
            exerciseConfig: {
                exerConfigId: null,
                type: null,
                startTime: null,
                endTime: null,
                timeCountDown: null,
                finishShowAnswer: null
            }
        }
        return
    }
    notification['error']({
        content: "取消分享錯誤",
        meta: "",
        duration: 5000,
        keepAliveOnHover: true
    })
}
const shareClick = () => {
    if (isShareBtn.value) {
        showShareModal.value = true
    } else {
        formatData()

        sendDelete()

    }
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