<template>
    <ManageNavbar></ManageNavbar>
    <div style="display: flex; justify-content: center">
        <div class="modal-content" style="width: 20%; margin-top: 5%;">
            <div class="modal-header">
                <h1>TutorLink</h1>
            </div>
            <br>
            <div class="modal-body">
                <div style="min-width: 100%;">
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="floatingInput" placeholder="" v-model="mail"
                            @blur="checkmailinput()">
                        <label for="floatingInput">電子信箱</label>
                        <div v-if="mailwaring" class="warning-text">請輸入信箱</div>
                        <div v-if="mailcheck" class="warning-text">請檢查輸入格式是否正確</div>
                    </div>
                </div>
                <div style="min-width: 100%;">
                    <div class="form-floating mb-3">
                        <input type="password" class="form-control" id="floatingInput" placeholder="" v-model="pwd"
                            @blur="checkpwdinput()">
                        <label for="floatingInput">密碼</label>
                        <div v-if="pwdwaring" class="warning-text">請輸入密碼</div>
                    </div>
                </div>
                <div style="display: flex;align-items: center;margin:0 auto;padding-bottom:10px;">
                    <a href="#" class="caption-text" style="color: #2d5c8b;font-size: 16px;">
                        忘記密碼？</a>
                </div>
                <br>
                <div style="display: flex;justify-content: center;">
                    <button class="btn bar" type="button" @click="login">登入</button>
                </div>
                <div style="display: flex;align-items: center;margin:0 auto;padding-bottom:10px;">
                    <div class="caption-text">還沒有帳號嗎? </div>
                    <a href="http://localhost:5173/register" class="caption-text" style="color: red;">
                        &emsp; 註冊</a>
                </div>
                <div class="line-text-box">
                    <hr>
                    <div class="caption-text">使用其他帳號輕鬆登入</div>
                    <hr>
                </div>
                <div class="thirdlogin">
                    <google data-bs-dismiss="modal"></google>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script setup>
import tutorlink from '@/api/tutorlink.js';
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router'
import google from '../login/google.vue'
import ManageNavbar from "@/components/public/ManageNavbar.vue"
// import vueRecaptcha from 'vue3-recaptcha2';
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
button {
    font-weight: bold;
    margin: 5px 20px;
}

.warning-text {
    color: red;
    font-size: 12px;
    margin-top: 5px;
}

.success-text {
    color: green;
    font-size: 12px;
    margin-top: 5px;
}


.thirdlogin {
    display: flex;
    justify-content: center;
    padding-top: 20px;
    padding-bottom: 20px;
    align-items: center
}

.modal-body {
    padding-bottom: 0px;
}

.modal-header {
    color: rgba(76, 87, 102, 0.6);
    font-weight: bold;
}


.caption-text {
    font-size: 14px;
    color: rgba(76, 87, 102, 0.6);
}

hr {
    display: block;
    unicode-bidi: isolate;
    margin-block-start: 0.5em;
    margin-block-end: 0.5em;
    margin-inline-start: auto;
    margin-inline-end: auto;
    overflow: hidden;
    border-style: inset;
    border-width: 1px;
}

.bar {
    min-width: 100%;
    background-color: #343a40;
    color: white;
}

.btn:hover {
    background-color: #51585e;
}

.line-text-box {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin: 36px 0 16px 0;
}

.line-text-box hr {
    height: 2px;
    border: none;
    background-color: #2f2f29;
    -webkit-box-flex: 1;
    -ms-flex: 1 1;
    flex: 1 1;
}
</style>