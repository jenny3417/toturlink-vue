<script setup>
import { ref } from 'vue'
import { googleTokenLogin } from 'vue3-google-login'
import axios from 'axios';
import tutorlink from '@/api/tutorlink.js';
import { useRouter } from 'vue-router'
const router = useRouter()


const GOOGLE_CLIENT_ID = '984442641128-hf1d8dqof184dbqd8mldud0j906b5eap.apps.googleusercontent.com'
// google開發測試ID

var token = ''


const handleGoogleAccessTokenLogin = () => {

    googleTokenLogin({
        clientId: GOOGLE_CLIENT_ID
    }).then((response) => {
        const API_URL = `/googlelogin`
        const googletoken = response

        token = response.access_token
        console.log(token)

        tutorlink.post(API_URL, googletoken).then((response) => {
            console.log(response)
            if (response.data === 'google') {
                //登入後跳轉至 student 頁面
                loginStatus()
                router.push({ path: '/student' })
            } else {
                console.log(response)
            }
        }).catch(error => {
            if (error.response) {
                // 伺服器回應請求，但狀態代碼不在 2xx 範圍內
                console.error('請求錯誤', error.response.status, error.response.data);
            } else if (error.request) {
                // 請求已送出，伺服器無回應
                console.error('無回應', error.request);
            } else {
                // 設定請求錯誤
                console.error('請求設定錯誤', error.message);
            }
        })
    })
}



function logOut() {
    console.log(token)
    if (token == '') {
        console.log('token不存在')
    } else {
        //登出，送給server端清除seesion
        const API_URL = `${import.meta.env.VITE_API_JAVAURL}/googlelogout`
        axios.get(API_URL).then((response) => {
            console.log(response)
            if (response.data === 'ok') {
                //登出，撤銷google端token
                google.accounts.oauth2.revoke(token);
                token = ''
            }
        })
    }
}


const status = ref(false)

// 子傳父
const emits = defineEmits(['login-status'])
const loginStatus = () => {
    status.value = true
    emits('login-status', status.value)
}

</script>



<template>
    <div>
        <!-- 使用自定義按鈕登入後回傳 Access Token -->
        <button type="button" @click="handleGoogleAccessTokenLogin"><img src="../../assets/icon/search.png">使用 Google
            進行註冊</button>
        <button type="button" @click="logOut"><img src="../../assets/icon/search.png">測試登出</button>
    </div>
</template>
<style scoped>
button {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: black;
    cursor: pointer;
    transition: border-color 0.25s;
}

button img {
    width: 24px;
    margin-right: 15px;
}


@media (prefers-color-scheme: light) {
    :root {
        color: #213547;
        background-color: #ffffff;
    }

    a:hover {
        color: #747bff;
    }

    button {
        background-color: #f9f9f9;
    }
}
</style>