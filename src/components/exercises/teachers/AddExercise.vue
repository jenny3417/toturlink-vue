<template >
    <Navbar></Navbar>
    <n-space justify="center">
        <n-space class="addWrap" vertical>
            <n-input maxlength="30" show-count clearable placeholder="請在此輸入試卷名稱" />

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
                        @getUp="up" @getDown="down" @newBlock="newBlock" @delBlock="delBlock" :key="item.key">
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
            <n-space justify="center">
                <n-button strong secondary type="success">
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
import { ref, h } from 'vue';
import { useNotification, useDialog, useMessage, NIcon } from 'naive-ui'
import { MdHand } from '@vicons/ionicons4'
const dialog = useDialog()
const notification = useNotification()
const value = ref("Drive My Car")


let childDataSaver = [


]
const show = ref(true)
const exerciseData = ref(childDataSaver);
const getData = (data, id) => {
    // console.log(toRaw(data))
    // console.log((JSON.parse(JSON.stringify(data))))
    console.log(id)
    console.log(JSON.parse(JSON.stringify(data)))
    console.log(childDataSaver[id - 1])
    childDataSaver[id - 1].content = JSON.parse(JSON.stringify(data))
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



</script>
<style scoped>
.addWrap {
    margin-top: 50px;
}
</style>