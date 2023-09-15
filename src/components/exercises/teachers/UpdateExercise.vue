<template >
    <Navbar></Navbar>
    <div class="loading" v-if="isDataLoading">
        <n-spin :size="100" stroke="#66CCFF" />
    </div>
    <!-- {{ topics }}
    {{ exerciseTitle }} -->
    <n-space justify="center">
        <n-space class="addWrap" vertical>
            <n-input maxlength="30" v-model:value="exerTitle" show-count clearable placeholder="請在此輸入試卷名稱" />

            <n-card title="" hoverable justify="center" v-if="exerciseData.length == 0">
                <n-space justify="center">
                    <n-popconfirm :show-icon="false" negative-text="選擇題" positive-text="填充題" @positive-click="addFillIn"
                        @negative-click="addChoice">
                        <template #trigger>
                            <n-button type="warning" dashed>
                                新增題目</n-button>
                        </template>
                    </n-popconfirm>
                </n-space>

            </n-card>
            <div v-if="show">
                <div v-for="item in exerciseData ">
                    <p :id="item.key"> </p>
                    <AddChoiceExerciseCard v-if="item.type == 'choice'" :questionId="item.id" :questionData="item.content"
                        @dataUpdate="getData" @getUp="up" @getDown="down" @newBlock="newBlock" @delBlock="delBlock"
                        :key="item.key">
                    </AddChoiceExerciseCard>
                    <AddFillInExerciseCard v-if="item.type == 'fillIn'" :questionId="item.id" :questionData="item.content"
                        @dataUpdate="getData" @getUp="up" @getDown="down" @newBlock="newBlock" @delBlock="delBlock"
                        :key="item.key">
                    </AddFillInExerciseCard>
                </div>
            </div>
            <!-- {{ exerciseData }} -->

            <!-- <AddChoiceExerciseCard questionId="1" @dataUpdate="getData" @getUp="up" @getDown="down" @newBlock="newBlock"
                @delBlock="delBlock">
            </AddChoiceExerciseCard>
            <AddFillInExerciseCard questionId="2" @dataUpdate="card1"></AddFillInExerciseCard> -->
            <!-- <AddExerciseCard></AddExerciseCard> -->


            <!-- <pre>{{ JSON.stringify(exerciseData, null, 2) }}</pre> -->

            <n-collapse>
                <n-collapse-item title="試卷詳細設定" name="1">
                    <n-card title="" hoverable>
                        <n-space vertical>
                            習題類型:<n-select v-model:value="exerciseType" :options="exerciseTypeOptions"
                                placeholder="請選擇習題類型" />
                        </n-space>
                        <n-space vertical>
                            習題有效時間:
                            <n-date-picker v-model:value="dateTime" update-value-on-close type="datetimerange"
                                start-placeholder="開始日期及時間" end-placeholder="結束日期及時間" :actions="['clear']" />
                        </n-space>
                        <n-space vertical>
                            倒數計時:
                            <n-space>
                                <n-switch v-model:value="timePickerDisable" :checked-value="false"
                                    :unchecked-value="true" />
                                <n-time-picker v-model:value="timePicker" size="small" :disabled="timePickerDisable"
                                    :actions="null" />
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
                            <n-space vertical>
                                課程綁定:<n-select v-model:value="lesson" :options="lessonOptions" placeholder="請選擇習題類型" />
                            </n-space>
                        </n-space>
                    </n-card>
                </n-collapse-item>
            </n-collapse>


            <n-space justify="center">
                <n-button strong secondary type="success" @click="save">
                    儲存試卷
                </n-button>
            </n-space>
        </n-space>

    </n-space>
    <br>
</template>
<script setup lang="js">
import Navbar from '@/components/public/Navbar.vue'
import AddChoiceExerciseCard from '@/components/exercises/teachers/teachersComponents/AddChoiceExerciseCard.vue'
import AddFillInExerciseCard from '@/components/exercises/teachers/teachersComponents/AddFillInExerciseCard.vue'
import { ref, h, computed } from 'vue';
import { useNotification, useDialog, useMessage, NIcon } from 'naive-ui'
import tutorlink from '@/api/tutorlink.js'
import { MdHand } from '@vicons/ionicons4'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const dialog = useDialog()
const notification = useNotification()
const routeData = ref(route.params.id)
const exerTitle = ref("")
let exerId = 0
let exerConfigId = 0
let childDataSaver = []
const isDataLoading = ref(true)
const topics = ref({})
const exerciseConfig = ref({})
const exerciseType = ref("")
const lesson = ref(null)
const lessonOptions = ref([{
    label: "不綁定課程",
    value: "-1",
},])
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
const show = ref(true)
const exerciseData = ref(childDataSaver);
const timePickerDisable = ref(true)
const showAnswer = ref(true)
const timePicker = ref(-28800000)
const realTimePicker = computed(() => {
    return (timePicker.value + 28800000) / 1000
})

