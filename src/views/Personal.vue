<template>
    <navbar></navbar>

    <div class="container">
        <n-card title="" style="margin: 2% auto;width: 70%;">
            <n-tabs type="segment" animated>
                <n-tab-pane name="name" tab="基本資料">
                    <Infomation></Infomation>
                </n-tab-pane>
                <n-tab-pane name="login" tab="登入紀錄">
                    <LoginTime></LoginTime>
                </n-tab-pane>
                <n-tab-pane name="delete" tab="刪除帳號">
                </n-tab-pane>
                <n-tab-pane name="outlogin" tab="第三方登入">
                </n-tab-pane>
            </n-tabs>
        </n-card>
    </div>
</template>
    
<script setup lang='js'>
import Navbar from "@/components/public/Navbar.vue"
import tutorlink from '@/api/tutorlink.js';
import Infomation from "../components/personal/Infomation.vue";
import LoginTime from "../components/personal/LoginTime.vue";
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
const router = useRouter()

const person = ref({
    userEmail: "",
    Birthday: 0,
    UserName: "",
    Phone: "",
    City: "",
});

const pwd = ref({
    oldPwd: "",
    newPwd: "",
    newPwd2: "",
})

onMounted(() => {
    const API_URL = `/infomation`
    tutorlink.post(API_URL)
        .then((response) => {
            person.value.userEmail = response.data.userEmail
            person.value.UserName = response.data.userName
            person.value.Birthday = response.data.birthday
            person.value.City = response.data.city
            person.value.Phone = response.data.phone
        }
        )
})

const sendData = () => {
    const API_URL = `/send`
    tutorlink.post(API_URL, person.value)
        .then((response) => {
            alert("修改成功")
            location.reload();
            router.push({ path: '/member/personal/info' })
        }
        )
}

const sendPwd = () => {
    const API_URL = `/pwdverifty`
    if (pwd.value.oldPwd === "") {
        alert("請輸入舊密碼")
        return
    }
    else if (pwd.value.newPwd === "") {
        alert("請輸入新密碼")
        return
    }
    else if (pwd.value.newPwd2 === "") {
        alert("請輸入新密碼")
        return
    }
    else if (pwd.value.newPwd !== pwd.value.newPwd2) {
        alert("輸入密碼錯誤或輸入不一致")
        return
    } else if (pwd.value.newPwd === pwd.value.oldPwd) {
        alert("新密碼與舊密碼相同")
        return
    }
    tutorlink.post(API_URL, pwd.value).then((response) => {
        console.log(response)
        if (response.data == 'ok') {
            alert("修改成功", "請重新登入")
            const API_URL = `${import.meta.env.VITE_API_JAVAURL}/logout`
            tutorlink.get(API_URL).then(() => {
                router.push({ path: '/' })
            })
        }
    })
}
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
</style>