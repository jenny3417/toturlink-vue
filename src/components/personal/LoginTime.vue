<template>
    <h4>上次登入紀錄</h4>
    {{ login.LastLoginTime }}
    <h4>本次登入紀錄</h4>
    {{ login.NewLoginTime }}
</template>
<script setup>
import tutorlink from '@/api/tutorlink.js';
import { ref } from 'vue';
import { useRouter } from 'vue-router'
const router = useRouter()

const login = ref([])
const logintime = () => {
    const API_URL = "/logintime"
    tutorlink.post(API_URL).then((response) => {
        login.value = response.data
        console.log(response.data)
    })
}
logintime()
</script>
<style scoped>
.info-title {
    display: inline;
    color: black;
    border-color: white;
    vertical-align: middle;
    font-weight: bold;
}

.info-title img {
    width: 36px;
}

.info-title h3 {
    margin: 0;
    padding: 0;
    color: black;
}

.info-title .owenr {
    padding: 5px;
    background-color: rgb(218, 218, 216);
    color: black;
}

.info-title input {
    margin: 5px;
    /* border-radius: 5px; */
    border: 1px solid rgb(14, 13, 13);
    padding: 2px;
    color: black;
}

.info-title p {
    color: black;
}

p {
    margin: 5px;
}
</style>