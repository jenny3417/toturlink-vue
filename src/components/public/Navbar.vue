<template>
    <div class="navbarholder"></div>
    <header>
        <nav class="navbar navbar-expand-lg" id="navbar">
            <div class="container">
                <router-link to="/" class="nav-link navbarTitleStyle d-flex"><img src="/LOGO-1color.svg" alt=""
                        class="navbarImg">TutorLink</router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup" aria-expanded="true" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-start" id="navbarNavAltMarkup">
                    <router-link to="/search" class="nav-link linkStyle " type="button">瀏覽課程</router-link>
                    <router-link to="/rate" class="nav-link linkStyle">好評推薦</router-link>
                </div>
                <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                    <!-- 切換登入狀態 -->
                    <!-- <div class="navbar-nav">
                        <button class="nav-link linkStyle btn btn-success" type="button" @click="loginStatusChanege"
                            v-if="loginStatus">已登入</button>
                        <button class="nav-link linkStyle btn btn-danger" type="button" @click="loginStatusChanege"
                            v-else>未登入</button>
                    </div> -->
                    <div class="navbar-nav" v-if="loginStatus">
                        <a class="nav-link linkStyle" href="#" type="button"><n-icon size="25">
                                <search-outline />
                            </n-icon></a>
                        <!-- 下拉搜尋 https://getbootstrap.com/docs/5.3/components/collapse/ -->
                        <router-link to="/member/shoppingcart/step1" class="nav-link linkStyle">
                            <n-icon size="25"><cart-outline /></n-icon>
                            <n-badge :value="shoppingCartItem.length" :max="15" class="tag"></n-badge>
                        </router-link>
                        <a class="nav-link linkStyle" href="#" type="button" data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions"><n-icon
                                size="25">
                                <person-outline />
                            </n-icon></a>
                    </div>
                    <div class="navbar-nav" v-else>
                        <a class="nav-link linkStyle" href="http://localhost:5173/register" type="button">註冊</a>
                        <a class="nav-link linkStyle" href="http://localhost:5173/login" type="button">登入</a>
                    </div>

                </div>
            </div>
        </nav>
    </header>

    <!-- 登入彈出視窗 -->
    <!-- <div style="display: flex;">
        <login class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true"
            data-bs-backdrop="static"></login>
    </div> -->

    <!-- 註冊彈出視窗 -->
    <!-- <register class="modal fade" id="registerModal" tabindex="-1" aria-labelledby="registerModalLabel" aria-hidden="true"
        data-bs-backdrop="static">
    </register> -->

    <!-- 右側選單 -->
    <div class="offcanvas offcanvas-end rightStyle" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions"
        aria-labelledby="offcanvasWithBothOptionsLabel" data-bs-backdrop="false">
        <rightmenu></rightmenu>
    </div>
</template>
<script setup>

import rightmenu from './Rightmenu.vue';
import login from "./Login.vue"
import register from "./Register.vue"
import { ref } from "vue"
import { CartOutline, PersonOutline, SearchOutline } from '@vicons/ionicons5'
import { useShoppingCartStore } from '../../stores/useShoppingCartStore.js'
import { storeToRefs } from 'pinia'
import tutorlink from '@/api/tutorlink.js';

const cartStore = useShoppingCartStore()
const loginStatus = ref(false);
const { shoppingCartItem } = storeToRefs(cartStore)
const { shoppingCartAjax } = cartStore

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
    if (cookieObj.UsersId != null) {
        loginStatus.value = true
        return cookieObj.UsersId
    }
}

shoppingCartAjax(getAllCookies())
// 引入cookie
// import { storeToRefs } from 'pinia'
// import { useCookieStore } from '../../stores/useCookieStore.js'
// const cookieStore = useCookieStore()
// const { usersId } = storeToRefs(cookieStore)
// 引入cookie



// const loginStatusChanege = () => {
//     loginStatus.value = !(loginStatus.value)
// }




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





</script>

<style scoped>
.navbarholder {
    height: 61px;
    /* margin-bottom: 20px; */
}

header {
    position: fixed;
    margin-bottom: 10px;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 999;
    /* box-shadow: 0 1px 5px #9d8189; */

}

.navbarImg {
    width: 40px;
    margin-right: 10px;
}

.navbarTitleStyle {
    width: 240px;
    font-size: 30px;
    color: #fffcf2;
    font-weight: 700;
    align-items: center;
    justify-content: center;
}

#navbar {
    background-color: #403d39f0;
    padding-left: 20px;
    padding-right: 20px;
    transition: background-color 0.3s ease;
}

.linkStyle {
    font-size: 16px;
    font-weight: 400;
    color: #fffcf2;
    margin-left: 35px;
    min-width: 60px;
}

/* .navbarTitleStyle:focus {
    color: #9d8189;
} */

.navbarTitleStyle:hover,
.linkStyle:hover {
    color: #d5bdaf;

}

.tag {
    position: relative;
    right: 10px;
    bottom: 10px;
}

.userBtn {
    width: 100px;
    padding: 5px 10px;
    background: #fff;
    font-size: 12px;
    color: #000;
    text-align: center;
    border-radius: 20px;
    border: 1.5px solid #000;
}

#navbar.scrolled {
    box-shadow: 0 2px 3px #272324;
}

.rightStyle {
    background-color: #403d39;
    color: #fffcf2;

}

.fade {
    width: 360px;
}
</style>