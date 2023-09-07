<template>
    <div>
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="registerModalLabel">註冊</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <h4>基本資料</h4>
                    <div style="min-height: 100px;">
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="floatingInput" v-model="name"
                                @blur="checknameinput()">
                            <label for="floatingInput">姓名</label>
                            <div v-if="namewaring" class="warning-text">請輸入姓名</div>
                        </div>
                    </div>
                    <div style="min-height: 100px;">
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="floatingInput" v-model="mail"
                                @blur="checkmailinput()">
                            <label for="floatingInput">信箱</label>
                            <div v-if="mailwaring" class="warning-text">請輸入電子郵件</div>
                            <div v-if="mailcheck" class="warning-text">信箱格式錯誤，請確認</div>
                        </div>
                    </div>
                    <div style="min-height: 100px;">
                        <div class="form-floating mb-3">
                            <input type="password" class="form-control" id="floatingInput" v-model="pwd"
                                @blur="checkpwdinput()">
                            <label for="floatingInput">密碼</label>
                            <div v-if="pwdwaring" class="warning-text">密碼不能為空</div>
                            <div v-if="pwdcheck" class="warning-text">密碼須包含大小寫及8~12個字元，不含特殊符號</div>
                        </div>
                    </div>
                    <div style="min-height: 100px;">
                        <div class="form-floating mb-3">
                            <input type="password" class="form-control" id="floatingInput" v-model="doublepwd"
                                @blur="doublecheck()">
                            <label for="floatingInput">確認密碼</label>
                            <div v-if="pwddoublewaring" class="warning-text">密碼不能為空</div>
                            <div v-if="pwddoublecheck" class="warning-text">兩組密碼不相同，請重新輸入</div>
                        </div>
                    </div>

                </div>
                <div class="d-grid gap-2 col-6 mx-auto register">
                    <button class="btn btn-outline-dark" type="button" @click="normalregister">註冊</button>
                </div>
                <div class="modal-footer">
                    已經擁有帳戶?
                    <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">登入</button>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script setup>
import tutorlink from '@/api/tutorlink.js';
import { ref } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter()




// 驗證mail格式方法
function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
}

// 註冊請求方法
const normalregister = () => {
    const API_URL = `/normalregister`
    console.log(register.value.mail)
    if (register.value.name == '' || register.value.mail == '' || register.value.pwd == '') {
        alert("請填寫所有欄位")
    }
    else if (isValidEmail(register.value.mail)) {
        console.log("Valid email address.");
    } else {
        alert("信箱格式錯誤");
    }
    // tutorlink.post(API_URL, register.value).then(res => {
    //     if (res.data.code == 200) {
    //         router.push({ path: '/' })
    //     }
    // })
}

// 驗證欄位用，搭配v-if決定是否顯示div
const namewaring = ref(false)
const mailwaring = ref(false)
const mailcheck = ref(false)
const pwdwaring = ref(false)
const pwdcheck = ref(false)
const pwddoublewaring = ref(false)
const pwddoublecheck = ref(false)
// 欄位抓值用
const name = ref('')
const mail = ref('')
const pwd = ref('')
const doublepwd = ref('')

// 驗證姓名判斷式
function checknameinput() {
    console.log('觸發方法')
    name.value == '' ? namewaring.value = true : namewaring.value = false
}

// 驗證信箱判斷式
function checkmailinput() {
    // mail.value == '' ? mailwaring.value = true : mailwaring.value = false
    mail.value == '' ? mailwaring.value = true : (isValidEmail(mail.value) ? mailcheck.value = false : mailcheck.value = true)
}

// 驗證密碼判斷式
function checkpwdinput() {
    pwd.value == '' ? pwdwaring.value = true : ((pwd.value.length >= 8 && pwd.value.length <= 12) ? (pwdcheck.value = false, pwdwaring.value = false) : (pwdwaring.value = false, pwdcheck.value = true))
}

// 驗證密碼二次判斷式
function doublecheck() {
    doublepwd.value == '' ? pwddoublewaring.value = true : ((pwd.value == doublepwd.value) ? (pwddoublecheck.value = false, pwdwaring.value = false) : (pwddoublecheck.value = true, pwdwaring.value = false))
}

</script>
    
<style scoped>
.register {
    padding-bottom: 16px;
}



.ninput {
    border: black 1px solid;

}

button {
    font-weight: bold;
    margin: 5px 20px;
}

.warning-text {
    color: red;
    font-size: 12px;
    margin-top: 5px;
}
</style>