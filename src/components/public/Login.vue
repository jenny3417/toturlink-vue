<template>
    <ManageNavbar></ManageNavbar>
    <div style="display: flex; justify-content: center">
        <div class="modal-header">
            <h1>TutorLink</h1>
            <h5>家教平台，快點登入!</h5>
        </div>
        <div class="modal-content" style="width: 20%; margin-top: 5%;">
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
                <!-- <div style="display: flex;justify-content: center"> -->
                <vue-recaptcha :sitekey="instance_vueRecaptchaV2.data_v2SiteKey" size="normal" theme="light" hl="zh-TW"
                    @verify="instance_vueRecaptchaV2.recaptchaVerified" @expire="instance_vueRecaptchaV2.recaptchaExpired"
                    @fail="instance_vueRecaptchaV2.recaptchaFailed" />
                <!-- </div> -->
                <br>
                <div style="display: flex;justify-content: center;">
                    <button class="btn bar" type="button" @click="login" :disabled="isButtonDisabled">登入</button>
                </div>
                <br>
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
import vueRecaptcha from 'vue3-recaptcha2';
import { useNotification } from 'naive-ui'
const router = useRouter()
const notification = useNotification()

const verifie = () => {
    notification["warning"]({
        content: '提示',
        meta: '驗證已失效，請重新驗證',
        duration: 5000,
        keepAliveOnHover: true,
        placement: "bottom-right",
    })
}

const logincheck = () => {
    notification["warning"]({
        content: '提示',
        meta: '帳號或密碼錯誤，請重新輸入',
        duration: 5000,
        keepAliveOnHover: true,
        placement: "top",
    })
}


// 欄位抓值用
const mail = ref('')
const pwd = ref('')
const isButtonDisabled = ref(true)
const instance_vueRecaptchaV2 = reactive({

    data_v2SiteKey: '6LcC0ycoAAAAAO0OKicQ4mUWLkn1q3XZg1HHrdus',
    recaptchaVerified: function (response_token) {
        console.log(response_token);
        const API_URL = '/recaptchaV2'
        //連接後端API
        tutorlink.post(API_URL, response_token).then((response) => {
            //執行回傳結果
            if (response.data.success) {
                isButtonDisabled.value = false;
            } else { isButtonDisabled.value = true }
        })
    },
    recaptchaExpired: function () {
        // 驗證過期後執行
        isButtonDisabled.value = true;
        console.log('驗證過期');
        verifie()
    },
    recaptchaFailed: function () {
        isButtonDisabled.value = true;
        // 驗證失敗的動作
    },
});


// 登入方法
const login = () => {
    const API_URL = `/normallogin`
    const login = {
        mail: mail.value,
        pwd: pwd.value
    }
    // 代碼
    // 100 信箱不存在或者信箱輸入錯誤
    // 101 密碼錯誤，請重新輸入
    // 102 資料正確，進行登入後續動作
    tutorlink.post(API_URL, login).then(response => {
        const result = response.data
        console.log(result)
        if (response.data == '102') {
            router.replace({ path: '/member/student' })
        } else if (response.data == '100' || response.data == '101') {
            logincheck()
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
    margin-right: 5%;
    display: flex;
    flex-direction: column;
    justify-content: center;
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