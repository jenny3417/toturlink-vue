import { ref } from 'vue'
import { defineStore } from 'pinia'
import tutorlink from '../api/tutorlink.js'
import { ms } from 'date-fns/locale'



export const useWebSocketStore = defineStore('wsStore', () => {
    let ws = null
    const userId = ref(null)
    const wsTryOpen = ref(false)
    const isLogin = ref(false)
    const wsStatus = ref(false)

    const chatRoom = ref([])
    const sendTo = ref({
        id: null,
        name: null
    })
    const myMessage = ref([])
    const otherMessage = ref([])
    const msgList = ref([])

    const wsFactory = async () => {
        let uidResData = await tutorlink.get(`/ws/userId`)
        userId.value = uidResData.data
        console.log("Pinia: " + uidResData.data)
        if (uidResData.data === "-1") {
            console.log("Pinia: 未登入");
            isLogin.value = false
        } else {
            isLogin.value = true
        }

        if (uidResData.data !== "-1") {
            let chatRoomResData = await tutorlink.get(`/ws/myRooms`)
            chatRoom.value = chatRoomResData.data.data
        }





        if ('WebSocket' in window && ws === null && isLogin.value) {
            ws = new WebSocket(`ws://localhost:8081/tutorlink/tSocket/${uidResData.data}`)
            ws.onopen = () => {
                console.log("Pinia: WS Open");
                wsStatus.value = true
            }
            ws.onmessage = (msg) => {
                console.log("Pinia: New MSG");
                msgList.value.push({
                    msg: msg.data,
                    isMine: false
                })
                console.log(msg);
            }
            ws.onerror = (e) => {
                console.log("Pinia: WS ERROR");
                console.log(e);
            }

            ws.onclose = () => {
                console.log("Pinia: WS CLOSE");
            }

        } else {
            console.log("Pinia: WS 已存在");
        }
    }


    const sendWhere = (uId, name) => {
        console.log("pclick")
        sendTo.value.id = uId
        sendTo.value.name = name
    }

    const wsSend = (msg) => {
        msgList.value.push({
            msg: msg,
            isMine: true
        })
        console.log(`${sendTo.value.id}<message>${msg}`)
        ws.send(`${sendTo.value.id}<message>${msg}`)
    }

    const useWSTryOpen = (e) => {
        wsTryOpen.value = e
    }
    return { ws, isLogin, userId, wsStatus, chatRoom, sendTo, myMessage, otherMessage, msgList, wsTryOpen, wsFactory, wsSend, sendWhere, useWSTryOpen }
})