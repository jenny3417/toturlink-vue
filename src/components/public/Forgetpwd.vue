<template>
    <ManageNavbar></ManageNavbar>
    <div style="display: flex; justify-content: center">
        <div class="modal-content" style="width: 20%; margin-top: 5%;">
            <div v-if="one">
                <div class="modal-header">
                    <h1 class="modal-title fs-5">Step1.透過信箱找回密碼</h1>
                </div>
                <br>
                <div>
                    <div class="modal-body">
                        <div style="min-width: 100%;">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="floatingInput" placeholder="" v-model="mail"
                                    @blur="checkmailinput()" autocomplete="off" oncopy="return false" onpaste="return false"
                                    oncut="return false" oncontextmenu="return false">
                                <label for="floatingInput">E-mail</label>
                                <div v-if="mailwaring" class="warning-text">請輸入信箱</div>
                                <div v-if="mailcheck" class="warning-text">請檢查輸入格式是否正確</div>
                            </div>
                        </div>
                        <div style="display: flex;justify-content: center;">
                            <button class="btn bar" type="button" @click="getverify"
                                :disabled="isButtonDisabled">取得驗證信</button>
                        </div>
                        <br>
                        <div style="display: flex;justify-content: center;">
                            <vue-recaptcha :sitekey="instance_vueRecaptchaV2.data_v2SiteKey" size="normal" theme="light"
                                hl="zh-TW" @verify="instance_vueRecaptchaV2.recaptchaVerified"
                                @expire="instance_vueRecaptchaV2.recaptchaExpired"
                                @fail="instance_vueRecaptchaV2.recaptchaFailed" />
                        </div>
                        <div class="line-text-box">
                            <hr>
                            <div class="caption-text">&emsp; 若收不到信件，請檢查是否輸入正確&emsp; </div>
                            <hr>
                        </div>
                        <div
                            style="display: flex;align-items: center;margin:0 auto;padding-bottom:10px;justify-content: center">
                            <a type="button" class="caption-text" href="http://localhost:5173/login"
                                style="color: rgb(23, 46, 110);">返回登入</a>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="two">
                <div class="modal-header">
                    <h1 class="modal-title fs-5">Step2. 請輸入驗證碼</h1>
                </div>
                <br>
                <div>
                    <div class="modal-body">
                        <div style="min-width: 100%;">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="floatingInput" placeholder="" v-model="pwd"
                                    autocomplete="off" oncopy="return false" onpaste="return false" oncut="return false"
                                    oncontextmenu="return false">
                                <label for="floatingInput">驗證碼</label>
                            </div>
                        </div>
                        <div style="display: flex;justify-content: center;">
                            <button class="btn bar" type="button" @click="sendverify">送出驗證碼</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script setup>
import tutorlink from '@/api/tutorlink.js';
import { ref, reactive, toRaw } from 'vue';
import { useRouter } from 'vue-router'
import ManageNavbar from "@/components/public/ManageNavbar.vue"
import { useNotification } from 'naive-ui'
import vueRecaptcha from 'vue3-recaptcha2';
const router = useRouter()
const notification = useNotification()



// 欄位抓值用
const mail = ref('')
const pwd = ref('')
const one = ref(true)
const two = ref(false)

const getverify = () => {
    const API_URL = '/forgetmail'
    console.log(mail.value)
    tutorlink.post(API_URL, mail.value).then((response) => {
        one.value = false
        two.value = true
    })
}

const sendverify = () => {
    const API_URL = '/sendverify'
    tutorlink.post(API_URL, pwd.value).then((response) => {

    })
}
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

const verifie = () => {
    notification["warning"]({
        content: '提示',
        meta: '驗證已失效，請重新驗證',
        duration: 5000,
        keepAliveOnHover: true,
        placement: "bottom-right",
    })
}

function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
}

// 驗證信箱，搭配v-if決定是否顯示div
const mailcheck = ref(false)
const mailwaring = ref(false)

// 驗證信箱判斷式，會即時與server端請求驗證信箱是否重複
function checkmailinput() {
    mail.value == '' ? mailwaring.value = true : (isValidEmail(mail.value) ? (mailcheck.value = false, mailwaring.value = false) : (mailcheck.value = true, mailwaring.value = false))

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
    /* flex-direction: column; */
    /* justify-content: center; */
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