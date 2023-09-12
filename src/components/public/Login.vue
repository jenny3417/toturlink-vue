<template>
    <div>
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="loginModalLabel">登入您的 TutorLink 帳戶</h1>
                    <button type="button" class="btn-close btn btn-light" data-bs-dismiss="modal" aria-label="Close"
                        @click="initialization()"></button>
                </div>
                <div class="modal-body">
                    <div style="min-height: 100px;">
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="floatingInput" placeholder="" v-model="mail"
                                autocomplete="off" oncopy="return false" onpaste="return false" oncut="return false"
                                oncontextmenu="return false" @blur="checkmailinput()">
                            <label for="floatingInput">電子信箱</label>
                            <div v-if="mailwaring" class="warning-text">請輸入信箱</div>
                            <div v-if="mailcheck" class="warning-text">請檢查輸入格式是否正確</div>
                        </div>
                    </div>
                    <div style="min-height: 100px;">
                        <div class="form-floating mb-3">
                            <input type="password" class="form-control" id="floatingInput" placeholder="" v-model="pwd"
                                autocomplete="off" oncopy="return false" onpaste="return false" oncut="return false"
                                oncontextmenu="return false" @blur="checkpwdinput()">
                            <label for="floatingInput">密碼</label>
                            <div v-if="pwdwaring" class="warning-text">請輸入密碼</div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <p>還沒有帳號嗎?<button class="btn btn-light" type="button" data-bs-toggle="modal"
                            data-bs-target="#registerModal">註冊</button></p>
                    <google data-bs-dismiss="modal"></google>
                    <button class="btn btn-light" type="button" @click="login" data-bs-dismiss="modal">登入</button>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script setup>
import tutorlink from '@/api/tutorlink.js';
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import google from '../login/google.vue'
const router = useRouter()
// 登入方法

// 欄位抓值用
const mail = ref('')
const pwd = ref('')

const login = () => {
    const API_URL = `/normallogin`
    const login = {
        mail: mail.value,
        pwd: pwd.value
    }
    tutorlink.post(API_URL, login).then(response => {
        const result = response.data
        // 錯誤代碼
        // 100 信箱不存在或者信箱輸入錯誤
        // 101 透過信箱跟密碼取得的唯一值ID不同
        // 102 密碼錯誤，請重新輸入
        // 103 資料正確，進行登入後續動作
        if (response.data == 103) {
            router.replace({ path: '/member/student' })
        }
    })
}

// ---- 信箱與密碼欄位驗證用 ----

// 驗證mail格式方法
function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
}

// 驗證信箱，搭配v-if決定是否顯示div
const mailwaring = ref(false)
const mailcheck = ref(false)
// 驗證密碼，搭配v-if決定是否顯示div
const pwdwaring = ref(false)
const pwdcheck = ref(false)

// 驗證信箱判斷式，會即時與server端請求驗證信箱是否重複
function checkmailinput() {
    mail.value == '' ? mailwaring.value = true : (isValidEmail(mail.value) ? (mailcheck.value = false, mailwaring.value = false) : (mailcheck.value = true, mailwaring.value = false))

}

// 驗證密碼判斷式
function checkpwdinput() {
    pwd.value == '' ? pwdwaring.value = true : pwdwaring.value = false

}

// 清空v-if的值
function initialization() {
    mailwaring.value = false
    pwdwaring.value = false
    mailcheck.value = false
}

</script>
    
<style scoped>
.warning-text {
    color: red;
    font-size: 12px;
    margin-top: 5px;
}

.modal-footer {
    justify-content: space-around
}

.modal-header {
    background-color: #343a40;
    color: white;
    font-weight: bold;
}

/* .modal-footer {
    background-color: black;
    color: white;
    font-weight: bold;
} */
</style>