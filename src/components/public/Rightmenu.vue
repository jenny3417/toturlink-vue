<template>
    <div class="container">
        <div class="offcanvas-header">
            <div class="d-flex align-items-center">
                <div class="imgStyle"><img src="" alt=""></div>
                <div>
                    <h3 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">使用者名稱</h3>
                    <div>剩餘代幣: <span>50</span> 點</div>
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
                    <router-link to="/member/myfavoriate" class="nav-link">我的收藏</router-link>
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
                    <button class="nav-link" @click="logOut">登出</button>
                </li>
            </ul>
        </div>
    </div>
</template>
    
<script setup>
import tutorlink from '@/api/tutorlink.js';
import { useRouter } from 'vue-router'
const router = useRouter()

function logOut() {
    //登出，送給server端清除seesion、cookie
    const API_URL = `${import.meta.env.VITE_API_JAVAURL}/logout`
    tutorlink.get(API_URL).then((response) => {
        const cookies = document.cookie;
        cookies.startsWith('UsersId')
        console.log(cookies)
        console.log(response)
        router.push({ path: '/' })
        // if (response.data === 'ok') {
        //     //登出，撤銷google端token
        //     google.accounts.oauth2.revoke(token);
        //     token = ''
        // }
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