const dateTime = ref(null)









const getData = (data, id) => {
    // console.log(toRaw(data))
    // console.log((JSON.parse(JSON.stringify(data))))
    console.log(id)
    console.log(JSON.parse(JSON.stringify(data)))
    console.log(childDataSaver[id - 1])
    childDataSaver[id - 1].content = JSON.parse(JSON.stringify(data))
    console.log(childDataSaver)
}

const newChoise = (id) => {
    return {
        id: id,
        key: id,
        type: 'choice',
        content: {
            questionTitle: "",
            choice: [{

                isAnswer: false,
                string: ""
            },
            {
                isAnswer: false,
                string: ""
            },
            {
                isAnswer: false,
                string: ""
            },
            {
                isAnswer: false,
                string: ""
            }],
            mutipleChoice: false
        },
    }
}
const newFillIn = (id) => {
    return {
        id: id,
        key: id,
        type: 'fillIn',
        content: {
            questionTitle: "",
            answer: ""
        },
    }
}

const up = (id) => {
    // console.log(JSON.parse(JSON.stringify(exerciseData.value)))
    const newData = JSON.parse(JSON.stringify(childDataSaver))
    if (id <= 1) {
        notification['warning']({
            content: "已到達最上方",
            meta: "無法再移動了",
            duration: 2500,
            keepAliveOnHover: true
        })
        return
    }
    show.value = false
    childDataSaver[id - 1] = newData[id - 2]
    childDataSaver[id - 2] = newData[id - 1]
    childDataSaver[id - 1].id = id
    childDataSaver[id - 2].id = id - 1
    // exerciseData.value = childDataSaver
    console.log(JSON.parse(JSON.stringify(exerciseData.value)))

    show.value = true
    // window.location.reload("/#" + id)
}
const down = (id) => {
    // console.log(JSON.parse(JSON.stringify(exerciseData.value)))
    const newData = JSON.parse(JSON.stringify(childDataSaver))
    console.log(newData.length)
    if (id > newData.length - 1) {
        notification['warning']({
            content: "已到達最下方",
            meta: "無法再移動了",
            duration: 2500,
            keepAliveOnHover: true
        })
        return
    }
    show.value = false
    childDataSaver[id - 1] = newData[id]
    childDataSaver[id] = newData[id - 1]
    childDataSaver[id - 1].id = id
    childDataSaver[id].id = id + 1
    // exerciseData.value = childDataSaver
    console.log(JSON.parse(JSON.stringify(exerciseData.value)))

    show.value = true
}
const addChoice = () => {
    childDataSaver.push(newChoise(childDataSaver.length + 1))
    exerciseData.value = childDataSaver
    show.value = false
    show.value = true
}
const addFillIn = () => {
    childDataSaver.push(newFillIn(childDataSaver.length + 1))
    exerciseData.value = childDataSaver
    show.value = false
    show.value = true
}
const newBlock = (type, id) => {
    console.info(type, " ", id)
    let newData = (JSON.parse(JSON.stringify(childDataSaver)))
    const temp = {}
    let inputItem = {}

    if (type == 'choice') {
        inputItem = newChoise(childDataSaver.length + 1)
    }
    if (type == 'fillIn') {
        inputItem = newFillIn(childDataSaver.length + 1)
    }
    newData.splice(id, 0, inputItem)
    for (let i = 0; i < newData.length; i++) {
        newData[i].id = i + 1
    }


    childDataSaver = newData
    exerciseData.value = childDataSaver
    console.log(JSON.parse(JSON.stringify(exerciseData.value)))
    show.value = false
    show.value = true
}
const delBlock = (id) => {
    dialog.error({
        title: `確定要刪除 第${id}題 嗎?`,
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

            childDataSaver.splice(id - 1, 1)
            for (let i = 0; i < childDataSaver.length; i++) {
                childDataSaver[i].id = i + 1
            }

            exerciseData.value = childDataSaver
            show.value = false
            show.value = true
        },
        onNegativeClick: () => {
            notification['error']({
                content: "刪除失敗",
                meta: "太可惜了",
                duration: 2500,
                keepAliveOnHover: true
            });
        }
    });

}
const dataFormat = (resData) => {
    exerId = resData.exerId
    exerConfigId = resData.exerciseConfig.exerConfigId
    if (resData.lessonId === null) {
        lesson.value = '-1'
    } else {
        lesson.value = resData.lessonId
    }


    exerTitle.value = resData.exerName
    if (resData.exerciseConfig.type === 1) {
        exerciseType.value = exerciseTypeOptions[0].value
        // exerciseType.value = '作業'
    }
    if (resData.exerciseConfig.type === 2) {
        exerciseType.value = exerciseTypeOptions[1].value
        // exerciseType.value = '考試'
    }
    if (resData.exerciseConfig.type === 3) {
        exerciseType.value = exerciseTypeOptions[2].value
        // exerciseType.value = '影片課程練習題'
    }
    const date = [new Date(resData.exerciseConfig.startTime), new Date(resData.exerciseConfig.endTime)]
    dateTime.value = date
    if (resData.exerciseConfig.timeCountDown !== -1) {
        timePickerDisable.value = false
        timePicker.value = resData.exerciseConfig.timeCountDown * 1000 - 28800000
    }
    showAnswer.value = resData.exerciseConfig.finishShowAnswer



    for (let i = 0; i < resData.topics.length; i++) {
        let topicData = resData.topics[i]
        if (topicData.type === 1 || topicData.type === 2) {
            let choiceData = {
                id: i + 1,
                key: i + 1,
                dbId: topicData.topicsId,
                type: 'choice',
                content: {
                    questionTitle: topicData.content,
                    choice: [],
                    mutipleChoice: false
                }
            }
            for (let j = 0; j < topicData.options.length; j++) {
                let optionData = topicData.options[j]
                let option = {
                    optionsId: optionData.optionsId,
                    sortId: optionData.sortId,
                    string: optionData.content,
                    isAnswer: false
                }
                if (optionData.answer === "true") {
                    option.isAnswer = true
                }
                choiceData.content.choice.push(option)
            }

            if (topicData.type === 2) {
                choiceData.content.mutipleChoice = true
            }
            childDataSaver.push(choiceData)

        }
        if (topicData.type === 3) {
            let option = topicData.options[0]
            let fillInData = {
                id: i + 1,
                key: i + 1,
                dbId: topicData.topicsId,
                type: 'fillIn',
                content: {
                    optionsId: option.optionsId,
                    sortId: option.sortId,
                    questionTitle: topicData.content,
                    answer: option.answer
                }
            }
            childDataSaver.push(fillInData)
        }
    }













    exerciseData.value = childDataSaver
    show.value = false
    show.value = true
    isDataLoading.value = false
}


