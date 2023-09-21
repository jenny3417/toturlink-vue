<template >
    <div class="chatNavBar">聊天室 ~~~ {{ sendTo.name }}</div>
    <div class="wrap" v-if="userId !== -1">

        <div class="left">
            <div class="leftInner">
                <n-scrollbar style="max-height: 470px">
                    <div v-for="item in chatRoom">
                        <!-- {{ item }} -->
                        <div class="userItem" @click="changeChatRoomTo(item.memberId, item.memberName)"
                            @Click="setId(item.memberId)">
                            <img :src="`https://picsum.photos/id/20${item.memberId}/200/200`"
                                style="width: 50px; border-radius: 100%;">
                            <span style="margin: 0px 0 0 10px;vertical-align: middle; font-size: 20px;">{{ item.name
                            }}</span>
                        </div>
                    </div>
                </n-scrollbar>
            </div>
        </div>

        <div class="right" v-if="sendTo.name !== null">
            <div class="rightInner">
                <n-scrollbar style="max-height: 350px" ref="msgScrollbarRef">


                    <div v-for="msg in msgList">

                        <div v-if="msg.isMine">
                            <n-space justify="end">
                                <div class="myChat">
                                    <div class="myChatText">{{ msg.msg }}</div>
                                </div>
                            </n-space>
                        </div>

                        <div v-else>
                            <n-space>
                                <div class="otherChat">
                                    <img :src="`https://picsum.photos/id/20${sendTo.id}/200/200`"
                                        style="width: 40px; border-radius: 100%;">
                                    <div class="otherChatText">{{ msg.msg }}</div>
                                </div>
                            </n-space>
                        </div>

                    </div>


                    <n-space justify="end">
                        <p>
                        　　
                        </p>
                        <p>
                        　　
                        </p>
                    </n-space>
                </n-scrollbar>
                <div class="inputBox">
                    <n-input v-model:value="inputValue" type="textarea" autosize :placeholder="`正在傳訊息給 => ${sendTo.name}`"
                        @:keyup.enter="onEnter" />
                </div>
            </div>
        </div>

        <div class="choseChat" v-else>
            選擇好友後開始聊天吧
        </div>

    </div>

    <div class="pleaseLogin" v-else>
        請先登入後再使用聊天室
    </div>
</template>
<script setup>
import { onBeforeUnmount, onMounted, onUpdated, ref, watch, computed } from 'vue'
import tutorlink from '@/api/tutorlink.js'
import { useWebSocketStore } from '@/stores/useWebSocketStore'
import { storeToRefs } from 'pinia'

const wsStore = useWebSocketStore()
const { ws, wsStatus, userId, chatRoom, sendTo, otherMessage, msgList, wsTryOpen } = storeToRefs(wsStore)
const { wsFactory, wsSend, sendWhere, useWSTryOpen } = wsStore

wsFactory()

const setId = (id) => { nowTalkId.value = id + 200 }
const nowTalkId = ref(0)
const wsData = ref("")
const key = ref("")
const msgScrollbarRef = ref();


const imgSrc = computed(() => {
    return `https://picsum.photos/id/${memberId}/200/200`
    // return `https://picsum.photos/${userId.value}/200/200`
})
const msgToBottom = () => {
    msgScrollbarRef.value.scrollTo({
        top: 210000000,
        behavior: 'smooth',
    });
}





const changeChatRoomTo = (id, name) => {
    console.log("click")
    sendWhere(id, name)
}


const inputValue = ref('')
const onEnter = (e) => {
    if (e.key !== "Enter") {
        return
    }
    if (e.shiftKey === true) {
        return
    }
    if (e.shiftKey === false && inputValue.value.length !== 1) {
        console.log(inputValue.value.length);
        wsSend(inputValue.value)
        msgToBottom()

    }
    inputValue.value = ""
}





onMounted(() => {
    // msgToBottom()
    watch(msgList, () => { msgToBottom() }, { deep: true })
})




// watch(msgList, msgToBottom())?
</script>
<style scoped>
/* * {
    height: 100%;
} */
.pleaseLogin {
    /* div置中 */
    display: flex;
    justify-content: center;
    align-items: center;
    /* 垂直置中 */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    font-size: 24px;

}

.choseChat {
    display: flex;
    justify-content: center;
    align-items: center;
    /* 垂直置中 */
    position: absolute;
    top: 220px;
    left: 50%;
    /* transform: translate(-50%, -50%); */

    font-size: 24px;
}

.chatNavBar {
    width: 100%;
    height: 30px;
    border-radius: 5px 5px 0 0;
    background: #b1d9cf;
    padding: 5px 0 0 10px;
}

.wrap {
    position: relative;

}



.left {
    position: absolute;
    left: 0;
    top: 0;
    width: 30%;
    height: 100%;

}

.leftInner {
    padding: 10px;
    height: 470px;
    background-color: #fafcff;
    border-radius: 0 0 0 5px;
}

.right {
    position: absolute;
    right: 0;
    top: 0;
    width: 70%;
    height: 100%;
    background: #fff;
}

.rightInner {
    padding: 10px;
    height: 470px;
    background-color: rgb(255, 250, 250);
    border-radius: 0 0 5px 0;

}

.inputBox {
    display: inline-block;
    position: fixed;
    bottom: 10px;

}

.n-input {
    width: 470px;
    height: 88px;
}

.userItem {
    padding: 5px;
    width: 100%;
    height: 60px;
    transition: all 0.3s;

}

.userItem:hover {
    background-color: #dcdcdc;
    padding: 5px;
    width: 100%;
    height: 60px;
    transition: all 0.3s;
}

.otherChat {
    display: block;
    height: 50px;
}

.otherChatText {
    display: inline-block;
    vertical-align: middle;
    margin: 5px 0 0 10px;
    padding: 5px 10px 5px 10px;
    background-color: #e0f4ff;
    border-radius: 0 50px 50px 50px;
}

.myChat {
    display: block;
    height: 50px;
    right: 0;
}

.myChatText {
    vertical-align: middle;
    display: inline-block;
    margin: 5px 10px 0 0;
    padding: 5px 10px 5px 10px;
    background-color: #ffe0f1;
    border-radius: 50px 0 50px 50px;
}
</style>