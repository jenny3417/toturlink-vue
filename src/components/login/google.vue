<script setup>
import { ref } from 'vue'
import { googleTokenLogin } from 'vue3-google-login'
import axios from 'axios';


const GOOGLE_CLIENT_ID = '984442641128-hf1d8dqof184dbqd8mldud0j906b5eap.apps.googleusercontent.com'

const data = ref()

const handleGoogleAccessTokenLogin = () => {
    googleTokenLogin({
        clientId: GOOGLE_CLIENT_ID
    }).then((response) => {
        data.value = response.access_token
        const API_URL = `${import.meta.env.VITE_API_JAVAURL}/googletoken`
        const googletoken = response
        axios.post(API_URL, googletoken).then((response) => {
            console.log(response)
            if (response.data == 'success') {
                console.log('12212')
            }
        })
    })
}




</script>

<template>
    <div>
        <!-- 使用自定義按鈕登入後回傳 Access Token -->
        <button type="button" @click="handleGoogleAccessTokenLogin">使用 Google 進行登入</button>
        <p>
            {{ data }}
        </p>
    </div>
</template>
<style>
button {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #1a1a1a;
    cursor: pointer;
    transition: border-color 0.25s;
}


.card {
    padding: 2em;
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