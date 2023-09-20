<template></template>
<script setup>
import { onBeforeUnmount } from 'vue'
let mySocket = null

if ('WebSocket' in window) {
    let ms = new WebSocket('ws://localhost:8081/tutorlink/tSocket/1')

    ms.onopen = () => {
        console.log("WS連結成功");


    }
    ms.onmessage = (e) => {
        console.log(e);
    }

    ms.onclose = () => {
        console.log("WS關閉");
    }

    ms.onerror = (error) => {
        console.log("錯誤: ")
        console.log(error);
    }
    mySocket = ms
}

mySocket.onopen = () => {
    mySocket.send("Hello Server!")
}

onBeforeUnmount(async () => {
    if (stompClient) {
        await stompClient.disconnect()
    }
})
</script>
<style ></style>