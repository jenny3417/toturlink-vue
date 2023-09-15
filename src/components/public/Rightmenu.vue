<template>
    <div class="container">
        <div class="offcanvas-header">
            <div class="d-flex align-items-center">
                <div class="imgStyle"><img src="" alt=""></div>
                <div>
                    <h3 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">{{ username }}</h3>
                </div>
            </div>
            <div data-bs-theme="dark">
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
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

            </ul>
        </div>
        <hr>
        <div class="offcanvas-body">
            <ul class="nav flex-column">
                <li class="nav-item">
                    <a class="nav-link" href="#">課程管理</a>
                </li>
                <li class="nav-item"><router-link to="/member/teacher" v-if="teacher" class="nav-link">切換老師</router-link>
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
const teacher = ref(false);



const getAllCookies = () => {
    var cookies = document.cookie.split(';');
    var cookieObj = {};
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim().split('=');
        var cookieName = cookie[0];
        var cookieValue = cookie[1];
        cookieObj[cookieName] = cookieValue;
    }
    if (cookieObj.UsersId != null) {
        loginStatus.value = true
        return cookieObj.UsersId
    }
}
onMounted(() => {

    var cookies = document.cookie.split(';');
    var cookieObj = {};
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim().split('=');
        var cookieName = cookie[0];
        var cookieValue = cookie[1];
        cookieObj[cookieName] = cookieValue;
    }
    if (cookieObj.UsersId != null) {
        const API_URL = `/username`

        const API_URL2 = `/type`
        tutorlink.post(API_URL)
            .then((response) => {
                // console.log(response.data)

                username.value = response.data

            }
            )
        tutorlink.post(API_URL2)
            .then((response) => {
                console.log(response.data)
                if (response.data === 2) {
                    teacher.value = true
                }
            }
            )
    }
})

function logOut() {
    //登出，送給server端清除seesion、cookie
    const API_URL = `${import.meta.env.VITE_API_JAVAURL}/logout`
    tutorlink.get(API_URL).then((response) => {
        const cookies = document.cookie;
        cookies.startsWith('UsersId')
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
    color: #fffcf2;
    ;
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