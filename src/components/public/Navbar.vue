<template>
    <div class="navbarholder"></div>
    <header>
        <nav class="navbar navbar-expand-lg" id="navbar">
            <div class="container">
                <router-link to="/" class="nav-link navbarTitleStyle d-flex"><img src="/LOGO-1.svg" alt=""
                        class="navbarImg">TutorLink</router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup" aria-expanded="true" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                    <!-- 切換登入狀態 -->
                    <div class="navbar-nav">
                        <button class="nav-link linkStyle btn btn-success" type="button" @click="loginStatusChanege"
                            v-if="loginStatus">已登入</button>
                        <button class="nav-link linkStyle btn btn-danger" type="button" @click="loginStatusChanege"
                            v-else>未登入</button>
                    </div>
                    <div class="navbar-nav" v-if="loginStatus">
                        <router-link to="/member/shoppingcart/step1" class="nav-link linkStyle">購物車</router-link>
                        <a class="nav-link linkStyle" href="#" type="button" data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">使用者</a>
                    </div>
                    <div class="navbar-nav" v-else>
                        <a class="nav-link linkStyle" href="#" type="button" data-bs-toggle="modal"
                            data-bs-target="#registerModal">註冊</a>
                        <a class="nav-link linkStyle" href="#" type="button" data-bs-toggle="modal"
                            data-bs-target="#loginModal">登入</a>
                    </div>

                </div>
            </div>
        </nav>
    </header>

    <!-- 登入彈出視窗 -->
    <login class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true"></login>

    <!-- 註冊彈出視窗 -->
    <register class="modal fade" id="registerModal" tabindex="-1" aria-labelledby="registerModalLabel" aria-hidden="true">
    </register>

    <!-- 右側選單 -->
    <div class="offcanvas offcanvas-end" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions"
        aria-labelledby="offcanvasWithBothOptionsLabel" data-bs-backdrop="false">
        <rightmenu></rightmenu>
    </div>
</template>
<script setup>

import rightmenu from './Rightmenu.vue';
import login from "./Login.vue"
import register from "./Register.vue"
import { ref, onMounted } from "vue"

const loginStatus = ref(false);
const loginStatusChanege = () => {
    loginStatus.value = !(loginStatus.value)
}

// const loginStatusFromGoogle = (val) => {
//     loginStatus.value = val
// }

// 滾動改顏色
// import { ref, onMounted } from 'vue';
// const navbar = ref("null");
// onMounted(() => {
//     navbar.value = document.querySelector("#navbar");
//     window.addEventListener('scroll', function () {
//         if (window.scrollY > 0) {
//             navbar.value.classList.add('scrolled');
//         }
//         else {
//             navbar.value.classList.remove('scrolled');
//         }
//     });
// });


// 登入狀態驗證
const getAllCookies = () => {
    var cookies = document.cookie.split(';');
    var cookieObj = {};
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim().split('=');
        var cookieName = cookie[0];
        var cookieValue = cookie[1];
        cookieObj[cookieName] = cookieValue;
    }
    // console.log("我是:");
    // console.log(cookieObj.UsersId);
    if (cookieObj.UsersId != null) {
        loginStatus.value = true
    }
}

getAllCookies()
</script>

<style scoped>
.navbarholder {
    height: 60px;
}

header {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 999;
    box-shadow: 0 1px 5px #9d8189;

}

.navbarImg {
    width: 40px;
    margin-right: 10px;
}

.navbarTitleStyle {
    font-size: 30px;
    color: #9d8189;
    font-weight: 700;
    align-items: center
}

#navbar {
    background-color: #ffe5d9;
    /* background-color: #d4a37316; */
    padding-left: 20px;
    padding-right: 20px;
    transition: background-color 0.3s ease;
}

.linkStyle {
    font-size: 16px;
    font-weight: 400;
    color: #9d8189;
    margin-left: 20px;
}

.navbarTitleStyle:focus {
    color: #9d8189;
}

.navbarTitleStyle:hover,
.linkStyle:hover,
.linkStyle:focus {
    color: #d5bdaf;

}


/* #navbar.scrolled {
    background-color: #ffe5d9;
    box-shadow: 0 2px 3px #9d8189;
} */
</style>