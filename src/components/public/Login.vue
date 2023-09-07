<template>
    <div>
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="loginModalLabel">登入您的 TutorLink 帳戶</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        @click="initialization()"></button>
                </div>
                <div class="modal-body">
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="floatingInput" v-model="mail" autocomplete="off"
                            oncopy="return false" onpaste="return false" oncut="return false" oncontextmenu="return false"
                            @blur="checkmailinput()">
                        <label for="floatingInput">電子信箱</label>
                        <div v-if="mailwaring" class="warning-text">請輸入信箱</div>
                        <div v-if="mailcheck" class="warning-text">請檢查輸入格式是否正確</div>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="password" class="form-control" id="floatingInput" v-model="pwd" autocomplete="off"
                            oncopy="return false" onpaste="return false" oncut="return false" oncontextmenu="return false"
                            @blur="checkpwdinput()">
                        <label for="floatingInput">密碼</label>
                        <div v-if="pwdwaring" class="warning-text">請輸入密碼</div>
                    </div>
                    <google data-bs-dismiss="modal"></google>
                </div>
                <div class="modal-footer">
                    <div class="d-grid gap-2 col-6 mx-auto">
                        <button class="btn btn-outline-dark" type="button" @click="login">登入</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script setup>
import tutorlink from '@/api/tutorlink.js';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import google from '../login/google.vue'

// 登入方法

// 欄位抓值用
const mail = ref('')
const pwd = ref('')

const login = () => {
    const API_URL = `/normalregister`
    const login = {
        mail: mail.value,
        pwd: pwd.value
    }
    console.log(login)
    // tutorlink.post(API_URL, login).then(res => {
    //     if (res.data.code == 200) {
    //         router.push({ path: '/' })
    //     }
    // })
}

// ---- 信箱與密碼欄位驗證用 ----

// 驗證信箱，搭配v-if決定是否顯示div
const mailwaring = ref(false)
const mailcheck = ref(false)
// 驗證密碼，搭配v-if決定是否顯示div
const pwdwaring = ref(false)
const pwdcheck = ref(false)

// 驗證信箱判斷式，會即時與server端請求驗證信箱是否重複
function checkmailinput() {
    mailwaring.value = true
    mailcheck.value = true
}

// 驗證密碼判斷式
function checkpwdinput() {
    pwdwaring.value = true
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
</style>