const getExercise = async () => {
    const res = await tutorlink.get(`teacher/myExercise/${routeData.value}`)
    const lessonsData = await tutorlink.get('/teacher/myLessons')
    for (let i = 0; i < lessonsData.data.length; i++) {
        const lessonData = {
            label: "",
            value: "",
        }
        lessonData.label = lessonsData.data[i].lessonName
        lessonData.value = lessonsData.data[i].lessonId
        lessonOptions.value.push(lessonData)
    }

    dataFormat(res.data)
    topics.value = res.data
}
getExercise()






const save = () => {

    const insertData = {
        exerId: exerId,
        exerName: "",
        createDate: 0,
        lesson: {
            lessonId: 0
        },
        topics: [],
        exerciseConfig: {
            exerConfigId: exerConfigId,
            type: 0,
            startTime: 0,
            endTime: 0,
            timeCountDown: 0,
            finishShowAnswer: false
        }
    }

    let errorFlag = false
    if (exerTitle.value === "") {
        errorFlag = true
        notification['error']({
            content: "試卷名稱為空",
            meta: "請輸入試卷名稱",
            duration: 5000,
            keepAliveOnHover: true
        });
    } else {
        insertData.exerName = exerTitle.value
    }

    insertData.createDate = new Date().getTime();

    if (lesson.value === null) {
        errorFlag = true
        notification['error']({
            content: "未選擇綁定課程",
            meta: "請進入詳細設定選擇要綁定的課程",
            duration: 5000,
            keepAliveOnHover: true
        });
    } else {
        if (lesson.value == -1) {
            delete insertData.lesson
            // insertData.lesson.lessonId = null
        } else {
            insertData.lesson.lessonId = lesson.value
        }
    }

    if (exerciseType.value === null) {
        errorFlag = true
        notification['error']({
            content: "未選擇習題類型",
            meta: "請進入詳細設定選擇擇習題類型",
            duration: 5000,
            keepAliveOnHover: true
        });
    } else {
        insertData.exerciseConfig.type = exerciseType.value
    }

    if (dateTime.value === null) {
        errorFlag = true
        notification['error']({
            content: "未選擇開始時間與結束時間",
            meta: "請進入詳細設定選擇開始時間與結束時間",
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
        insertData.exerciseConfig.startTime = dateTime.value[0]
        insertData.exerciseConfig.endTime = dateTime.value[1]
    }


    if (timePickerDisable.value) {
        insertData.exerciseConfig.timeCountDown = -1
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
            insertData.exerciseConfig.timeCountDown = realTimePicker.value
        }
    }
    insertData.exerciseConfig.finishShowAnswer = showAnswer.value
    //------------------------------------------------------------------------------------------
    if (exerciseData.value.length === 0) {
        errorFlag = true
        notification['error']({
            content: "題數為0",
            meta: "請新增至少一題題目",
            duration: 5000,
            keepAliveOnHover: true
        })
    }

    for (let i = 0; i < exerciseData.value.length; i++) {

        const topicData = {
            topicsId: null,
            content: "",
            type: 0,
            sortId: 0,
            options: []
        }
        if (exerciseData.value[i].dbId !== undefined) {
            topicData.topicsId = exerciseData.value[i].dbId
        }
        topicData.sortId = i + 1
        if (exerciseData.value[i].type === "choice") {
            topicData.sortId = exerciseData.value[i].id
            topicData.content = exerciseData.value[i].content.questionTitle
            let answerCount = 0
            for (let j = 0; j < exerciseData.value[i].content.choice.length; j++) {
                const optionData = {
                    optionsId: null,
                    content: "",
                    sortId: 0,
                    answer: ""
                }
                if (exerciseData.value[i].content.choice[j].optionsId !== undefined) {
                    optionData.optionsId = exerciseData.value[i].content.choice[j].optionsId
                }

                optionData.content = exerciseData.value[i].content.choice[j].string
                optionData.sortId = j + 1
                if (exerciseData.value[i].content.choice[j].isAnswer) {
                    optionData.answer = "true"
                    answerCount++
                } else {
                    optionData.answer = "false"
                }
                topicData.options.push(optionData)
            }

            console.log(answerCount)
            if (answerCount > 1 || exerciseData.value[i].content.mutipleChoice) {
                // console.info(exerciseData.value[i].content.mutipleChoice)
                topicData.type = 2
            } else {
                topicData.type = 1
            }
            if (answerCount === 0) {
                errorFlag = true
                notification['error']({
                    content: `第${i + 1}題無解`,
                    meta: "請檢查是否有勾選答案",
                    duration: 5000,
                    keepAliveOnHover: true
                })
            }

        } else {
            console.log(exerciseData.value[i].content.optionsId)
            const optionData = {
                optionsId: null,
                content: "",
                sortId: 0,
                answer: ""
            }
            if (exerciseData.value[i].content.optionsId !== undefined) {
                optionData.optionsId = exerciseData.value[i].content.optionsId
            }
            topicData.sortId = exerciseData.value[i].id
            topicData.content = exerciseData.value[i].content.questionTitle
            topicData.type = 3
            optionData.content = ""
            optionData.sortId = 1
            optionData.answer = exerciseData.value[i].content.answer
            topicData.options.push(optionData)
        }

        insertData.topics.push(topicData)
    }



    if (errorFlag) {
        notification['warning']({
            content: `請修正完所有錯誤再儲存`,
            meta: "",
            duration: 10000,
            keepAliveOnHover: true
        })
    } else {
        sendExercise(insertData)
    }



}



const sendExercise = async (insertData) => {
    isDataLoading.value = true
    const result = await tutorlink.post('/teacher/newExercise', insertData)
    if (result.data === "OK") {
        notification['success']({
            content: `儲存成功`,
            meta: "",
            duration: 10000,
            keepAliveOnHover: true
        })
        router.replace("/member/teacher/exercise")
    }
    if (result.data === "Error") {
        notification['success']({
            content: `錯誤`,
            meta: "",
            duration: 10000,
            keepAliveOnHover: true
        })
    }
}






















</script>
<style scoped>
.addWrap {
    margin-top: 50px;
}

.loading {
    position: absolute;
    z-index: 1;
    text-align: center;
    padding-top: 300px;
    width: 100%;
    height: 100%;
    background-color: #1b1b1bb6;
}
</style>