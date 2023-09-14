<template>
    <div class="info-title">
        <h3>個人資料</h3>
        <br>
        註冊信箱:<n-input v-model:value="person.userEmail" type="text" readonly />
        姓名:<n-input v-model:value="person.UserName" id="name" type="text" />
        生日:<n-date-picker v-model:value="person.Birthday" id="name" type="date" />
        手機:<n-input v-model:value="person.Phone" id="phone" type="text" />
        居住地:<n-input v-model:value="person.City" id="city" type="text" />
        <n-button strong secondary style="margin-top: 10px;" @click="sendData">儲存</n-button>
        <hr>
        <div v-if="false">
            <h5>更改密碼(至少需要8格字元，包含英文及數字)</h5>
            <P>舊密碼</P><n-input type="password" show-password-on="click" placeholder=" 舊密碼" :maxlength="12" :minlength="8"
                style="width: 200px;" v-model:value="pwd.oldPwd" />
            <p>新密碼</p><n-input type="password" show-password-on="click" placeholder=" 新密碼" :maxlength="12" :minlength="8"
                style="width: 200px;" v-model:value="pwd.newPwd" />
            <p>確認密碼</p><n-input type="password" show-password-on="click" placeholder=" 確認密碼" :maxlength="12" :minlength="8"
                style="width: 200px;" v-model:value="pwd.newPwd2" />
            <br>
            <n-button strong secondary style="margin-top: 10px;" @click="sendPwd">確認修改</n-button>
        </div>
    </div>
</template>
<script setup>
import tutorlink from '@/api/tutorlink.js';
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
            console.log(response.data)
        }
        )
})

const sendData = () => {
    const API_URL = `/send`
    tutorlink.post(API_URL, person.value)
        .then((response) => {
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

p {
    margin: 5px;
}
</style>