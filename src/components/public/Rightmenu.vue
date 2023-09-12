<template>
    <div class="container">
        <div class="offcanvas-header">
            <div class="d-flex align-items-center">
                <div class="imgStyle"><img src="" alt=""></div>
                <div>
                    <h3 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">{{ username }}</h3>
                </div>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <hr>
        <div class="offcanvas-body">
            <ul class="nav flex-column">
                <li class="nav-item">
                    <router-link to="/member/student" class="nav-link">我的課程</router-link>
                </li>
                <li class="nav-item">
                    <a class="nav-link" type="button" data-bs-toggle="modal" data-bs-target="#favoriateListModal">我的收藏</a>
                </li>
                <li class="nav-item">
                    <router-link to="/member/purchase" class="nav-link">訂單紀錄</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/member/personal/info" class="nav-link">個人資料</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/rate" class="nav-link">好評推薦</router-link>
                </li>
            </ul>
        </div>
        <hr>
        <div class="offcanvas-body">
            <ul class="nav flex-column">
                <li class="nav-item">
                    <a class="nav-link" href="#">課程管理</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">營收概況</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" @click="logOut">登出</a>
                </li>
            </ul>
        </div>
    </div>
</template>
    
<script setup>
import tutorlink from '@/api/tutorlink.js';
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue';
const router = useRouter()

const username = ref('')

onMounted(() => {
    const API_URL = `/username`
    tutorlink.post(API_URL)
        .then((response) => {
            // console.log(response.data)
            username.value = response.data
        }
        )
})

function logOut() {
    //登出，送給server端清除seesion、cookie
    const API_URL = `${import.meta.env.VITE_API_JAVAURL}/logout`
    tutorlink.get(API_URL).then((response) => {
        const cookies = document.cookie;
        cookies.startsWith('UsersId')
        console.log(cookies)
        console.log(response)
        router.replace({ path: '/' })
        // if (response.data === 'ok') {
        //     //登出，撤銷google端token
        //     google.accounts.oauth2.revoke(token);
        //     token = ''
        // }
        if (window.location.href === 'http://localhost:5173/') {
            location.reload();
        } else {
            window.location.href = 'http://localhost:5173/';
        }
    })
}
// }

</script>
    
<style scoped>
a {
    font-size: 16px;
    color: #9d8189;
}

a:hover,
a:focus {
    color: #d5bdaf;
}

.imgStyle {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background-color: #9d8189;
    margin-right: 20px;
}
</style>